import os
import argparse
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configuración del logging para mostrar información clara
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Extensiones de archivo a revisar
TARGET_EXTENSIONS = ('.ts', '.tsx')

def check_file_for_misencoded_char(filepath, target_char):
    """
    Revisa un solo archivo en busca de un carácter mal codificado.

    Lee el archivo en trozos para manejar archivos grandes de manera eficiente.
    Intenta decodificar con 'latin-1' para encontrar el patrón de error común de UTF-8.

    Args:
        filepath (str): La ruta al archivo a revisar.
        target_char (str): El carácter a buscar (indicativo de mala codificación).

    Returns:
        str or None: La ruta del archivo si se encuentra el carácter, de lo contrario None.
    """
    try:
        # Usamos 'rb' para leer en modo binario
        with open(filepath, 'rb') as f:
            # Leemos en trozos para no cargar archivos grandes en memoria
            chunk_size = 8192
            while True:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                try:
                    # Decodificamos el trozo como 'latin-1' para buscar el patrón de error
                    text_chunk = chunk.decode('latin-1')
                    if target_char in text_chunk:
                        logging.info(f"Carácter '{target_char}' encontrado en: {filepath}")
                        return filepath
                except UnicodeDecodeError:
                    # El trozo no se pudo decodificar como latin-1, continuamos con el siguiente.
                    continue
    except (IOError, OSError) as e:
        logging.error(f"Error al leer el archivo {filepath}: {e}")
    except Exception as e:
        logging.error(f"Error inesperado al procesar el archivo {filepath}: {e}")
    return None

def find_misencoded_chars_in_project(root_directories, target_char, max_workers=None):
    """
    Busca un carácter específico en archivos .ts y .tsx de forma paralela.

    Utiliza un ThreadPoolExecutor para acelerar la búsqueda en múltiples archivos.

    Args:
        root_directories (list): Lista de directorios para buscar.
        target_char (str): Carácter a buscar.
        max_workers (int, optional): Número máximo de hilos. Por defecto, se ajusta a la CPU.

    Returns:
        list: Una lista de rutas de archivo donde se encontró el carácter.
    """
    found_files = []
    files_to_check = []

    for root_dir in root_directories:
        if not os.path.isdir(root_dir):
            logging.warning(f"El directorio '{root_dir}' no existe. Se omitirá.")
            continue
        
        for dirpath, _, filenames in os.walk(root_dir):
            for filename in filenames:
                if filename.lower().endswith(TARGET_EXTENSIONS):
                    files_to_check.append(os.path.join(dirpath, filename))

    if not files_to_check:
        logging.info("No se encontraron archivos .ts o .tsx para analizar.")
        return []

    logging.info(f"Analizando {len(files_to_check)} archivos con hasta {max_workers or os.cpu_count() or 1} hilos...")

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Creamos un futuro para cada archivo a revisar
        future_to_file = {executor.submit(check_file_for_misencoded_char, filepath, target_char): filepath for filepath in files_to_check}
        
        for future in as_completed(future_to_file):
            result = future.result()
            if result:
                found_files.append(result)

    return sorted(found_files)

def main():
    """
    Función principal para ejecutar el script desde la línea de comandos.
    """
    parser = argparse.ArgumentParser(
        description="Busca caracteres mal codificados en archivos .ts y .tsx.",
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument(
        'directories',
        nargs='+',
        help="Uno o más directorios para escanear (ej. src/app src/components)."
    )
    parser.add_argument(
        '--char',
        default='Ã',
        help="El carácter mal codificado a buscar (por defecto: 'Ã')."
    )
    parser.add_argument(
        '--workers',
        type=int,
        default=os.cpu_count(),
        help="Número de hilos a utilizar para el escaneo (por defecto: número de CPUs)."
    )
    
    args = parser.parse_args()

    logging.info(f"Iniciando búsqueda del carácter '{args.char}' en los directorios: {', '.join(args.directories)}")
    
    misencoded_files = find_misencoded_chars_in_project(
        root_directories=args.directories,
        target_char=args.char,
        max_workers=args.workers
    )

    if misencoded_files:
        print("\n--- Archivos con caracteres mal codificados encontrados ---")
        for file in misencoded_files:
            print(file)
        print(f"\nTotal: {len(misencoded_files)} archivos encontrados.")
    else:
        print("\n--- ¡Éxito! No se encontraron archivos con el carácter especificado. ---")

if __name__ == "__main__":
    main()
    # Ejemplo de cómo se ejecutaría desde la terminal:
    # python pruebas.py src/components src/app --char Ã --workers 4
    #
    # Para probar sin argumentos, puedes descomentar las siguientes líneas:
    # default_dirs = ['src/app', 'src/components']
    # logging.info(f"Ejecutando con directorios por defecto: {default_dirs}")
    # files = find_misencoded_chars_in_project(default_dirs, 'Ã')
    # if files:
    #     print("\nArchivos encontrados:", files)
    # else:
    #     print("\nNo se encontraron archivos.")
```
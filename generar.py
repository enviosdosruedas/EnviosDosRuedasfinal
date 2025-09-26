import os
import json

def get_directory_structure_json(start_path='src'):
    """
    Devuelve la estructura de un directorio como una cadena JSON.

    Args:
        start_path (str): La ruta del directorio desde donde comenzar a listar.
                          Por defecto es 'src'.

    Returns:
        str: Una cadena JSON que representa la estructura del directorio,
             o None si el directorio no existe o no es un directorio.
    """
    if not os.path.exists(start_path):
        print(f"Error: El directorio '{start_path}' no existe.")
        return None

    if not os.path.isdir(start_path):
        print(f"Error: '{start_path}' no es un directorio.")
        return None

    # Objeto raíz que contendrá toda la estructura
    structure = {
        "name": os.path.basename(os.path.abspath(start_path)),
        "type": "directory",
        "path": os.path.abspath(start_path),
        "children": []
    }

    # Un diccionario para mantener un rastro de los directorios por su ruta
    # para poder añadir hijos correctamente.
    directory_map = {os.path.abspath(start_path): structure}

    for root, dirs, files in os.walk(start_path):
        current_abs_root = os.path.abspath(root)
        
        # Recuperar el nodo del directorio actual del mapa
        current_node = directory_map[current_abs_root]
        
        # Añadir subdirectorios
        for d in dirs:
            dir_abs_path = os.path.abspath(os.path.join(root, d))
            dir_node = {
                "name": d,
                "type": "directory",
                "path": dir_abs_path,
                "children": []
            }
            current_node["children"].append(dir_node)
            directory_map[dir_abs_path] = dir_node # Añadir al mapa para futuras referencias

        # Añadir archivos
        for f in files:
            file_abs_path = os.path.abspath(os.path.join(root, f))
            file_node = {
                "name": f,
                "type": "file",
                "path": file_abs_path
            }
            current_node["children"].append(file_node)
            
    return json.dumps(structure, indent=4)

if __name__ == "__main__":
    # Ejemplo de uso:
    # Asegúrate de que el directorio 'src' exista en la misma ubicación que este script,
    # o cambia 'src' por la ruta al directorio que deseas analizar.

    # Para probar, puedes crear un directorio 'src' y algunos archivos/subdirectorios:
    # Por ejemplo:
    # src/
    # ├── main.py
    # ├── models/
    # │   └── user.py
    # └── views/
    #     └── index.html

    json_output = get_directory_structure_json('src')

    if json_output:
        print("Estructura del directorio en formato JSON:\n")
        print(json_output)

        # También puedes guardar el resultado en un archivo:
        with open('directory_structure.json', 'w', encoding='utf-8') as f:
            f.write(json_output)
        print("\nEstructura guardada en 'directory_structure.json'")

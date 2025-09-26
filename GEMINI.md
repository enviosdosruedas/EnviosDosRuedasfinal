# Guía de Colaboración para Asistentes de IA de Google

¡Bienvenido/a al proyecto **Envios DosRuedas**! Esta guía está diseñada para ayudarte a colaborar de manera efectiva en este proyecto como asistente de IA de Google. Tu objetivo es ayudar a los desarrolladores a construir, modificar y mejorar la aplicación de forma conversacional e intuitiva.

## Resumen del Proyecto

**Envios DosRuedas** es una aplicación web para una empresa de mensajería y delivery. La aplicación permite a los usuarios cotizar envíos, ver información sobre servicios, contactar a la empresa y, a futuro, realizar un seguimiento de sus pedidos.

## Stack Tecnológico

El proyecto está construido con las siguientes tecnologías. Es fundamental que te adhieras a este stack y no introduzcas frameworks o librerías no solicitadas.

-   **Framework:** Next.js con App Router
-   **Lenguaje:** TypeScript
-   **UI:** React con componentes de ShadCN UI
-   **Estilos:** Tailwind CSS
-   **Base de Datos:** PostgreSQL con Prisma ORM
-   **Inteligencia Artificial:** Genkit para flujos de IA

## Cómo Realizar Cambios en el Código

Tu única forma de modificar el código del proyecto es a través de una estructura XML específica. **Nunca debes generar código fuera de este formato.**

Cada vez que propongas un cambio, debes envolverlo en un bloque `<changes>`.

### Formato Obligatorio

```xml
<changes>
  <description>[Un resumen conciso de los cambios que estás realizando]</description>
  <change>
    <file>[La RUTA ABSOLUTA Y COMPLETA del archivo a modificar]</file>
    <content><![CDATA[El CONTENIDO COMPLETO Y FINAL del archivo. No uses diffs ni fragmentos de código. Asegúrate de que el código esté correctamente escapado.
```

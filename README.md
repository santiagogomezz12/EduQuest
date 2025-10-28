# EduQuest: Transforma Contenido en Conocimiento

EduQuest es una aplicación web innovadora construida con Next.js y TypeScript, diseñada para convertir automáticamente cualquier texto, documento o contenido de una URL en un cuestionario interactivo. Es la herramienta perfecta para estudiantes, educadores y curiosos que deseen poner a prueba su comprensión sobre un tema específico de forma rápida y eficiente.

## ¿Cómo Funciona?

La lógica de la aplicación es simple pero poderosa:

1.  **Entrada de Contenido**: El usuario visita la página principal donde se encuentra el componente `TextAnalyzer`. Aquí puede elegir entre tres opciones:
    *   Pegar texto directamente en un área de texto.
    *   Subir un archivo (como `.txt`, `.pdf`, etc.).
    *   Introducir la URL de una página web.

2.  **Procesamiento en el Backend**: Una vez que el usuario envía el contenido, el frontend realiza una llamada a una de las API internas de Next.js:
    *   `api/process-file`: Para archivos subidos.
    *   `api/process-url`: Para URLs.
    *   `api/generate-questions`: Para texto directo.

3.  **Generación con IA**: El backend recibe el texto extraído. En este punto, utiliza un modelo de lenguaje avanzado (LLM) a través del Vercel AI SDK. Se le envía el contenido junto con un prompt que le instruye generar una serie de preguntas y respuestas basadas exclusivamente en la información proporcionada.

4.  **Visualización del Cuestionario**: La API devuelve las preguntas generadas en formato JSON al cliente. La aplicación redirige al usuario a la página `/quiz`, donde el componente `QuestionsList` renderiza el cuestionario de forma clara y ordenada, usualmente utilizando un componente de tipo "acordeón" para mostrar una pregunta a la vez con su respuesta oculta.

## Implementación de la Inteligencia Artificial

La inteligencia artificial es el núcleo de EduQuest. Se implementa de la siguiente manera:

*   **Vercel AI SDK**: Se utiliza como una capa de abstracción para facilitar la comunicación con diferentes modelos de lenguaje (como Google Gemini, OpenAI GPT, etc.). Permite enviar el contenido y recibir las respuestas generadas por el modelo en un formato de streaming o estático.
*   **API Endpoints**: La lógica de la IA está encapsulada en los endpoints del backend (`/api/*`). Estos endpoints se encargan de recibir la petición del cliente, preparar el prompt para el modelo de IA y devolver una respuesta estructurada. Esto mantiene el código del frontend limpio y desacoplado de la lógica de la IA.
*   **Prompt Engineering**: Aunque no es visible directamente en el código, el éxito de la generación de preguntas depende de un "prompt" bien diseñado que instruye al modelo para que actúe como un creador de cuestionarios, asegurando que las preguntas sean relevantes y sus respuestas se basen en el texto de origen.

## Tecnologías Utilizadas

*   **Framework**: Next.js 14 (con App Router)
*   **Lenguaje**: TypeScript
*   **Inteligencia Artificial**: Vercel AI SDK
*   **Componentes UI**: Shadcn/UI, Radix UI
*   **Estilo**: Tailwind CSS
*   **Iconos**: Lucide React
*   **Gestor de Paquetes**: PNPM

## Puesta en Marcha Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

### Prerrequisitos

*   Node.js (versión 18 o superior)
*   `pnpm` instalado (`npm install -g pnpm`)
*   Una clave de API de un proveedor de modelos de IA (ej. Google AI Studio, OpenAI).

### Pasos

1.  **Clonar el Repositorio**
    ```bash
    git clone <URL-del-repositorio>
    cd eduquest
    ```

2.  **Instalar Dependencias**
    Ejecuta el siguiente comando para instalar todas las dependencias del proyecto.
    ```bash
    pnpm install
    ```

3.  **Configurar Variables de Entorno**
    Crea un archivo `.env.local` en la raíz del proyecto y añade tu clave de API. Puedes copiar el ejemplo:
    ```bash
    # .env.local
    GOOGLE_API_KEY="TU_API_KEY_DE_GOOGLE_AQUI"
    # o OPENAI_API_KEY="TU_API_KEY_DE_OPENAI_AQUI"
    ```

4.  **Ejecutar el Servidor de Desarrollo**
    Inicia la aplicación en modo de desarrollo.
    ```bash
    pnpm dev
    ```

5.  **Abrir la Aplicación**
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

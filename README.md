# EduQuest: Transform Content into Knowledge

EduQuest is an innovative web application built with Next.js and TypeScript, designed to automatically convert any text, document, or content from a URL into an interactive quiz[...]

## How It Works

The application's logic is simple but powerful:

1.  **Content Input**: The user visits the main page where the `TextAnalyzer` component is located. Here they can choose between three options:
    *   Paste text directly into a text area.
    *   Upload a file (such as `.txt`, `.pdf`, etc.).
    *   Enter the URL of a web page.

2.  **Backend Processing**: Once the user submits the content, the frontend makes a call to one of Next.js's internal APIs:
    *   `api/process-file`: For uploaded files.
    *   `api/process-url`: For URLs.
    *   `api/generate-questions`: For direct text.

3.  **AI Generation**: The backend receives the extracted text. At this point, it uses an advanced language model (LLM) via the Vercel AI SDK. The content is sent along with a prompt[...]

4.  **Quiz Display**: The API returns the generated questions in JSON format to the client. The application redirects the user to the `/quiz` page, where the `QuestionsList` component[...]

## AI Implementation

Artificial intelligence is the core of EduQuest. It is implemented as follows:

*   **Vercel AI SDK**: Used as an abstraction layer to facilitate communication with different language models (such as Google Gemini, OpenAI GPT, etc.). It allows sending the content and[...]
*   **API Endpoints**: The AI logic is encapsulated in the backend endpoints (`/api/*`). These endpoints handle receiving the client's request, preparing the prompt for the model[...]
*   **Prompt Engineering**: Although not directly visible in the code, the success of the question generation depends on a well-crafted prompt that instructs the model to act as [...]

## Technologies Used

*   **Framework**: Next.js 14 (with App Router)
*   **Language**: TypeScript
*   **Artificial Intelligence**: Vercel AI SDK
*   **UI Components**: Shadcn/UI, Radix UI
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Package Manager**: PNPM

## Running Locally

To run this project on your local machine, follow these steps:

### Prerequisites

*   Node.js (version 18 or higher)
*   `pnpm` installed (`npm install -g pnpm`)
*   An API key from an AI model provider (e.g. Google AI Studio, OpenAI).

### Steps

1.  **Clone the Repository**
    ```bash
    git clone <repository-URL>
    cd eduquest
    ```

2.  **Install Dependencies**
    Run the following command to install all project dependencies.
    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file at the root of the project and add your API key. You can copy the example:
    ```bash
    # .env.local
    GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"
    # or OPENAI_API_KEY="YOUR_OPENAI_API_KEY_HERE"
    ```

4.  **Start the Development Server**
    Start the application in development mode.
    ```bash
    pnpm dev
    ```

5.  **Open the Application**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

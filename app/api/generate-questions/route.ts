import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

    if (!apiKey) {
      return Response.json(
        {
          error:
            "API key de Google Gemini no configurada. Por favor, agrega GOOGLE_GENERATIVE_AI_API_KEY a tu archivo .env.local",
        },
        { status: 500 },
      )
    }

    const { text, difficulty = "intermedio" } = await req.json()

    if (!text || text.trim().length === 0) {
      return Response.json({ error: "El texto es requerido" }, { status: 400 })
    }

    const difficultyInstructions = {
      facil:
        "- Las preguntas deben ser directas y basadas en información explícita del texto\n- Usa vocabulario simple y claro\n- Las opciones incorrectas deben ser claramente diferentes de la correcta",
      intermedio:
        "- Las preguntas deben requerir comprensión del texto, no solo memorización\n- Incluye algunas preguntas que requieran inferencia básica\n- Las opciones incorrectas deben ser plausibles pero claramente incorrectas",
      dificil:
        "- Las preguntas deben requerir análisis profundo y pensamiento crítico\n- Incluye preguntas que requieran inferencia, síntesis y evaluación\n- Las opciones incorrectas deben ser sutilmente diferentes y requerir análisis cuidadoso",
    }

    const prompt = `Eres un asistente educativo experto. Analiza el siguiente texto y genera exactamente 10 preguntas de comprensión lectora en español con nivel de dificultad ${difficulty.toUpperCase()}.

TEXTO:
${text}

INSTRUCCIONES:
- Genera 7 preguntas de opción múltiple (con 4 opciones cada una)
- Genera 3 preguntas de verdadero/falso
- Las preguntas deben evaluar la comprensión del texto
- Incluye una explicación breve para cada respuesta correcta
${difficultyInstructions[difficulty as keyof typeof difficultyInstructions]}
- Responde ÚNICAMENTE con un JSON válido, sin texto adicional

FORMATO JSON REQUERIDO:
{
  "questions": [
    {
      "id": 1,
      "type": "multiple-choice",
      "question": "¿Pregunta aquí?",
      "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
      "correctAnswer": "Opción correcta",
      "explanation": "Explicación de por qué es correcta"
    },
    {
      "id": 2,
      "type": "true-false",
      "question": "¿Afirmación aquí?",
      "correctAnswer": "Verdadero",
      "explanation": "Explicación"
    }
  ]
}`

    const { text: responseText } = await generateText({
      model: google("gemini-2.5-flash", {
        apiKey: apiKey,
      }),
      prompt,
      temperature: 0.7,
    })

    // Parse the JSON response
    let parsedResponse
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        parsedResponse = JSON.parse(responseText)
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", responseText)
      throw new Error("Error al procesar la respuesta de la IA")
    }

    return Response.json(parsedResponse)
  } catch (error) {
    console.error("Error generating questions:", error)
    return Response.json({ error: "Error al generar las preguntas. Por favor, intenta de nuevo." }, { status: 500 })
  }
}

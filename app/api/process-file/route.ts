import { type NextRequest, NextResponse } from "next/server"
import { extractText } from "unpdf"
import mammoth from "mammoth"
import { Buffer } from "buffer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 })
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    let text = ""

    if (fileExtension === "txt") {
      text = await file.text()
    } else if (fileExtension === "pdf") {
      const arrayBuffer = await file.arrayBuffer()
      const { text: extractedText } = await extractText(new Uint8Array(arrayBuffer), {
        mergePages: true,
      })
      text = extractedText
    } else if (fileExtension === "doc" || fileExtension === "docx") {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else {
      return NextResponse.json(
        { error: "Formato de archivo no soportado. Por favor, usa archivos TXT, PDF, DOC o DOCX." },
        { status: 400 },
      )
    }

    if (!text.trim()) {
      return NextResponse.json({ error: "No se pudo extraer texto del archivo" }, { status: 400 })
    }

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json({ error: "Error al procesar el archivo" }, { status: 500 })
  }
}

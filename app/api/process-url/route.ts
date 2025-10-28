import { type NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No se proporcionó ninguna URL" }, { status: 400 })
    }

    // Validate URL format
    let validUrl: URL
    try {
      validUrl = new URL(url)
    } catch {
      return NextResponse.json({ error: "URL inválida. Por favor, ingresa una URL válida." }, { status: 400 })
    }

    // Fetch the webpage content
    const response = await fetch(validUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; EduQuest/1.0)",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "No se pudo acceder a la URL proporcionada" }, { status: 400 })
    }

    const html = await response.text()

    // Load HTML into cheerio
    const $ = cheerio.load(html)

    // Remove script, style, and other non-content elements
    $("script, style, nav, header, footer, iframe, noscript").remove()

    // Extract text from main content areas
    // Try to find main content first, fallback to body
    let text = ""
    const mainSelectors = ["main", "article", '[role="main"]', ".content", "#content", ".post", ".article"]

    for (const selector of mainSelectors) {
      const content = $(selector).text()
      if (content && content.trim().length > 100) {
        text = content
        break
      }
    }

    // Fallback to body if no main content found
    if (!text) {
      text = $("body").text()
    }

    // Clean up the text: remove extra whitespace and newlines
    text = text.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim()

    if (!text || text.length < 50) {
      return NextResponse.json(
        { error: "No se pudo extraer suficiente texto de la URL. Intenta con otra página." },
        { status: 400 },
      )
    }

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error processing URL:", error)
    return NextResponse.json({ error: "Error al procesar la URL" }, { status: 500 })
  }
}

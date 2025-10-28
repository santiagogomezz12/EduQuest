"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, Upload, FileText, LinkIcon } from "lucide-react"
import { QuestionsList } from "@/components/questions-list"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export interface Question {
  id: number
  type: "multiple-choice" | "true-false"
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export function TextAnalyzer() {
  const [text, setText] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fileName, setFileName] = useState("")
  const [processingFile, setProcessingFile] = useState(false)
  const [url, setUrl] = useState("")
  const [processingUrl, setProcessingUrl] = useState(false)
  const [difficulty, setDifficulty] = useState<"facil" | "intermedio" | "dificil">("intermedio")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setProcessingFile(true)
    setError("")
    setFileName(file.name)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/process-file", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al procesar el archivo")
      }

      const data = await response.json()
      setText(data.text)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el archivo. Por favor, intenta con otro archivo.",
      )
      console.error(err)
      setFileName("")
    } finally {
      setProcessingFile(false)
    }
  }

  const handleUrlProcess = async () => {
    if (!url.trim()) {
      setError("Por favor, ingresa una URL válida")
      return
    }

    setProcessingUrl(true)
    setError("")

    try {
      const response = await fetch("/api/process-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al procesar la URL")
      }

      const data = await response.json()
      setText(data.text)
      setUrl("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar la URL. Por favor, intenta con otra URL.")
      console.error(err)
    } finally {
      setProcessingUrl(false)
    }
  }

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Por favor, ingresa un texto para analizar")
      return
    }

    setLoading(true)
    setError("")
    setQuestions([])

    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, difficulty }),
      })

      if (!response.ok) {
        throw new Error("Error al generar preguntas")
      }

      const data = await response.json()
      setQuestions(data.questions)
    } catch (err) {
      setError("Hubo un error al generar las preguntas. Por favor, intenta de nuevo.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Ingresa tu Texto</CardTitle>
          <CardDescription>
            Escribe texto, sube un archivo (TXT, PDF, DOC, DOCX), o ingresa una URL de un artículo o noticia para
            generar preguntas de comprensión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://ejemplo.com/articulo"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && url.trim()) {
                    handleUrlProcess()
                  }
                }}
                disabled={processingUrl}
              />
              <Button onClick={handleUrlProcess} disabled={processingUrl || !url.trim()} variant="outline">
                {processingUrl ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Cargar URL
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={processingFile}
            >
              {processingFile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando archivo...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Archivo (TXT, PDF, DOC, DOCX)
                </>
              )}
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {fileName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{fileName}</span>
            </div>
          )}

          <Textarea
            placeholder="Ejemplo: La fotosíntesis es el proceso mediante el cual las plantas convierten la luz solar en energía química..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-none"
          />

          <div className="space-y-2">
            <Label htmlFor="difficulty">Nivel de Dificultad</Label>
            <Select value={difficulty} onValueChange={(value) => setDifficulty(value as typeof difficulty)}>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Selecciona la dificultad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facil">Fácil</SelectItem>
                <SelectItem value="intermedio">Intermedio</SelectItem>
                <SelectItem value="dificil">Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handleGenerate} disabled={loading || !text.trim()} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generando Preguntas...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Generar Preguntas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <QuestionsList questions={questions} onRegenerateQuestions={handleGenerate} originalText={text} />
      )}
    </div>
  )
}

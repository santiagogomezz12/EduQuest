import { TextAnalyzer } from "@/components/text-analyzer"
import Image from "next/image"
import { Brain, Sparkles, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/icon.png" alt="EduQuest Logo" width={20} height={20} />
              <h1 className="-ml-1 text-2xl font-bold text-foreground">EduQuest</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/about">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Info className="h-4 w-4" />
                  Sobre nosotros
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Revolucionando la Comprensión Lectora con IA</span>
          </div>

          <h2 className="text-balance text-5xl font-bold leading-tight text-foreground md:text-6xl">
            Genera Preguntas de Comprensión Lectora
          </h2>

          <p className="text-pretty text-lg text-muted-foreground md:text-xl">
            Ingresa cualquier texto y nuestra IA creará preguntas personalizadas para verificar la comprensión. Perfecto
            para estudiantes y profesores.
          </p>
        </div>

        {/* Features */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 text-left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Análisis Inteligente</h3>
            <p className="text-sm text-muted-foreground">
              La IA analiza el contenido e identifica conceptos clave automáticamente
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Preguntas Variadas</h3>
            <p className="text-sm text-muted-foreground">
              Genera preguntas de opción múltiple y verdadero/falso adaptadas al texto
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-left">
            <Image src="/icon.png" alt="EduQuest Logo" width={40} height={40} className="mb-4" />
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Feedback Inmediato</h3>
            <p className="text-sm text-muted-foreground">Recibe retroalimentación instantánea sobre tus respuestas</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        <TextAnalyzer />
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by Google Gemini AI • EduQuest 2025</p>
        </div>
      </footer>
    </main>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Target, Zap, Lightbulb } from "lucide-react"

export default function AboutPage() {
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
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-balance text-4xl font-bold text-foreground md:text-5xl">Sobre Nosotros</h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
          Conoce más sobre EduQuest y cómo puede transformar tu experiencia de aprendizaje
        </p>
      </section>

      {/* What is EduQuest */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="mb-4 flex items-center gap-2">
              <Image src="/icon.png" alt="EduQuest Logo" width={20} height={20} />
              <h3 className="-ml-1 text-2xl font-bold text-card-foreground">¿Qué es EduQuest?</h3>
            </div>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              EduQuest es una herramienta educativa basada en Inteligencia Artificial diseñada para ayudar a los
              estudiantes a mejorar su comprensión lectora. Permite ingresar un texto y genera automáticamente preguntas
              de opción múltiple y verdadero/falso, adaptadas al nivel de dificultad elegido.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-3xl font-bold text-foreground">Ventajas de EduQuest</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-card-foreground">Aprendizaje personalizado</h4>
              </div>
              <p className="text-sm text-muted-foreground">Se adapta al nivel del estudiante.</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Zap className="h-5 w-5 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-card-foreground">Ahorro de tiempo</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                No hace falta que los alumnos creen o busquen material extra.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-card-foreground">Repaso eficaz</h4>
              </div>
              <p className="text-sm text-muted-foreground">Preguntas interactivas que refuerzan los conceptos clave.</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Lightbulb className="h-5 w-5 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-card-foreground">Interfaz sencilla</h4>
              </div>
              <p className="text-sm text-muted-foreground">Diseñada para ser rápida y fácil de usar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose EduQuest */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-border bg-primary/5 p-8">
            <h3 className="mb-4 text-2xl font-bold text-foreground">¿Por qué elegir EduQuest?</h3>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              A diferencia de otras herramientas de inteligencia artificial que son generalistas, EduQuest está enfocada
              en la comprensión lectora. Esto significa que las preguntas no solo se generan automáticamente, sino que
              además están pensadas con fines pedagógicos, para reforzar el aprendizaje en los estudiantes.
            </p>
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-border bg-card p-8">
            <h3 className="mb-4 text-2xl font-bold text-card-foreground">Nuestra Diferenciación</h3>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Mientras que otras IA pueden generar texto de cualquier tipo, EduQuest se especializa en generar preguntas
              educativas estructuradas (opción múltiple y verdadero/falso) que permiten practicar y medir comprensión de
              manera más directa.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h3 className="text-3xl font-bold text-foreground">¿Listo para comenzar?</h3>
          <p className="text-lg text-muted-foreground">
            Empieza a generar preguntas de comprensión lectora con inteligencia artificial
          </p>
          <Link href="/quiz">
            <Button size="lg" className="gap-2">
              Comenzar ahora
            </Button>
          </Link>
        </div>
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

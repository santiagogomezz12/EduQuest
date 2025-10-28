import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Info } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/2 px-4">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <Image src="/icon.png" alt="EduQuest Logo" width={70} height={70} />
          <h1 className="-ml-0 text-6xl font-bold text-foreground md:text-7xl">
            EduQuest
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-md text-balance text-lg text-muted-foreground md:text-xl">
          Genera preguntas de comprensión lectora con inteligencia artificial
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/quiz">
            <Button size="lg" className="group gap-2 text-lg">
              Comenzar
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="gap-2 text-lg bg-transparent">
              <Info className="h-5 w-5" />
              Sobre nosotros
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-sm text-foreground">Powered by Google Gemini AI</footer>
    </main>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, RotateCcw, RefreshCw } from "lucide-react"
import type { Question } from "@/components/text-analyzer"

interface QuestionsListProps {
  questions: Question[]
  onRegenerateQuestions: () => void
  originalText: string
}

export function QuestionsList({ questions, onRegenerateQuestions, originalText }: QuestionsListProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({})

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setShowExplanations({})
  }

  const toggleExplanation = (questionId: number) => {
    setShowExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) }
  }

  const score = submitted ? calculateScore() : null

  return (
    <div className="space-y-6">
      {/* Score Card */}
      {submitted && score && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-foreground">
                {score.correct} de {score.total} correctas ({score.percentage}%)
              </p>
              <p className="text-sm text-muted-foreground">
                {score.percentage >= 80
                  ? "¡Excelente comprensión del texto!"
                  : score.percentage >= 60
                    ? "¡Buen trabajo! Has aprobado con " + score.percentage + "%"
                    : "Has obtenido menos del 60%. Debes intentar con nuevas preguntas para aprobar."}
              </p>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleReset} variant="outline" className="bg-transparent">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reintentar Estas Preguntas
                </Button>
                {score.percentage < 60 && (
                  <Button onClick={onRegenerateQuestions} variant="default">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generar Nuevas Preguntas
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions */}
      {questions.map((question, index) => {
        const isCorrect = submitted && answers[question.id] === question.correctAnswer
        const isIncorrect = submitted && answers[question.id] && answers[question.id] !== question.correctAnswer

        return (
          <Card
            key={question.id}
            className={submitted ? (isCorrect ? "border-accent" : isIncorrect ? "border-destructive" : "") : ""}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    Pregunta {index + 1}
                    {submitted && (
                      <span className="ml-2">
                        {isCorrect ? (
                          <CheckCircle2 className="inline h-5 w-5 text-accent" />
                        ) : isIncorrect ? (
                          <XCircle className="inline h-5 w-5 text-destructive" />
                        ) : null}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-2 text-base text-foreground">{question.question}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.type === "multiple-choice" && question.options ? (
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  disabled={submitted}
                >
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`flex items-center space-x-2 rounded-lg border p-4 ${
                        submitted && option === question.correctAnswer
                          ? "border-accent bg-accent/10"
                          : submitted && answers[question.id] === option && option !== question.correctAnswer
                            ? "border-destructive bg-destructive/10"
                            : "border-border"
                      }`}
                    >
                      <RadioGroupItem value={option} id={`q${question.id}-option${optionIndex}`} />
                      <Label htmlFor={`q${question.id}-option${optionIndex}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  disabled={submitted}
                >
                  {["Verdadero", "Falso"].map((option) => (
                    <div
                      key={option}
                      className={`flex items-center space-x-2 rounded-lg border p-4 ${
                        submitted && option === question.correctAnswer
                          ? "border-accent bg-accent/10"
                          : submitted && answers[question.id] === option && option !== question.correctAnswer
                            ? "border-destructive bg-destructive/10"
                            : "border-border"
                      }`}
                    >
                      <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                      <Label htmlFor={`q${question.id}-${option}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {submitted && (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExplanation(question.id)}
                    className="text-primary"
                  >
                    {showExplanations[question.id] ? "Ocultar" : "Ver"} Explicación
                  </Button>
                  {showExplanations[question.id] && (
                    <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground">Explicación:</p>
                      <p className="mt-1">{question.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}

      {!submitted && questions.length > 0 && (
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full"
          disabled={Object.keys(answers).length !== questions.length}
        >
          Enviar Respuestas
        </Button>
      )}
    </div>
  )
}

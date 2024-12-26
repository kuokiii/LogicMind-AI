"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useProgress } from "@/contexts/ProgressContext"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizProps {
  id: string
  title: string
  topic: string
  questions: QuizQuestion[]
}

export function Quiz({ id, title, topic, questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const { updateProgress, isItemCompleted } = useProgress()

  // Check if quiz is already completed
  const alreadyCompleted = isItemCompleted(topic, id)

  const handleAnswer = () => {
    if (selectedAnswer === null) return

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const nextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
      if (!alreadyCompleted) {
        updateProgress(topic, id)
      }
    }
  }

  if (completed || alreadyCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title} - {alreadyCompleted ? 'Completed' : 'Results'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {!alreadyCompleted && (
              <h3 className="text-2xl font-bold mb-4">
                Your Score: {score}/{questions.length}
              </h3>
            )}
            <p className="mb-4">
              {alreadyCompleted 
                ? "You've already completed this quiz!"
                : score === questions.length
                ? "Perfect score! Excellent work!"
                : score >= questions.length / 2
                ? "Good job! Keep practicing to improve further."
                : "Keep practicing! You'll get better with time."}
            </p>
            {!alreadyCompleted && (
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {!showExplanation ? (
          <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
            Submit Answer
          </Button>
        ) : (
          <div className="space-y-4">
            <Alert variant={selectedAnswer === questions[currentQuestion].correctAnswer ? 'default' : 'destructive'}>
              {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {selectedAnswer === questions[currentQuestion].correctAnswer ? 'Correct!' : 'Incorrect'}
              </AlertTitle>
              <AlertDescription>
                {questions[currentQuestion].explanation}
              </AlertDescription>
            </Alert>
            <Button onClick={nextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


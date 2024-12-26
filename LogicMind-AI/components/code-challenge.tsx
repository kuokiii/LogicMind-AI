"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useProgress } from "@/contexts/ProgressContext"

interface CodeChallengeProps {
  title: string
  description: string
  initialCode: string
  solution: string
  hint?: string
  examples?: Array<{
    description: string
    code: string
    explanation: string
  }>
  topic: string
}

export function CodeChallenge({ 
  title, 
  description, 
  initialCode, 
  solution, 
  hint, 
  examples,
  topic 
}: CodeChallengeProps) {
  const [code, setCode] = useState(initialCode)
  const [showHint, setShowHint] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  })
  const { updateProgress } = useProgress()

  const checkSolution = () => {
    const normalizedCode = code.trim().replace(/\s+/g, ' ')
    const normalizedSolution = solution.trim().replace(/\s+/g, ' ')

    if (normalizedCode === normalizedSolution) {
      setFeedback({
        type: 'success',
        message: 'Congratulations! Your solution is correct!'
      })
      updateProgress(topic, title)
    } else {
      setFeedback({
        type: 'error',
        message: 'Not quite right. Try again!'
      })
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono mb-4"
          rows={8}
        />
        <div className="flex gap-4 mb-4">
          <Button onClick={checkSolution}>Check Solution</Button>
          {hint && (
            <Button variant="outline" onClick={() => setShowHint(!showHint)}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
          )}
          {examples && (
            <Button variant="outline" onClick={() => setShowExamples(!showExamples)}>
              {showExamples ? 'Hide Examples' : 'Show Examples'}
            </Button>
          )}
        </div>
        {showHint && hint && (
          <Alert className="mb-4">
            <AlertTitle>Hint</AlertTitle>
            <AlertDescription>{hint}</AlertDescription>
          </Alert>
        )}
        {showExamples && examples && (
          <div className="space-y-4 mb-4">
            <h3 className="font-semibold">Similar Examples:</h3>
            {examples.map((example, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
                <p className="font-medium mb-2">{example.description}</p>
                <pre className="bg-gray-200 p-2 rounded mb-2">{example.code}</pre>
                <p className="text-sm text-gray-600">{example.explanation}</p>
              </div>
            ))}
          </div>
        )}
        {feedback.type && (
          <Alert variant={feedback.type === 'success' ? 'default' : 'destructive'}>
            {feedback.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {feedback.type === 'success' ? 'Success!' : 'Try Again'}
            </AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}


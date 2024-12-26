"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProgress } from "@/contexts/ProgressContext"

export function ProgressTracker() {
  const { progress } = useProgress()

  const calculateOverallProgress = () => {
    const totalCompleted = progress.reduce((acc, topic) => acc + topic.progress, 0)
    const totalPossible = progress.reduce((acc, topic) => acc + topic.total, 0)
    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{calculateOverallProgress()}%</span>
            </div>
            <Progress value={calculateOverallProgress()} />
          </div>
          {progress.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{topic.topic}</span>
                <span>{Math.round((topic.progress / topic.total) * 100)}%</span>
              </div>
              <Progress value={(topic.progress / topic.total) * 100} />
              <p className="text-xs text-muted-foreground">
                Completed: {topic.progress} of {topic.total} items
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


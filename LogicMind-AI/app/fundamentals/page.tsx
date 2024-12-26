"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { CodeChallenge } from "@/components/code-challenge"
import { Quiz } from "@/components/quiz"
import { ProgressTracker } from "@/components/progress-tracker"

export default function Fundamentals() {
  const topics = [
    { topic: "Predicates", progress: 2, total: 5 },
    { topic: "Rules", progress: 1, total: 3 },
    { topic: "Inference", progress: 0, total: 4 },
    { topic: "Prolog Syntax", progress: 3, total: 6 }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GradientHeading>
            Fundamentals of Logic Programming
          </GradientHeading>
          
          <Tabs defaultValue="predicates" className="mb-8">
            <TabsList className="flex flex-wrap justify-start gap-2 w-full">
              <TabsTrigger value="predicates">Predicates</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="inference">Inference</TabsTrigger>
              <TabsTrigger value="prolog">Prolog Syntax</TabsTrigger>
            </TabsList>

            <TabsContent value="predicates">
              <Card>
                <CardHeader>
                  <CardTitle>Predicates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">
                    Predicates are statements about objects. In logic programming, they form the basic
                    units of logic. For example, "is_cat(fluffy)" is a predicate stating that Fluffy is a cat.
                  </p>
                  
                  <CodeChallenge
                    title="Practice: Writing Predicates"
                    description="Write a predicate that states 'John is a student'"
                    initialCode="% Write your predicate here"
                    solution="student(john)."
                    hint="Remember: predicates are written as name(argument)."
                  />

                  <Quiz
                    title="Predicates Quiz"
                    questions={[
                      {
                        question: "Which of the following is a valid Prolog predicate?",
                        options: [
                          "is_tall(john)",
                          "john_is_tall",
                          "tall(john, very)",
                          "tall = john"
                        ],
                        correctAnswer: 0,
                        explanation: "is_tall(john) is a valid predicate. Predicates consist of a name followed by arguments in parentheses."
                      },
                      {
                        question: "What does the predicate likes(mary, pizza) mean?",
                        options: [
                          "Pizza likes Mary",
                          "Mary likes pizza",
                          "Mary and pizza are related",
                          "Pizza and Mary are the same"
                        ],
                        correctAnswer: 1,
                        explanation: "The predicate likes(mary, pizza) means 'Mary likes pizza'. The first argument is the subject, and the second is the object."
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Similar structure for other tabs */}
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <ProgressTracker topics={topics} />
        </div>
      </div>
    </div>
  )
}


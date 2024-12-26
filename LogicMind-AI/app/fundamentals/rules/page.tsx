"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { CodeChallenge } from "@/components/code-challenge"
import { Quiz } from "@/components/quiz"
import { ProgressTracker } from "@/components/progress-tracker"

export default function Rules() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GradientHeading>Rules in Logic Programming</GradientHeading>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Understanding Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Rules in logic programming define relationships between facts and allow us to make logical inferences.
                A rule consists of a head (conclusion) and a body (conditions), separated by ":-".
              </p>
              <pre className="bg-gray-100 p-4 rounded-md mb-4">
                {`% Example rule: Someone is a grandparent if they are a parent of someone
% who is also a parent
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).`}
              </pre>
              
              <CodeChallenge
                title="Practice: Writing Rules"
                description="Write a rule that defines when someone is a sibling (they share a parent)"
                initialCode="% Write your rule here"
                solution="sibling(X, Y) :- parent(Z, X), parent(Z, Y), X \= Y."
                hint="Remember to use the parent relationship and ensure X and Y are different"
                topic="Rules"
              />

              <Quiz
                title="Rules Quiz"
                topic="Rules"
                questions={[
                  {
                    question: "What does the ':-' symbol mean in Prolog rules?",
                    options: [
                      "Equal to",
                      "If and only if",
                      "Greater than",
                      "If (implies)"
                    ],
                    correctAnswer: 3,
                    explanation: "The ':-' symbol in Prolog means 'if' or 'implies'. It separates the head (conclusion) from the body (conditions) of a rule."
                  },
                  {
                    question: "Which part of a rule represents the conclusion?",
                    options: [
                      "The head (left side)",
                      "The body (right side)",
                      "The variables",
                      "The predicates"
                    ],
                    correctAnswer: 0,
                    explanation: "The head of a rule (the part before ':-') represents the conclusion that will be true if all conditions in the body are satisfied."
                  },
                  {
                    question: "What is the purpose of variables in rules?",
                    options: [
                      "To store numerical values",
                      "To represent fixed constants",
                      "To represent patterns and relationships",
                      "To define function names"
                    ],
                    correctAnswer: 2,
                    explanation: "Variables in rules are used to represent patterns and relationships between different elements in the logic program."
                  }
                ]}
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <ProgressTracker />
        </div>
      </div>
    </div>
  )
}


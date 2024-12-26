"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { CodeChallenge } from "@/components/code-challenge"
import { Quiz } from "@/components/quiz"
import { ProgressTracker } from "@/components/progress-tracker"

export default function PrologSyntax() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GradientHeading>Prolog Syntax</GradientHeading>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Syntax Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Prolog has a simple but powerful syntax based on terms. The main elements are atoms,
                variables, compounds, and operators.
              </p>
              <pre className="bg-gray-100 p-4 rounded-md mb-4">
                {`% Atoms (start with lowercase or are quoted)
john.
'John Smith'.

% Variables (start with uppercase or underscore)
Person
_AnyValue

% Compounds (structures)
person(john, 25).
likes(john, pizza).

% Lists
[1, 2, 3].
[Head|Tail].`}
              </pre>
              
              <CodeChallenge
                title="Practice: Prolog Syntax"
                description="Write a compound term representing a book with title, author, and year"
                initialCode="% Write your compound term here"
                solution="book('The Logic Programming', 'John Logic', 2023)."
                hint="Use the format: book(Title, Author, Year)"
                topic="Prolog Syntax"
              />

              <Quiz
                title="Prolog Syntax Quiz"
                topic="Prolog Syntax"
                questions={[
                  {
                    question: "Which of these is a valid Prolog variable?",
                    options: [
                      "person",
                      "Person",
                      "123_var",
                      "my-var"
                    ],
                    correctAnswer: 1,
                    explanation: "Variables in Prolog must start with an uppercase letter or underscore."
                  },
                  {
                    question: "What is the correct way to write a list in Prolog?",
                    options: [
                      "{1, 2, 3}",
                      "[1, 2, 3]",
                      "(1, 2, 3)",
                      "<1, 2, 3>"
                    ],
                    correctAnswer: 1,
                    explanation: "Lists in Prolog are written using square brackets []."
                  },
                  {
                    question: "How do you represent an empty list in Prolog?",
                    options: [
                      "[]",
                      "null",
                      "{}",
                      "empty"
                    ],
                    correctAnswer: 0,
                    explanation: "An empty list in Prolog is represented as []."
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


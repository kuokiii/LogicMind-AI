"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { CodeChallenge } from "@/components/code-challenge"
import { Quiz } from "@/components/quiz"
import { ProgressTracker } from "@/components/progress-tracker"

export default function Inference() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GradientHeading>Inference in Logic Programming</GradientHeading>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Understanding Inference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Inference is the process of deriving new information from existing facts and rules.
                Logic programming systems use techniques like resolution and unification to perform inference.
              </p>
              <pre className="bg-gray-100 p-4 rounded-md mb-4">
                {`% Facts
parent(john, mary).
parent(mary, ann).

% Rule
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

% Query
?- grandparent(john, ann).
% The system infers: true`}
              </pre>
              
              <CodeChallenge
                title="Practice: Inference"
                description="Write facts and a rule to infer who are cousins (they share grandparents)"
                initialCode="% Write your facts and rule here"
                solution="cousin(X, Y) :- grandparent(Z, X), grandparent(Z, Y), X \= Y."
                hint="Use the grandparent relationship to define cousins"
                topic="Inference"
              />

              <Quiz
                title="Inference Quiz"
                topic="Inference"
                questions={[
                  {
                    question: "What is inference in logic programming?",
                    options: [
                      "Writing new rules",
                      "Storing facts in a database",
                      "Deriving new information from existing knowledge",
                      "Converting code to machine language"
                    ],
                    correctAnswer: 2,
                    explanation: "Inference is the process of deriving new information from existing facts and rules in the knowledge base."
                  },
                  {
                    question: "What is resolution in logic programming?",
                    options: [
                      "Screen resolution settings",
                      "A method of proving goals using existing knowledge",
                      "Resolving conflicts in the code",
                      "Setting the precision of numbers"
                    ],
                    correctAnswer: 1,
                    explanation: "Resolution is a method used in logic programming to prove goals by combining existing facts and rules."
                  },
                  {
                    question: "What happens during backward chaining?",
                    options: [
                      "The program runs in reverse",
                      "The system starts from the goal and works backwards to find supporting facts",
                      "The code is read from bottom to top",
                      "Variables are assigned in reverse order"
                    ],
                    correctAnswer: 1,
                    explanation: "Backward chaining is an inference method where the system starts from the goal and works backwards to find the facts and rules that support it."
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


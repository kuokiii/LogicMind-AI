"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { CodeChallenge } from "@/components/code-challenge"
import { Quiz } from "@/components/quiz"
import { ProgressTracker } from "@/components/progress-tracker"
import { AIAssistant } from "@/components/ai-assistant"

export default function Rules() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GradientHeading>
            Rules in Logic Programming
          </GradientHeading>
          
          <Tabs defaultValue="basics" className="mb-8">
            <TabsList className="flex flex-wrap justify-start gap-2 w-full">
              <TabsTrigger value="basics">Basics of Rules</TabsTrigger>
              <TabsTrigger value="complex">Complex Rules</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="basics">
              <Card>
                <CardHeader>
                  <CardTitle>Basics of Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Rules in logic programming are used to define relationships or derive new facts based on existing ones. 
                    A rule consists of a head and a body, separated by the ":-" symbol.
                  </p>
                  <pre className="bg-gray-100 p-4 rounded-md mb-4">
                    {`grandfather(X, Y) :- father(X, Z), parent(Z, Y).`}
                  </pre>
                  <p className="mb-4">
                    This rule states that X is a grandfather of Y if X is a father of Z and Z is a parent of Y.
                  </p>
                  
                  <CodeChallenge
                    title="Practice: Writing Basic Rules"
                    description="Write a rule for 'grandmother' relationship"
                    initialCode="% Write your rule here"
                    solution="grandmother(X, Y) :- mother(X, Z), parent(Z, Y)."
                    hint="Use the mother and parent predicates to define the grandmother relationship."
                    topic="Rules"
                  />

                  <Quiz
                    title="Basic Rules Quiz"
                    topic="Rules"
                    questions={[
                      {
                        question: "What does the ':-' symbol mean in Prolog rules?",
                        options: [
                          "Greater than or equal to",
                          "If and only if",
                          "Not equal to",
                          "Implies"
                        ],
                        correctAnswer: 3,
                        explanation: "In Prolog, the ':-' symbol is read as 'implies' or 'if'. It separates the head of the rule (conclusion) from the body (conditions)."
                      },
                      {
                        question: "Which part of a rule represents the conclusion?",
                        options: [
                          "The body",
                          "The head",
                          "The variables",
                          "The predicates"
                        ],
                        correctAnswer: 1,
                        explanation: "The head of a rule represents the conclusion. It's the part before the ':-' symbol and states what will be true if the conditions in the body are satisfied."
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complex">
              <Card>
                <CardHeader>
                  <CardTitle>Complex Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Complex rules in logic programming can involve multiple conditions, negation, and even arithmetic operations.
                  </p>
                  <pre className="bg-gray-100 p-4 rounded-md mb-4">
                    {`eligible_for_discount(Customer, Discount) :-
    total_purchases(Customer, Total),
    Total > 1000,
    Discount is Total * 0.1.`}
                  </pre>
                  <p className="mb-4">
                    This rule determines if a customer is eligible for a discount based on their total purchases.
                  </p>
                  
                  <CodeChallenge
                    title="Practice: Writing Complex Rules"
                    description="Write a rule for 'can_drive' that checks if a person is over 18 and has a valid license"
                    initialCode="% Write your rule here"
                    solution="can_drive(Person) :- age(Person, Age), Age >= 18, has_valid_license(Person)."
                    hint="Use the age predicate, a comparison, and the has_valid_license predicate in your rule."
                    topic="Complex Rules"
                  />

                  <Quiz
                    title="Complex Rules Quiz"
                    topic="Complex Rules"
                    questions={[
                      {
                        question: "What does the 'is' keyword do in Prolog rules?",
                        options: [
                          "Compares two values",
                          "Assigns a value to a variable",
                          "Performs arithmetic and assigns the result",
                          "Defines a new predicate"
                        ],
                        correctAnswer: 2,
                        explanation: "The 'is' keyword in Prolog is used to perform arithmetic operations and assign the result to a variable."
                      },
                      {
                        question: "How can you express negation in Prolog rules?",
                        options: [
                          "Using the 'not' keyword",
                          "Using the '!' symbol",
                          "Using the '\\+' operator",
                          "Using the 'false' predicate"
                        ],
                        correctAnswer: 2,
                        explanation: "In Prolog, negation is typically expressed using the '\\+' operator, which stands for 'not provable'."
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Applications of Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Rules in logic programming have various applications, including expert systems, 
                    natural language processing, and automated reasoning.
                  </p>
                  <pre className="bg-gray-100 p-4 rounded-md mb-4">
                    {`diagnosis(Patient, flu) :-
    symptom(Patient, fever),
    symptom(Patient, cough),
    symptom(Patient, fatigue).`}
                  </pre>
                  <p className="mb-4">
                    This rule could be part of a medical expert system to diagnose flu based on symptoms.
                  </p>
                  
                  <CodeChallenge
                    title="Practice: Applying Rules"
                    description="Write a rule for a simple recommendation system that suggests a book based on a user's interests"
                    initialCode="% Write your rule here"
                    solution="recommend_book(User, Book) :- likes(User, Genre), book_genre(Book, Genre), not(has_read(User, Book))."
                    hint="Use predicates for user likes, book genres, and books the user has already read."
                    topic="Rule Applications"
                  />

                  <Quiz
                    title="Rule Applications Quiz"
                    topic="Rule Applications"
                    questions={[
                      {
                        question: "Which of the following is NOT a common application of logic programming rules?",
                        options: [
                          "Expert systems",
                          "Natural language processing",
                          "Image recognition",
                          "Automated reasoning"
                        ],
                        correctAnswer: 2,
                        explanation: "While logic programming can be used in various domains, image recognition is typically handled by other AI techniques like neural networks. Expert systems, NLP, and automated reasoning are common applications of logic programming rules."
                      },
                      {
                        question: "In a route planning system using logic programming, what would rules typically represent?",
                        options: [
                          "The visual appearance of the map",
                          "The connections between locations",
                          "The user interface of the system",
                          "The color scheme of the routes"
                        ],
                        correctAnswer: 1,
                        explanation: "In a route planning system using logic programming, rules would typically represent the connections between locations, allowing the system to determine possible paths between points."
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <AIAssistant />
        </div>
        
        <div className="md:col-span-1">
          <ProgressTracker />
        </div>
      </div>
    </div>
  )
}


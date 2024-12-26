"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { ProgressTracker } from "@/components/progress-tracker"
import { useProgress } from "@/contexts/ProgressContext"
import { CheckCircle2, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Evaluation() {
  const [reflection, setReflection] = useState("")
  const [codeToReview, setCodeToReview] = useState(`parent(john, mary).
parent(mary, ann).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).`)
  const [performance, setPerformance] = useState("")
  const [feedback, setFeedback] = useState("")
  const { updateProgress } = useProgress()

  const handleSubmitReflection = () => {
    setFeedback("Thank you for your reflection! Your insights will help improve your understanding.")
    updateProgress("Evaluation", "reflection")
  }

  const handleCodeReview = () => {
    const analysis = analyzeCode(codeToReview)
    setPerformance(analysis)
    updateProgress("Evaluation", "code_review")
  }

  const analyzeCode = (code: string): string => {
    const lines = code.split('\n')
    const facts = lines.filter(line => !line.includes(':-') && line.trim() !== '')
    const rules = lines.filter(line => line.includes(':-'))
    
    return `Code Analysis:
1. Structure:
   - Facts: ${facts.length}
   - Rules: ${rules.length}
   
2. Complexity:
   - Simple predicates: ${facts.length}
   - Complex predicates: ${rules.length}
   
3. Recommendations:
   - Consider adding more test cases
   - Document complex rules
   - Add type predicates for entities`
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GradientHeading>
            Evaluation and Reflection
          </GradientHeading>
          
          <Tabs defaultValue="code_review" className="mb-8">
            <TabsList className="flex flex-wrap justify-start gap-2 w-full">
              <TabsTrigger value="code_review">Code Review</TabsTrigger>
              <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
              <TabsTrigger value="reflection">Personal Reflection</TabsTrigger>
              <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
            </TabsList>

            <TabsContent value="code_review">
              <Card>
                <CardHeader>
                  <CardTitle>Code Review and Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Submit your Prolog code for review. The system will analyze structure,
                    complexity, and provide recommendations for improvement.
                  </p>
                  <Textarea
                    value={codeToReview}
                    onChange={(e) => setCodeToReview(e.target.value)}
                    className="font-mono mb-4 h-48"
                    placeholder="Enter your Prolog code here..."
                  />
                  <Button onClick={handleCodeReview} className="mb-4">Analyze Code</Button>
                  {performance && (
                    <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                      {performance}
                    </pre>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Query Optimization</h3>
                      <pre className="bg-gray-100 p-4 rounded-md mb-4">
{`% Original query
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).

% Optimized query
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- ancestor(X, Z), parent(Z, Y).`}
                      </pre>
                      <p className="text-sm text-gray-600">
                        The optimized version reduces the depth of recursion and improves performance.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Memory Usage</h3>
                      <div className="bg-gray-100 p-4 rounded-md space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Stack Usage</span>
                            <span>45%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Heap Usage</span>
                            <span>30%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Performance Tips</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Use indexing for frequently queried predicates</li>
                        <li>Avoid deep recursion when possible</li>
                        <li>Consider using tail recursion optimization</li>
                        <li>Use cut (!) operator judiciously</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reflection">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Reflection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Learning Journey</h3>
                      <Textarea
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        className="h-32 mb-4"
                        placeholder="Reflect on your learning experience with logic programming..."
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Guided Reflection Questions</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            What was the most challenging concept to understand?
                          </label>
                          <Input className="mb-4" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            How has logic programming changed your approach to problem-solving?
                          </label>
                          <Input className="mb-4" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            What practical applications of logic programming interest you most?
                          </label>
                          <Input className="mb-4" />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSubmitReflection}>Submit Reflection</Button>
                    {feedback && (
                      <Alert className="mt-4">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{feedback}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessment">
              <Card>
                <CardHeader>
                  <CardTitle>Self Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Knowledge Assessment</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Basic Concepts</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Facts and Rules</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                  <button
                                    key={n}
                                    className={`w-8 h-8 rounded ${
                                      n <= 4 ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Queries and Variables</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                  <button
                                    key={n}
                                    className={`w-8 h-8 rounded ${
                                      n <= 3 ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Advanced Topics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Recursion</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                  <button
                                    key={n}
                                    className={`w-8 h-8 rounded ${
                                      n <= 3 ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Backtracking</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                  <button
                                    key={n}
                                    className={`w-8 h-8 rounded ${
                                      n <= 4 ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Project Portfolio</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Family Relationships</h4>
                          <pre className="bg-gray-100 p-2 rounded text-sm mb-2">
                            {`parent(john, mary).
parent(mary, ann).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).`}
                          </pre>
                          <p className="text-sm text-gray-600">
                            Basic implementation demonstrating facts and rules.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Expert System</h4>
                          <pre className="bg-gray-100 p-2 rounded text-sm mb-2">
                            {`symptom(fever).
has_condition(X, flu) :- symptom(fever), symptom(cough).`}
                          </pre>
                          <p className="text-sm text-gray-600">
                            Simple expert system for medical diagnosis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <ProgressTracker />
        </div>
      </div>
    </div>
  )
}


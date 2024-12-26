"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { CodeChallenge } from "@/components/code-challenge"
import { Quiz } from "@/components/quiz"
import { ProgressTracker } from "@/components/progress-tracker"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AIAssistant } from "@/components/ai-assistant"

export default function KnowledgeRepresentation() {
  const [familyFacts, setFamilyFacts] = useState<string[]>([
    "parent(john, mary).",
    "parent(john, tom).",
    "parent(mary, ann).",
    "parent(tom, jim).",
  ])
  const [newFact, setNewFact] = useState("")

  const addFact = () => {
    if (newFact) {
      setFamilyFacts([...familyFacts, newFact])
      setNewFact("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GradientHeading>
            Knowledge Representation and Reasoning
          </GradientHeading>
          
          <Tabs defaultValue="knowledge-bases" className="mb-8">
            <TabsList className="flex flex-wrap justify-start gap-2 w-full">
              <TabsTrigger value="knowledge-bases">Knowledge Bases</TabsTrigger>
              <TabsTrigger value="inference-rules">Inference Rules</TabsTrigger>
              <TabsTrigger value="automated-reasoning">Automated Reasoning</TabsTrigger>
              <TabsTrigger value="complex-queries">Complex Queries</TabsTrigger>
            </TabsList>

            <TabsContent value="knowledge-bases">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Bases</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Knowledge bases are structured collections of information that can be reasoned about.
                    In logic programming, they consist of facts and rules.
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <h3 className="font-semibold mb-2">Interactive Knowledge Base:</h3>
                    <pre className="whitespace-pre-wrap mb-4">
                      {familyFacts.join("\n")}
                    </pre>
                    <div className="flex space-x-2">
                      <Input
                        value={newFact}
                        onChange={(e) => setNewFact(e.target.value)}
                        placeholder="Enter a new fact (e.g., parent(tom, jim).)"
                      />
                      <Button onClick={addFact}>Add Fact</Button>
                    </div>
                  </div>
                  
                  <CodeChallenge
                    title="Practice: Adding to Knowledge Base"
                    description="Write a fact stating that 'Alice is a parent of Bob'"
                    initialCode="% Write your fact here"
                    solution="parent(alice, bob)."
                    hint="Use the parent predicate with two arguments: parent(parent_name, child_name)."
                    examples={[
                      {
                        description: "Adding a simple fact about John being a parent of Mary",
                        code: "parent(john, mary).",
                        explanation: "This fact establishes a parent relationship between John and Mary"
                      },
                      {
                        description: "Adding multiple related facts",
                        code: "parent(susan, tom).\nparent(tom, lisa).",
                        explanation: "These facts establish that Susan is Tom's parent and Tom is Lisa's parent"
                      },
                      {
                        description: "Adding facts with properties",
                        code: "age(bob, 10).\nstudent(bob).",
                        explanation: "Facts can represent various properties and relationships"
                      }
                    ]}
                    topic="Knowledge Base"
                  />

                  <Quiz
                    title="Knowledge Bases Quiz"
                    topic="Knowledge Bases"
                    questions={[
                      {
                        question: "What is a knowledge base in logic programming?",
                        options: [
                          "A database of all possible logical statements",
                          "A collection of facts and rules used for reasoning",
                          "A list of questions and answers about logic",
                          "A programming language for artificial intelligence"
                        ],
                        correctAnswer: 1,
                        explanation: "In logic programming, a knowledge base is a structured collection of facts and rules that can be used for automated reasoning and inference."
                      },
                      {
                        question: "Which of the following is a valid fact in a Prolog knowledge base?",
                        options: [
                          "parent(John, Mary) = true",
                          "John is_parent_of Mary",
                          "parent(john, mary).",
                          "FACT: John is Mary's parent"
                        ],
                        correctAnswer: 2,
                        explanation: "In Prolog, facts are represented as predicates with arguments, followed by a period. The correct format is 'parent(john, mary).'."
                      },
                      {
                        question: "What is the purpose of a knowledge base in AI?",
                        options: [
                          "To store all possible facts about the world",
                          "To provide a foundation for reasoning and inference",
                          "To replace human knowledge with machine knowledge",
                          "To generate random facts for testing purposes"
                        ],
                        correctAnswer: 1,
                        explanation: "The primary purpose of a knowledge base in AI is to provide a foundation for reasoning and inference."
                      },
                      {
                        question: "How are relationships represented in a knowledge base?",
                        options: [
                          "Using mathematical equations",
                          "Using natural language sentences",
                          "Using predicates with arguments",
                          "Using XML tags"
                        ],
                        correctAnswer: 2,
                        explanation: "Relationships in a knowledge base are represented using predicates with arguments, like parent(john, mary)."
                      },
                      {
                        question: "What is the difference between facts and rules in a knowledge base?",
                        options: [
                          "Facts are always true, rules can be conditional",
                          "Facts are in English, rules are in Prolog",
                          "Facts are for querying, rules are for storing",
                          "There is no difference"
                        ],
                        correctAnswer: 0,
                        explanation: "Facts are unconditional truths in the knowledge base, while rules define conditional relationships or inferences."
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inference-rules">
              <Card>
                <CardHeader>
                  <CardTitle>Inference Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Inference rules allow the system to derive new knowledge from existing facts and rules.
                  </p>
                  
                  <CodeChallenge
                    title="Practice: Writing Inference Rules"
                    description="Write an inference rule for 'sibling' relationship"
                    initialCode="% Write your rule here"
                    solution="sibling(X, Y) :- parent(Z, X), parent(Z, Y), X \= Y."
                    hint="Two people are siblings if they share a parent and are not the same person"
                    examples={[
                      {
                        description: "Grandparent relationship rule",
                        code: "grandparent(X, Z) :- parent(X, Y), parent(Y, Z).",
                        explanation: "X is a grandparent of Z if X is a parent of Y and Y is a parent of Z"
                      },
                      {
                        description: "Aunt relationship rule",
                        code: "aunt(X, Y) :- female(X), sibling(X, Z), parent(Z, Y).",
                        explanation: "X is an aunt of Y if X is female, X is a sibling of Z, and Z is a parent of Y"
                      },
                      {
                        description: "Ancestor relationship rule",
                        code: "ancestor(X, Y) :- parent(X, Y).\nancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).",
                        explanation: "Recursive rule defining ancestors through direct parenthood or intermediate ancestors"
                      }
                    ]}
                    topic="Inference Rules"
                  />

                  <Quiz
                    title="Inference Rules Quiz"
                    topic="Inference Rules"
                    questions={[
                      {
                        question: "What does the symbol ':-' mean in Prolog rules?",
                        options: [
                          "It means 'is defined as'",
                          "It means 'if and only if'",
                          "It means 'is not equal to'",
                          "It means 'is greater than'"
                        ],
                        correctAnswer: 0,
                        explanation: "In Prolog, ':-' is read as 'is defined as' or 'if'. It separates the head of the rule from its body."
                      },
                      {
                        question: "What is the purpose of variables in inference rules?",
                        options: [
                          "To store numerical values",
                          "To represent patterns and relationships",
                          "To name the rules",
                          "To count the number of facts"
                        ],
                        correctAnswer: 1,
                        explanation: "Variables in inference rules represent patterns and relationships between different elements in the knowledge base."
                      },
                      {
                        question: "How does Prolog handle rule evaluation?",
                        options: [
                          "Left to right, top to bottom",
                          "Right to left, bottom to top",
                          "Random order",
                          "Alphabetical order"
                        ],
                        correctAnswer: 0,
                        explanation: "Prolog evaluates rules from left to right and searches for solutions from top to bottom in the knowledge base."
                      },
                      {
                        question: "What is backtracking in rule evaluation?",
                        options: [
                          "Going back to previous rules when current path fails",
                          "Removing rules from the knowledge base",
                          "Writing rules in reverse order",
                          "Debugging rules"
                        ],
                        correctAnswer: 0,
                        explanation: "Backtracking is the process of going back to previous choice points when the current solution path fails."
                      },
                      {
                        question: "What is the cut operator (!) used for in rules?",
                        options: [
                          "To end the program",
                          "To separate rules",
                          "To prevent backtracking",
                          "To mark important rules"
                        ],
                        correctAnswer: 2,
                        explanation: "The cut operator (!) is used to prevent backtracking and commit to the current choice in rule evaluation."
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automated-reasoning">
              <Card>
                <CardHeader>
                  <CardTitle>Automated Reasoning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Automated reasoning is the process of drawing conclusions from a knowledge base
                    using techniques like resolution and unification.
                  </p>
                  
                  <CodeChallenge
                    title="Practice: Automated Reasoning"
                    description="Write a query to find all of Mary's children"
                    initialCode="% Write your query here"
                    solution="?- parent(mary, X)."
                    hint="Use the parent predicate with mary as the first argument and a variable for the child"
                    examples={[
                      {
                        description: "Finding all parents",
                        code: "?- parent(X, _).",
                        explanation: "This query finds all people who are parents"
                      },
                      {
                        description: "Finding specific relationships",
                        code: "?- parent(john, X), female(X).",
                        explanation: "This query finds all of John's children who are female"
                      },
                      {
                        description: "Finding relationships with multiple conditions",
                        code: "?- parent(X, Y), parent(Y, Z), female(Z).",
                        explanation: "This query finds grandparent relationships where the grandchild is female"
                      }
                    ]}
                    topic="Automated Reasoning"
                  />

                  <Quiz
                    title="Automated Reasoning Quiz"
                    topic="Automated Reasoning"
                    questions={[
                      {
                        question: "What is unification in logic programming?",
                        options: [
                          "Combining knowledge bases",
                          "Matching variables with values",
                          "Creating new rules",
                          "Organizing facts"
                        ],
                        correctAnswer: 1,
                        explanation: "Unification is the process of matching variables with values or other variables during query resolution."
                      },
                      {
                        question: "How does Prolog handle multiple solutions?",
                        options: [
                          "Returns only the first solution",
                          "Returns all solutions through backtracking",
                          "Randomly selects one solution",
                          "Combines all solutions into one"
                        ],
                        correctAnswer: 1,
                        explanation: "Prolog uses backtracking to find and return all possible solutions to a query."
                      },
                      {
                        question: "What is resolution in logic programming?",
                        options: [
                          "Screen resolution settings",
                          "Solving conflicts between rules",
                          "Method of proving goals using knowledge",
                          "Setting numerical precision"
                        ],
                        correctAnswer: 2,
                        explanation: "Resolution is a method used to prove goals by combining existing facts and rules in the knowledge base."
                      },
                      {
                        question: "What is the role of variables in queries?",
                        options: [
                          "To store temporary values",
                          "To represent unknown values to be found",
                          "To count the number of solutions",
                          "To name the queries"
                        ],
                        correctAnswer: 1,
                        explanation: "Variables in queries represent unknown values that Prolog should find solutions for."
                      },
                      {
                        question: "What is the purpose of the underscore (_) in Prolog queries?",
                        options: [
                          "To mark important variables",
                          "To represent any value without binding it",
                          "To separate query parts",
                          "To indicate missing values"
                        ],
                        correctAnswer: 1,
                        explanation: "The underscore (_) is an anonymous variable that matches any value without binding it."
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complex-queries">
              <Card>
                <CardHeader>
                  <CardTitle>Complex Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Complex queries combine multiple predicates and conditions to extract
                    sophisticated information from the knowledge base.
                  </p>
                  
                  <CodeChallenge
                    title="Practice: Complex Queries"
                    description="Write a query to find all pairs of cousins"
                    initialCode="% Write your query here"
                    solution="?- parent(P1, X), parent(P2, Y), sibling(P1, P2), X \= Y."
                    hint="Cousins are children of siblings. Use the parent and sibling predicates."
                    examples={[
                      {
                        description: "Finding common ancestors",
                        code: "?- ancestor(X, john), ancestor(X, mary).",
                        explanation: "This query finds common ancestors of John and Mary"
                      },
                      {
                        description: "Finding family relationships",
                        code: "?- parent(X, Y), parent(Y, Z), parent(Z, W).",
                        explanation: "This query finds great-grandparent relationships"
                      },
                      {
                        description: "Finding relationship paths",
                        code: "?- parent(X, Y), parent(Y, john).",
                        explanation: "This query finds all grandparents of John"
                      }
                    ]}
                    topic="Complex Queries"
                  />

                  <Quiz
                    title="Complex Queries Quiz"
                    topic="Complex Queries"
                    questions={[
                      {
                        question: "What makes a query 'complex'?",
                        options: [
                          "It uses many variables",
                          "It combines multiple predicates and conditions",
                          "It takes long to execute",
                          "It uses special characters"
                        ],
                        correctAnswer: 1,
                        explanation: "A complex query combines multiple predicates and conditions to express sophisticated relationships."
                      },
                      {
                        question: "How are multiple conditions combined in a query?",
                        options: [
                          "Using AND operator",
                          "Using commas",
                          "Using semicolons",
                          "Using plus signs"
                        ],
                        correctAnswer: 1,
                        explanation: "In Prolog, multiple conditions in a query are combined using commas, which represent logical AND."
                      },
                      {
                        question: "What is the purpose of the \\= operator in queries?",
                        options: [
                          "Mathematical inequality",
                          "String comparison",
                          "Not unifiable (different values)",
                          "Greater than"
                        ],
                        correctAnswer: 2,
                        explanation: "The \\= operator ensures that two terms are not unifiable (have different values)."
                      },
                      {
                        question: "How does Prolog handle query optimization?",
                        options: [
                          "Automatically reorders goals for efficiency",
                          "Uses indexes for faster searching",
                          "Both A and B",
                          "Does not perform optimization"
                        ],
                        correctAnswer: 2,
                        explanation: "Prolog optimizes queries by reordering goals and using indexes for efficient searching."
                      },
                      {
                        question: "What is the role of recursion in complex queries?",
                        options: [
                          "To create infinite loops",
                          "To find paths through relationships",
                          "To count solutions",
                          "To name variables"
                        ],
                        correctAnswer: 1,
                        explanation: "Recursion in complex queries is used to find paths through relationships, like ancestors or descendants."
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


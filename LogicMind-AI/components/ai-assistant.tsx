"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const predefinedResponses = {
  "what is logic programming": `Logic programming is a programming paradigm based on formal logic. Programs written in a logic programming language are a set of sentences in logical form that express facts and rules about some problem domain.

Key concepts:
1. Facts - Basic assertions about the problem domain
2. Rules - Ways to make logical inferences
3. Queries - Questions asked about the domain

Example in Prolog:
% Facts
parent(john, mary).
parent(mary, ann).

% Rule
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

% Query
?- grandparent(john, ann).`,

  "explain prolog": `Prolog (Programming in Logic) is a logic programming language. It has a simple core consisting of pattern-matching, tree-based data structuring, and automatic backtracking.

Key features:
1. Declarative - You specify what you want to achieve, not how
2. Pattern matching - Uses unification to match queries with facts
3. Backtracking - Automatically tries alternative solutions
4. Built-in inference - Can derive new information from facts and rules

Example:
% Define relationships
parent(john, mary).
parent(mary, ann).
sibling(X, Y) :- parent(Z, X), parent(Z, Y), X \\= Y.

% Query to find siblings
?- sibling(X, Y).`,

  "what are predicates": `Predicates in logic programming are statements about objects and their relationships. They are the basic building blocks of logic programs.

Structure:
predicate_name(argument1, argument2, ..., argumentN)

Examples:
1. Simple predicate:
   person(john).

2. Relationship predicate:
   likes(john, pizza).

3. Complex predicate:
   teaches(professor, subject, student, semester).

Predicates can be:
1. Facts - Always true
2. Rules - True if conditions are met
3. Queries - Questions about the knowledge base`,

  "how does inference work": `Inference in logic programming is the process of deriving new information from existing facts and rules. It uses techniques like resolution and unification.

Types of inference:
1. Forward chaining - From facts to conclusions
2. Backward chaining - From goals back to supporting facts

Example:
% Facts and rules
parent(john, mary).
parent(mary, ann).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

% When querying grandparent(john, ann)
1. System looks for grandparent rule
2. Matches variables X=john, finds Y=mary
3. Finds parent(mary, ann)
4. Concludes john is grandparent of ann`,

  "what is unification": `Unification is a key process in logic programming where variables are matched with terms. It's used to determine if two terms can be made identical by substituting variables.

Examples:
1. likes(john, X) unifies with likes(john, pizza)
   Result: X = pizza

2. person(X, age(Y)) unifies with person(john, age(25))
   Result: X = john, Y = 25

3. [H|T] unifies with [1, 2, 3]
   Result: H = 1, T = [2, 3]

Unification is used in:
1. Pattern matching
2. Query resolution
3. Rule application`,

  "explain backtracking": `Backtracking is an algorithm used in logic programming to find all solutions to a goal. When a goal fails, the system goes back to the most recent choice point and tries an alternative path.

Example:
parent(john, mary).
parent(john, tom).
parent(mary, ann).
parent(tom, jim).

?- parent(john, X).
First solution: X = mary
Backtrack: X = tom

Key concepts:
1. Choice points - Where alternative solutions exist
2. Failure - When a goal cannot be satisfied
3. Backtrack points - Where execution resumes after failure`,

  "what are horn clauses": `Horn clauses are a fundamental concept in logic programming. They are logical formulas with at most one positive literal.

Structure:
H :- B1, B2, ..., Bn
(Head :- Body)

Types:
1. Facts: positive literals
   example(fact).

2. Rules: implication
   parent(X, Y) :- father(X, Y).

3. Goals: negative literals
   ?- goal(X).

Horn clauses are:
1. Computationally efficient
2. Basis for Prolog
3. Used in automated reasoning`,

  "explain the cut operator": `The cut operator (!) in Prolog is used to control backtracking. It commits to choices made up to that point and prevents backtracking past the cut.

Example:
max(X, Y, X) :- X >= Y, !.
max(X, Y, Y).

Effects:
1. Improves efficiency
2. Prevents unnecessary backtracking
3. Can affect program logic

Use cases:
1. Optimization
2. Controlling search space
3. Implementing if-then-else`,

  "what is resolution": `Resolution is a method of theorem proving used in logic programming. It combines clauses to produce new clauses and prove goals.

Process:
1. Convert to clause form
2. Apply resolution rule
3. Generate resolvent

Example:
parent(john, mary).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

Resolution steps:
1. Match query with rule head
2. Substitute variables
3. Prove subgoals`,

  "explain lists in prolog": `Lists are a fundamental data structure in Prolog. They are sequences of elements written in square brackets.

Syntax:
1. Empty list: []
2. List with elements: [1, 2, 3]
3. Head|Tail notation: [H|T]

Common operations:
1. member/2 - Check if element is in list
2. append/3 - Combine lists
3. length/2 - Get list length

Example:
[1, 2, 3] = [H|T]
H = 1
T = [2, 3]`,
  "what is recursion in prolog": `Recursion in Prolog is a technique where a predicate is defined in terms of itself. It's commonly used for processing lists and solving problems that can be broken down into smaller, similar sub-problems.

Example:
% Length of a list
length_of([], 0).
length_of([_|T], N) :-
    length_of(T, N1),
    N is N1 + 1.

% Sum of a list
sum_list([], 0).
sum_list([H|T], Sum) :-
    sum_list(T, Rest),
    Sum is H + Rest.

Key concepts:
1. Base case - Handles the simplest scenario
2. Recursive case - Breaks problem into smaller parts
3. Termination condition - Ensures recursion ends`,

  "what are arithmetic operators in prolog": `Prolog provides several arithmetic operators for mathematical calculations. The 'is' operator is used for evaluation.

Common operators:
1. + Addition
2. - Subtraction
3. * Multiplication
4. / Division
5. mod Modulo
6. ** Exponentiation

Example:
sum(X, Y, Z) :- Z is X + Y.
square(X, Y) :- Y is X * X.
power(X, Y, Z) :- Z is X ** Y.

Note: Use 'is' for evaluation:
?- X is 2 + 3.
X = 5.`,

  "how to debug prolog programs": `Debugging Prolog programs involves several techniques and built-in predicates:

1. trace/0 - Enables detailed execution tracing
2. spy/1 - Sets spy points on predicates
3. debugging/0 - Shows current debug status
4. nodebug/0 - Turns off debugging

Example:
?- trace.
?- spy(predicate_name).

Debugging steps:
1. Call - When entering a predicate
2. Exit - When predicate succeeds
3. Fail - When predicate fails
4. Redo - When backtracking`,

  "what are dynamic predicates": `Dynamic predicates in Prolog can be modified during program execution using assert/1 and retract/1.

Declaration:
:- dynamic predicate_name/arity.

Operations:
1. assert/1 - Add new clauses
2. retract/1 - Remove clauses
3. retractall/1 - Remove all matching clauses

Example:
:- dynamic fact/1.
assert(fact(x)).
retract(fact(x)).

Use cases:
1. Knowledge base updates
2. State management
3. Learning systems`,

  "explain prolog operators": `Prolog operators are special symbols that can be used in infix, prefix, or postfix notation.

Types:
1. xfx - Non-associative infix
2. xfy - Right-associative infix
3. yfx - Left-associative infix
4. fx - Prefix
5. fy - Prefix
6. xf - Postfix
7. yf - Postfix

Example:
:- op(500, xfx, likes).
john likes pizza.

Common operators:
1. :- (If)
2. , (And)
3. ; (Or)
4. = (Unification)`,
}

const suggestedQuestions = [
  "What is logic programming?",
  "Explain Prolog",
  "What are predicates?",
  "How does inference work?",
  "What is unification?",
  "Explain backtracking",
  "What are Horn clauses?",
  "Explain the cut operator",
  "What is resolution?",
  "Explain lists in Prolog",
  "What is recursion in Prolog?",
  "What are arithmetic operators in Prolog?",
  "How to debug Prolog programs?",
  "What are dynamic predicates?",
  "Explain Prolog operators",
]

export function AIAssistant() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [activeTab, setActiveTab] = useState("chat")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lowercaseQuery = query.toLowerCase()
    const matchedResponse = Object.entries(predefinedResponses).find(([key]) => 
      lowercaseQuery.includes(key)
    )
    
    if (matchedResponse) {
      setResponse(matchedResponse[1])
    } else {
      setResponse("I'm sorry, I don't have information about that specific topic. Try asking about basic logic programming concepts, Prolog syntax, or specific features like unification and backtracking.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Logic Programming Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about logic programming..."
              />
              <Button type="submit">Ask</Button>
            </form>
            {response && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <pre className="whitespace-pre-wrap font-mono text-sm">{response}</pre>
              </div>
            )}
          </TabsContent>
          <TabsContent value="examples">
            <div className="space-y-4">
              <h3 className="font-semibold">Example Prolog Programs:</h3>
              <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
{`% Family relationships
parent(john, mary).
parent(mary, ann).
parent(tom, jim).

grandparent(X, Z) :- 
    parent(X, Y), 
    parent(Y, Z).

sibling(X, Y) :- 
    parent(Z, X), 
    parent(Z, Y), 
    X \\= Y.

% List operations
member(X, [X|_]).
member(X, [_|T]) :- 
    member(X, T).

append([], L, L).
append([H|T], L, [H|R]) :- 
    append(T, L, R).`}
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="help">
            <div className="space-y-4">
              <h3 className="font-semibold">Suggested Questions:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {suggestedQuestions.map((question, index) => (
                  <li key={index}>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setQuery(question)
                        setActiveTab("chat")
                      }}
                    >
                      {question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


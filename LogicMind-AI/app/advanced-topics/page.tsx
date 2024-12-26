"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { GradientHeading } from "@/components/ui/gradient-heading"

export default function AdvancedTopics() {
  const [showNeuralSymbolicExample, setShowNeuralSymbolicExample] = useState(false)
  const [showCLPExample, setShowCLPExample] = useState(false)

  return (
    <div className="container mx-auto px-4 py-12">
      <GradientHeading>
        Advanced Topics in Logic Programming and AI
      </GradientHeading>
      
      <Tabs defaultValue="neural-symbolic" className="mb-8">
        <TabsList className="flex flex-wrap justify-start gap-2 w-full">
          <TabsTrigger value="neural-symbolic" className="flex-shrink-0">
            Neural-Symbolic
          </TabsTrigger>
          <TabsTrigger value="clp" className="flex-shrink-0">
            Constraint Logic
          </TabsTrigger>
          <TabsTrigger value="probabilistic" className="flex-shrink-0">
            Probabilistic Logic
          </TabsTrigger>
          <TabsTrigger value="inductive" className="flex-shrink-0">
            Inductive Logic
          </TabsTrigger>
        </TabsList>
        <TabsContent value="neural-symbolic">
          <Card>
            <CardHeader>
              <CardTitle>Neural-Symbolic Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Neural-symbolic integration combines the learning capabilities of neural networks
                with the reasoning capabilities of symbolic systems. This approach aims to create
                AI systems that can both learn from data and reason about complex relationships.
              </p>
              <Button onClick={() => setShowNeuralSymbolicExample(!showNeuralSymbolicExample)}>
                {showNeuralSymbolicExample ? "Hide" : "Show"} Example
              </Button>
              {showNeuralSymbolicExample && (
                <pre className="bg-gray-100 p-4 rounded-md mt-4">
                  {`# Python example using TensorFlow and logic programming

import tensorflow as tf
from pyDatalog import pyDatalog

# Define a simple neural network
model = tf.keras.Sequential([
    tf.keras.layers.Dense(10, activation='relu', input_shape=(4,)),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

# Define logical rules
pyDatalog.create_terms('X, Y, parent, grandparent')
+parent('John', 'Mary')
+parent('Mary', 'Tom')
grandparent(X, Y) <= parent(X, Z) & parent(Z, Y)

# Combine neural network output with logical reasoning
def neural_symbolic_inference(input_data):
    nn_output = model.predict(input_data)
    logical_output = grandparent('John', Y)
    return nn_output, logical_output

# This example demonstrates how neural network predictions
# can be combined with logical reasoning for more
# comprehensive AI systems.`}
                </pre>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="clp">
          <Card>
            <CardHeader>
              <CardTitle>Constraint Logic Programming (CLP)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                CLP extends logic programming with constraints, allowing for efficient solving
                of complex optimization problems. It's widely used in scheduling, planning, and
                resource allocation tasks.
              </p>
              <Button onClick={() => setShowCLPExample(!showCLPExample)}>
                {showCLPExample ? "Hide" : "Show"} Example
              </Button>
              {showCLPExample && (
                <pre className="bg-gray-100 p-4 rounded-md mt-4">
                  {`% Prolog CLP example: Solving a simple scheduling problem

:- use_module(library(clpfd)).

schedule(StartTimes) :-
    StartTimes = [ST1, ST2, ST3, ST4],
    StartTimes ins 0..23,
    
    % Task durations
    D1 #= 2, D2 #= 3, D3 #= 2, D4 #= 4,
    
    % Ensure tasks don't overlap
    ST1 + D1 #=< ST2,
    ST2 + D2 #=< ST3,
    ST3 + D3 #=< ST4,
    
    % All tasks must be completed within 24 hours
    ST4 + D4 #=< 24,
    
    % Label the variables
    label(StartTimes).

% Query: schedule(StartTimes).
% This will find a valid schedule that satisfies all constraints.`}
                </pre>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="probabilistic">
          <Card>
            <CardHeader>
              <CardTitle>Probabilistic Logic Programming</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This field combines logic programming with probability theory, enabling reasoning
                under uncertainty. It's crucial for dealing with real-world scenarios where
                information is often incomplete or uncertain.
              </p>
              <pre className="bg-gray-100 p-4 rounded-md mt-4">
                {`% ProbLog example

% Facts with probabilities
0.7::smokes(john).
0.3::smokes(mary).

% Rules
0.8::cancer(X) :- smokes(X).

% Query
query(cancer(john)).
query(cancer(mary)).

% This example models the probability of getting cancer
% based on smoking habits.`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inductive">
          <Card>
            <CardHeader>
              <CardTitle>Inductive Logic Programming</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Inductive Logic Programming (ILP) is a subfield that aims to learn logical
                theories from examples. It bridges the gap between machine learning and logic
                programming, allowing systems to learn complex relational concepts.
              </p>
              <pre className="bg-gray-100 p-4 rounded-md mt-4">
                {`% Prolog ILP example

% Background knowledge
father(john, mary).
father(john, tom).
mother(susan, mary).
mother(susan, tom).

% Positive examples
grandparent(john, ann).
grandparent(susan, jim).

% Negative examples
not_grandparent(mary, jim).
not_grandparent(tom, ann).

% The ILP system would learn a rule like:
% grandparent(X, Y) :- parent(X, Z), parent(Z, Y).
% where parent(X, Y) :- father(X, Y); mother(X, Y).`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


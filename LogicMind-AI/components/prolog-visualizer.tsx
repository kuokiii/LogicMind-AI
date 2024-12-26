"use client"

import { useState, useEffect } from "react"

export function PrologVisualizer({ code, query }: { code: string; query: string }) {
  const [steps, setSteps] = useState<string[]>([])

  useEffect(() => {
    const simulateExecution = () => {
      const lines = code.split('\n')
      const facts = lines.filter(line => !line.includes(':-') && !line.startsWith('%') && line.trim() !== '')
      const rules = lines.filter(line => line.includes(':-') && !line.startsWith('%'))
      
      const executionSteps = [`Query: ${query}`]
      
      // Simulate unification and backtracking
      const queryPredicate = query.split('?-')[1]?.trim().split('(')[0]
      
      if (queryPredicate) {
        const matchingRules = rules.filter(rule => rule.startsWith(queryPredicate))
        
        if (matchingRules.length > 0) {
          executionSteps.push(`Matching rule found: ${matchingRules[0]}`)
          executionSteps.push('Unifying variables...')
          executionSteps.push('Evaluating rule conditions...')
        } else {
          const matchingFacts = facts.filter(fact => fact.startsWith(queryPredicate))
          if (matchingFacts.length > 0) {
            executionSteps.push(`Matching fact found: ${matchingFacts[0]}`)
            executionSteps.push('Unifying variables...')
          } else {
            executionSteps.push('No matching rules or facts found')
            executionSteps.push('Backtracking...')
          }
        }
      }
      
      executionSteps.push('Query evaluation complete')
      setSteps(executionSteps)
    }
    
    simulateExecution()
  }, [code, query])

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      <h3 className="font-semibold mb-2">Execution Visualization:</h3>
      <ul className="list-disc pl-5 space-y-1">
        {steps.map((step, index) => (
          <li key={index} className="text-sm">{step}</li>
        ))}
      </ul>
    </div>
  )
}


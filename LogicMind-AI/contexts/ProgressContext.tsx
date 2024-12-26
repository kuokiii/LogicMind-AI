"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface TopicProgress {
  topic: string
  progress: number
  total: number
  completed: string[] // Track completed items by ID
}

interface ProgressContextType {
  progress: TopicProgress[]
  updateProgress: (topic: string, itemId: string) => void
  getTopicProgress: (topic: string) => number
  isItemCompleted: (topic: string, itemId: string) => boolean
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

const initialTopics = [
  { topic: "Predicates", progress: 0, total: 5, completed: [] },
  { topic: "Rules", progress: 0, total: 3, completed: [] },
  { topic: "Inference", progress: 0, total: 4, completed: [] },
  { topic: "Prolog Syntax", progress: 0, total: 6, completed: [] },
  { topic: "Knowledge Representation", progress: 0, total: 5, completed: [] },
  { topic: "Advanced Topics", progress: 0, total: 4, completed: [] }
]

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<TopicProgress[]>(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('userProgress')
      return savedProgress ? JSON.parse(savedProgress) : initialTopics
    }
    return initialTopics
  })

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress))
  }, [progress])

  const updateProgress = (topic: string, itemId: string) => {
    setProgress(prevProgress => {
      const topicIndex = prevProgress.findIndex(t => t.topic === topic)
      if (topicIndex === -1) return prevProgress

      const updatedProgress = [...prevProgress]
      const currentTopic = { ...updatedProgress[topicIndex] }

      // Check if item is already completed
      if (!currentTopic.completed.includes(itemId)) {
        currentTopic.completed.push(itemId)
        currentTopic.progress = Math.min(currentTopic.completed.length, currentTopic.total)
        updatedProgress[topicIndex] = currentTopic
      }

      return updatedProgress
    })
  }

  const getTopicProgress = (topic: string) => {
    const topicData = progress.find(t => t.topic === topic)
    if (!topicData) return 0
    return Math.round((topicData.progress / topicData.total) * 100)
  }

  const isItemCompleted = (topic: string, itemId: string) => {
    const topicData = progress.find(t => t.topic === topic)
    return topicData ? topicData.completed.includes(itemId) : false
  }

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, getTopicProgress, isItemCompleted }}>
      {children}
    </ProgressContext.Provider>
  )
}


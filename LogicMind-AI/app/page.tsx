import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Brain, Book, Database, Code, Lightbulb, CheckSquare, BookOpen } from 'lucide-react'
import { GradientHeading } from "@/components/ui/gradient-heading"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <GradientHeading className="text-5xl mb-8">
        Welcome to LogicMind AI
      </GradientHeading>
      <p className="text-xl mb-12 text-center max-w-2xl mx-auto text-gray-600">
        Embark on a journey through the fascinating world of logic programming and its applications in artificial intelligence.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TopicCard
          title="Fundamentals"
          description="Master the basics of logic programming"
          link="/fundamentals"
          icon={<Book className="w-12 h-12 text-purple-600" />}
        />
        <TopicCard
          title="Knowledge Representation"
          description="Discover how to represent complex knowledge"
          link="/knowledge-representation"
          icon={<Database className="w-12 h-12 text-blue-600" />}
        />
        <TopicCard
          title="Prolog Playground"
          description="Get hands-on experience with Prolog"
          link="/prolog-playground"
          icon={<Code className="w-12 h-12 text-green-600" />}
        />
        <TopicCard
          title="Advanced Topics"
          description="Explore cutting-edge concepts in logic programming"
          link="/advanced-topics"
          icon={<Lightbulb className="w-12 h-12 text-yellow-600" />}
        />
        <TopicCard
          title="Evaluation"
          description="Assess your understanding and reflect on your learning"
          link="/evaluation"
          icon={<CheckSquare className="w-12 h-12 text-red-600" />}
        />
        <TopicCard
          title="Resources"
          description="Access additional learning materials and references"
          link="/resources"
          icon={<BookOpen className="w-12 h-12 text-indigo-600" />}
        />
      </div>
    </div>
  )
}

function TopicCard({ title, description, link, icon }: { title: string; description: string; link: string; icon: React.ReactNode }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center space-x-4">
          {icon}
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={link}>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity">
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}


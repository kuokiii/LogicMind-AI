import Link from 'next/link'
import { Brain } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./mobile-menu"

export function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Brain size={32} className="shrink-0" />
            <span className="text-2xl font-bold whitespace-nowrap">LogicMind AI</span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-8">
            <ul className="flex flex-wrap items-center gap-6">
              <li>
                <Link 
                  href="/fundamentals" 
                  className="hover:text-white/80 transition-colors"
                >
                  Fundamentals
                </Link>
              </li>
              <li>
                <Link 
                  href="/knowledge-representation" 
                  className="hover:text-white/80 transition-colors"
                >
                  Knowledge Rep
                </Link>
              </li>
              <li>
                <Link 
                  href="/prolog-playground" 
                  className="hover:text-white/80 transition-colors"
                >
                  Prolog Playground
                </Link>
              </li>
              <li>
                <Link 
                  href="/advanced-topics" 
                  className="hover:text-white/80 transition-colors"
                >
                  Advanced Topics
                </Link>
              </li>
              <li>
                <Link 
                  href="/evaluation" 
                  className="hover:text-white/80 transition-colors"
                >
                  Evaluation
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-black text-white hover:bg-black/80 transition-colors"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-black text-white hover:bg-black/80 transition-colors"
                >
                  Register
                </Button>
              </Link>
            </div>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}


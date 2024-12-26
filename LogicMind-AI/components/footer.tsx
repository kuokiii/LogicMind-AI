import Link from 'next/link'
import { Instagram, Github } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; {currentYear} LogicMind AI. All rights reserved.</p>
          <p>Developed by Nirupam Thapa a.k.a kuoki</p>
        </div>
        <div className="flex space-x-4">
          <Link href="https://instagram.com/_kuoki/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="https://github.com/kuokiii" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}


  
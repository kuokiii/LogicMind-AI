"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from "next/link"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden text-white">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4">
          <Link
            href="/fundamentals"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Fundamentals
          </Link>
          <Link
            href="/knowledge-representation"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Knowledge Rep
          </Link>
          <Link
            href="/prolog-playground"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Prolog Playground
          </Link>
          <Link
            href="/advanced-topics"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Advanced Topics
          </Link>
          <Link
            href="/evaluation"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Evaluation
          </Link>
          <Link
            href="/resources"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Resources
          </Link>
          <div className="space-y-2 pt-4 border-t">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button className="w-full" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button className="w-full">
                Register
              </Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}


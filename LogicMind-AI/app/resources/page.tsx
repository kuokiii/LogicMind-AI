import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Video, Globe, School } from 'lucide-react'
import Link from "next/link"

export default function Resources() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        Learning Resources
      </h1>
      <p className="text-xl mb-12 text-center max-w-2xl mx-auto text-gray-600">
        Explore our curated collection of books, courses, and videos to deepen your understanding of logic programming and AI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Book className="w-8 h-8 text-purple-600" />
              <CardTitle>Recommended Books</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Logic Programming with Prolog</h3>
              <p className="text-sm text-gray-600">By Max Bramer</p>
              <Link href="https://link.springer.com/book/10.1007/978-1-4471-5487-7" target="_blank">
                <Button variant="outline" size="sm">View Book</Button>
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Artificial Intelligence with Python</h3>
              <p className="text-sm text-gray-600">By Prateek Joshi</p>
              <Link href="https://www.packtpub.com/product/artificial-intelligence-with-python-second-edition/9781839219535" target="_blank">
                <Button variant="outline" size="sm">View Book</Button>
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">The Art of Prolog</h3>
              <p className="text-sm text-gray-600">By Leon Sterling and Ehud Shapiro</p>
              <Link href="https://mitpress.mit.edu/9780262691635/the-art-of-prolog/" target="_blank">
                <Button variant="outline" size="sm">View Book</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Video className="w-8 h-8 text-blue-600" />
              <CardTitle>Video Tutorials</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Prolog Tutorial</h3>
              <p className="text-sm text-gray-600">By Derek Banas</p>
              <Link href="https://www.youtube.com/watch?v=SykxWpFwMGs" target="_blank">
                <Button variant="outline" size="sm">Watch Video</Button>
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Logic Programming Fundamentals</h3>
              <p className="text-sm text-gray-600">By freeCodeCamp.org</p>
              <Link href="https://www.youtube.com/watch?v=y6zr9AzR3Tc" target="_blank">
                <Button variant="outline" size="sm">Watch Video</Button>
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">AI and Logic Programming Series</h3>
              <p className="text-sm text-gray-600">By Computerphile</p>
              <Link href="https://www.youtube.com/watch?v=tJ8eTZHk1Sg" target="_blank">
                <Button variant="outline" size="sm">Watch Video</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <School className="w-8 h-8 text-green-600" />
              <CardTitle>Online Courses</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Logic Programming and Automated Reasoning</h3>
                <p className="text-sm text-gray-600">By Coursera - Stanford University</p>
                <Link href="https://www.coursera.org/learn/logic-programming" target="_blank">
                  <Button variant="outline" size="sm">Enroll Now</Button>
                </Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Artificial Intelligence: Logic Programming</h3>
                <p className="text-sm text-gray-600">By edX - MIT</p>
                <Link href="https://www.edx.org/learn/artificial-intelligence" target="_blank">
                  <Button variant="outline" size="sm">Enroll Now</Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Prolog Programming for Artificial Intelligence</h3>
                <p className="text-sm text-gray-600">By Udemy</p>
                <Link href="https://www.udemy.com/course/prolog-programming-for-artificial-intelligence/" target="_blank">
                  <Button variant="outline" size="sm">Enroll Now</Button>
                </Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Logic Programming and Knowledge Representation</h3>
                <p className="text-sm text-gray-600">By Pluralsight</p>
                <Link href="https://www.pluralsight.com/courses/prolog-logic-programming" target="_blank">
                  <Button variant="outline" size="sm">Start Learning</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Globe className="w-8 h-8 text-yellow-600" />
            <CardTitle>Additional Resources</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">SWI-Prolog Documentation</h3>
                <p className="text-sm text-gray-600">Official documentation and tutorials</p>
                <Link href="https://www.swi-prolog.org/pldoc/doc_for?object=manual" target="_blank">
                  <Button variant="outline" size="sm">Visit Website</Button>
                </Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Logic Programming Stack Exchange</h3>
                <p className="text-sm text-gray-600">Community Q&A platform</p>
                <Link href="https://stackoverflow.com/questions/tagged/prolog" target="_blank">
                  <Button variant="outline" size="sm">Visit Forum</Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">AI and Logic Programming Research Papers</h3>
                <p className="text-sm text-gray-600">Latest research and publications</p>
                <Link href="https://arxiv.org/list/cs.AI/recent" target="_blank">
                  <Button variant="outline" size="sm">Browse Papers</Button>
                </Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Logic Programming Association</h3>
                <p className="text-sm text-gray-600">Professional organization and resources</p>
                <Link href="https://www.cs.nmsu.edu/ALP/" target="_blank">
                  <Button variant="outline" size="sm">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


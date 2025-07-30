"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FaqItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          aria-expanded={isOpen}
        >
          <h3 className="text-lg font-semibold text-gray-800 pr-4">{question}</h3>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
          )}
        </button>

        {isOpen && (
          <div className="px-6 pb-6">
            <div className="pt-2 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

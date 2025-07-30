"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate subscription process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubscribed(true)
    setEmail("")

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false)
    }, 3000)
  }

  return (
    <section className="py-16 px-4 bg-blue-600">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            {isSubscribed ? (
              <div className="text-white">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                <h3 className="text-2xl font-bold mb-2">¡Suscripción Exitosa!</h3>
                <p className="text-lg">Gracias por unirte a nuestra comunidad. Recibirás nuestras mejores ofertas.</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Suscríbete a Nuestro Newsletter</h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Recibe ofertas exclusivas, noticias y actualizaciones directamente en tu correo electrónico
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-600 font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        Suscribiendo...
                      </>
                    ) : (
                      "Suscribirse"
                    )}
                  </Button>
                </form>

                <p className="text-sm text-white/70 mt-4">
                  No spam. Puedes cancelar tu suscripción en cualquier momento.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, X, Home, Calculator as CalculatorIcon, Mail, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { navGroups, type NavGroup } from "@/lib/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const mobileNavVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

const NavLink = ({
  href,
  children,
  isActive,
  scrolled,
}: {
  href: string
  children: React.ReactNode
  isActive: boolean
  scrolled: boolean
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
        isActive
          ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary"
          : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10",
      )}
    >
      {children}
    </Link>
  </motion.div>
)

export function OptimizedHeader() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const isGroupActive = (basePath: string = "") => {
    return pathname.startsWith(basePath)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll() 
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-primary/95 backdrop-blur-sm shadow-md border-b border-primary-foreground/10"
          : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.4 }}>
            <Image
              src="/LogoEnviosDosRuedas.webp"
              alt="Logo Envíos Dos Ruedas"
              width={50}
              height={50}
              priority
              className="h-12 w-12 md:h-14 md:w-14"
            />
          </motion.div>
          <span
            className={cn(
              "hidden text-lg font-bold sm:inline-block transition-colors duration-300",
              "text-primary-foreground",
            )}
          >
            Envíos Dos Ruedas
          </span>
        </Link>

        {/* Desktop Navigation (lg) */}
        <nav className="hidden items-center space-x-2 lg:flex">
          <NavLink href="/" isActive={isActive("/")} scrolled={scrolled}>
            <Home className="mr-2 h-4 w-4" />
            Inicio
          </NavLink>

          {navGroups.map((group) => {
            const GroupIcon = group.icon
            const groupIsActive = isGroupActive(group.basePath)
            return (
              <DropdownMenu key={group.label}>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    className={cn(
                      "flex cursor-pointer items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                      groupIsActive
                        ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary"
                        : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10",
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GroupIcon className="h-4 w-4" />
                    <span>{group.label}</span>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-56 bg-popover/80 backdrop-blur-lg border-primary-foreground/10 text-popover-foreground">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-3 py-2.5",
                            isActive(item.href) ? "text-secondary font-semibold" : "",
                          )}
                        >
                          {ItemIcon && <ItemIcon className="h-4 w-4" />}
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          })}

          <NavLink href="/contacto" isActive={isActive("/contacto")} scrolled={scrolled}>
            <Mail className="mr-2 h-4 w-4" />
            Contacto
          </NavLink>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="ml-4 bg-gradient-to-r from-secondary to-secondary/90 font-semibold text-secondary-foreground shadow-lg"
            >
              <Link href="/cotizar/express">
                <CalculatorIcon className="mr-2 h-4 w-4" />
                Cotizar Envío
              </Link>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Navigation (Sheet) */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu
                  className={cn(
                    "h-6 w-6 transition-colors duration-300",
                    "text-primary-foreground",
                  )}
                />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-primary text-primary-foreground pt-10">
              <SheetHeader className="mb-6 flex flex-row items-center space-x-2">
                <Image
                  src="/LogoEnviosDosRuedas.webp"
                  alt="Logo Envíos Dos Ruedas"
                  width={40}
                  height={40}
                />
                <SheetTitle className="text-secondary">
                  Envíos Dos Ruedas
                </SheetTitle>
              </SheetHeader>

              <motion.div
                className="flex h-full flex-col"
                variants={mobileNavVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Enlace de Inicio */}
                <motion.div variants={mobileNavItemVariants}>
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center space-x-4 py-4 px-4 rounded-xl transition-all duration-300 w-full text-left group",
                        isActive("/")
                          ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary font-semibold shadow-lg"
                          : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/5",
                      )}
                    >
                      <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium text-base">Inicio</span>
                    </Link>
                  </SheetClose>
                </motion.div>

                {/* Grupos de Navegación (Acordeón) */}
                <Accordion type="multiple" className="w-full">
                  {navGroups.map((group) => {
                    const GroupIcon = group.icon
                    const groupIsActive = isGroupActive(group.basePath)

                    return (
                      <motion.div variants={mobileNavItemVariants} key={group.label}>
                        <AccordionItem value={group.label} className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "py-4 px-4 rounded-xl transition-all duration-300 w-full justify-between group",
                              groupIsActive
                                ? "text-secondary font-semibold [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-secondary/20 [&[data-state=open]]:to-secondary/10"
                                : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/5",
                              "hover:no-underline",
                            )}
                          >
                            <div className="flex items-center space-x-4">
                              <GroupIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                              <span className="font-medium text-base">{group.label}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-0">
                            <div className="flex flex-col space-y-1 pl-8">
                              {group.items.map((item) => {
                                const ItemIcon = item.icon
                                return (
                                  <SheetClose asChild key={item.href}>
                                    <Link
                                      href={item.href}
                                      className={cn(
                                        "flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-300 w-full text-left",
                                        isActive(item.href)
                                          ? "bg-secondary/10 text-secondary font-medium"
                                          : "text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5",
                                      )}
                                    >
                                      {ItemIcon && <ItemIcon className="w-4 h-4" />}
                                      <span className="text-sm">{item.label}</span>
                                    </Link>
                                  </SheetClose>
                                )
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    )
                  })}
                </Accordion>

                {/* Enlace de Contacto */}
                <motion.div variants={mobileNavItemVariants} className="mt-2">
                  <SheetClose asChild>
                    <Link
                      href="/contacto"
                      className={cn(
                        "flex items-center space-x-4 py-4 px-4 rounded-xl transition-all duration-300 w-full text-left group",
                        isActive("/contacto")
                          ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary font-semibold shadow-lg"
                          : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/5",
                      )}
                    >
                      <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium text-base">Contacto</span>
                    </Link>
                  </SheetClose>
                </motion.div>

                {/* Botón de Cotizar */}
                <motion.div variants={mobileNavItemVariants} className="mt-auto pt-6 pb-10">
                  <SheetClose asChild>
                    <Link href="/cotizar/express" className="block w-full">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-secondary-foreground shadow-lg font-semibold rounded-xl"
                      >
                        <CalculatorIcon className="w-5 h-5 mr-3" />
                        Cotizar Envío
                      </Button>
                    </Link>
                  </SheetClose>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

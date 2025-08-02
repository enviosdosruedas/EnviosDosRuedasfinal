"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, X, Home, Calculator as CalculatorIcon, Mail, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { navGroups } from "@/lib/navigation"

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

const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => (
  <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="relative">
    <Button
      variant="ghost"
      size="sm"
      asChild
      className={cn(
        "text-primary-foreground/90 hover:bg-primary-foreground/15 hover:text-white transition-all duration-300 font-medium relative overflow-hidden",
        isActive &&
          "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary hover:from-secondary/30 hover:to-secondary/20 shadow-lg",
      )}
    >
      <Link href={href}>
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent"
            layoutId="activeBackground"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Link>
    </Button>
    {isActive && (
      <motion.div
        className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-secondary to-secondary/50 rounded-full"
        layoutId="underline"
        initial={{ x: "-50%", scaleX: 0 }}
        animate={{ x: "-50%", scaleX: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </motion.div>
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMobileSections, setOpenMobileSections] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const toggleMobileSection = (label: string) => {
    setOpenMobileSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const isActive = (href: string, isExact = false) => {
    if (isExact) return pathname === href
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  const isGroupActive = (group: any) => {
    if (group.basePath && isActive(group.basePath)) return true
    return group.items.some((item: any) => isActive(item.href))
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled
          ? "py-2 bg-primary/95 backdrop-blur-xl shadow-2xl border-b border-secondary/20"
          : "py-4 bg-gradient-to-r from-primary via-primary to-primary/95 shadow-xl",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/30 to-secondary/10 blur-sm"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <Image
                  src="/LogoEnviosDosRuedas.webp"
                  alt="Envios DosRuedas Logo"
                  width={isScrolled ? 36 : 44}
                  height={isScrolled ? 36 : 44}
                  className="rounded-full transition-all duration-500 relative z-10 ring-2 ring-secondary/20 group-hover:ring-secondary/40"
                  priority
                />
              </div>
              <div className="transition-all duration-500">
                <motion.h1
                  className={cn(
                    "font-bold text-secondary transition-all duration-500 tracking-tight",
                    isScrolled ? "text-lg" : "text-xl",
                  )}
                  animate={{
                    textShadow: isScrolled ? "0 0 10px rgba(251, 191, 36, 0.3)" : "0 0 20px rgba(251, 191, 36, 0.5)",
                  }}
                >
                  Envios DosRuedas
                </motion.h1>
                <motion.p
                  className={cn(
                    "text-xs text-primary-foreground/80 -mt-0.5 transition-all duration-500 font-medium",
                    isScrolled ? "opacity-0 h-0 scale-95" : "opacity-100 h-auto scale-100",
                  )}
                >
                  Tu Solución Confiable
                </motion.p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <NavLink href="/" isActive={isActive("/", true)}>
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </NavLink>

            {navGroups.map((group) => {
                const GroupIcon = group.icon;
                return (
              <motion.div key={group.label} whileHover={{ scale: 1.02 }} className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-primary-foreground/90 hover:bg-primary-foreground/15 hover:text-white transition-all duration-300 font-medium relative overflow-hidden",
                        isGroupActive(group) &&
                          "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary hover:from-secondary/30 hover:to-secondary/20 shadow-lg",
                      )}
                    >
                      {isGroupActive(group) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent"
                          layoutId="activeDropdownBackground"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center">
                        <GroupIcon className="w-4 h-4 mr-2" />
                        {group.label}
                        <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  {isGroupActive(group) && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-secondary to-secondary/50 rounded-full"
                      layoutId="underline"
                      initial={{ x: "-50%", scaleX: 0 }}
                      animate={{ x: "-50%", scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <DropdownMenuContent className="bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl mt-2 w-64 rounded-xl overflow-hidden">
                    {group.items.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <DropdownMenuItem key={item.href} asChild>
                          <motion.div
                            whileHover={{ x: 4, backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              className={cn(
                                "cursor-pointer transition-all duration-300 flex items-center w-full px-4 py-3 text-sm rounded-lg mx-1 my-0.5",
                                isActive(item.href)
                                  ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary font-semibold shadow-sm"
                                  : "hover:bg-accent/50 hover:text-accent-foreground",
                              )}
                            >
                              {Icon && <Icon className="w-4 h-4 mr-3 text-secondary" />}
                              {item.label}
                            </Link>
                          </motion.div>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )})}

            <NavLink href="/contacto" isActive={isActive("/contacto")}>
              <Mail className="w-4 h-4 mr-2" />
              Contacto
            </NavLink>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="ml-4">
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6 rounded-full border border-secondary/20"
              >
                <Link href="/cotizar/express">
                  <CalculatorIcon className="w-4 h-4 mr-2" />
                  Cotizar Envío
                </Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10 transition-all duration-300 rounded-full"
                  aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={isMenuOpen ? "x" : "menu"}
                      initial={{ rotate: isMenuOpen ? -90 : 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: isMenuOpen ? 90 : -90, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[90vw] max-w-sm bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground p-0 flex flex-col border-l border-secondary/20"
            >
              <SheetHeader className="p-6 border-b border-primary-foreground/10 text-left">
                <SheetTitle className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/30 to-secondary/10 blur-sm" />
                    <Image
                      src="/LogoEnviosDosRuedas.webp"
                      alt="Logo"
                      width={36}
                      height={36}
                      className="rounded-full relative z-10 ring-2 ring-secondary/30"
                    />
                  </div>
                  <span className="text-lg font-bold text-secondary">Envios DosRuedas</span>
                </SheetTitle>
              </SheetHeader>

              <motion.div
                className="flex-grow overflow-y-auto p-6 space-y-3"
                variants={mobileNavVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={mobileNavItemVariants}>
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center space-x-4 py-4 px-4 rounded-xl transition-all duration-300 w-full text-left group",
                        isActive("/", true)
                          ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary font-semibold shadow-lg"
                          : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10",
                      )}
                    >
                      <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium text-base">Inicio</span>
                    </Link>
                  </SheetClose>
                </motion.div>

                {navGroups.map((group) => {
                    const GroupIcon = group.icon;
                    return (
                  <motion.div key={group.label} variants={mobileNavItemVariants}>
                    <motion.button
                      onClick={() => toggleMobileSection(group.label)}
                      className={cn(
                        "flex items-center justify-between w-full space-x-4 py-4 px-4 rounded-xl transition-all duration-300 text-left group",
                        isGroupActive(group) && !openMobileSections[group.label]
                          ? "text-secondary font-semibold hover:bg-primary-foreground/15"
                          : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10",
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <GroupIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium text-base">{group.label}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: openMobileSections[group.label] ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {openMobileSections[group.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="pl-8 mt-2 space-y-1 overflow-hidden"
                        >
                          {group.items.map((item, index) => {
                            const Icon = item.icon
                            return (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <SheetClose asChild>
                                  <Link
                                    href={item.href}
                                    className={cn(
                                      "flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-300 text-sm w-full text-left group",
                                      isActive(item.href)
                                        ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary font-semibold shadow-sm"
                                        : "text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10",
                                    )}
                                  >
                                    {Icon && (
                                      <Icon className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform duration-200" />
                                    )}
                                    <span>{item.label}</span>
                                  </Link>
                                </SheetClose>
                              </motion.div>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )})}

                <motion.div variants={mobileNavItemVariants}>
                  <SheetClose asChild>
                    <Link
                      href="/contacto"
                      className={cn(
                        "flex items-center space-x-4 py-4 px-4 rounded-xl transition-all duration-300 w-full text-left group",
                        isActive("/contacto")
                          ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary font-semibold shadow-lg"
                          : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10",
                      )}
                    >
                      <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium text-base">Contacto</span>
                    </Link>
                  </SheetClose>
                </motion.div>

                <motion.div variants={mobileNavItemVariants} className="pt-4">
                  <SheetClose asChild>
                    <Link href="/cotizar/express">
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

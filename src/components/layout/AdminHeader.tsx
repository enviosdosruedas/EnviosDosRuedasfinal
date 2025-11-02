// src/components/layout/AdminHeader.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { adminNavItems } from "@/lib/navigation-admin"
import { LogoutButton } from "@/components/admin/LogoutButton"

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
}: {
  href: string
  children: React.ReactNode
  isActive: boolean
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
        isActive
          ? "bg-secondary/10 text-secondary"
          : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
      )}
    >
      {children}
    </Link>
  </motion.div>
);


export function AdminHeader() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    // Exact match for dashboard, prefix match for others
    if (path === '/admin') return pathname === path;
    return pathname.startsWith(path)
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
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-primary/95 backdrop-blur-sm shadow-md border-b border-primary-foreground/10"
          : "bg-primary",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/admin" className="flex items-center space-x-3">
          <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.4 }}>
            <Image
              src="/LogoEnviosDosRuedas.webp"
              alt="Logo Envíos Dos Ruedas"
              width={48}
              height={48}
              priority
              className="h-10 w-10 md:h-12 md:w-12"
            />
          </motion.div>
          <span className="text-lg font-bold text-primary-foreground transition-colors duration-300">
            Admin Panel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 lg:flex">
          {adminNavItems.map((item) => {
            const ItemIcon = item.icon
            return (
              <NavLink key={item.href} href={item.href} isActive={isActive(item.href)}>
                <ItemIcon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-4">
            <LogoutButton />
          </motion.div>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-primary-foreground" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-primary text-primary-foreground pt-10">
              <SheetHeader className="mb-6 flex flex-row items-center space-x-2">
                <Image src="/LogoEnviosDosRuedas.webp" alt="Logo" width={40} height={40} />
                <SheetTitle className="text-secondary">Admin Panel</SheetTitle>
              </SheetHeader>
              <motion.div
                className="flex h-full flex-col"
                variants={mobileNavVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex-grow">
                    {adminNavItems.map((item) => {
                        const ItemIcon = item.icon
                        return (
                        <motion.div variants={mobileNavItemVariants} key={item.href}>
                            <SheetClose asChild>
                            <Link
                                href={item.href}
                                className={cn(
                                "flex items-center space-x-4 py-4 px-4 rounded-xl transition-all duration-300 w-full text-left group",
                                isActive(item.href)
                                    ? "bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary font-semibold shadow-lg"
                                    : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/5",
                                )}
                            >
                                <ItemIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium text-base">{item.label}</span>
                            </Link>
                            </SheetClose>
                        </motion.div>
                        )
                    })}
                </div>
                <motion.div variants={mobileNavItemVariants} className="mt-auto pt-6 pb-10">
                  <LogoutButton />
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

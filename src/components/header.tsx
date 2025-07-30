
"use client"

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
import { Menu, X, Home, Truck, Calculator as CalculatorIcon, Users, Mail, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { navGroups, type NavGroup } from "@/lib/navigation";

const mobileNavVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
        }
    }
};

const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

const NavLink = ({ href, children, isActive }: { href: string, children: React.ReactNode, isActive: boolean }) => (
    <motion.div whileHover={{ scale: 1.05 }} className="relative">
      <Button variant="ghost" size="sm" asChild className={cn("text-primary-foreground hover:bg-primary-foreground/20 hover:text-white", isActive && "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground")}>
        <Link href={href}>
          {children}
        </Link>
      </Button>
      {isActive && (
         <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"
            layoutId="underline"
          />
      )}
    </motion.div>
  );

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMobileSections, setOpenMobileSections] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen])

  const toggleMobileSection = (label: string) => {
    setOpenMobileSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const isActive = (href: string, isExact = false) => {
    if (isExact) return pathname === href
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  }

  const isGroupActive = (group: NavGroup) => {
    if (group.basePath && isActive(group.basePath)) return true
    return group.items.some(item => isActive(item.href))
  }
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled 
            ? "py-2 bg-primary/80 backdrop-blur-lg shadow-lg border-b border-primary-foreground/10" 
            : "py-3 bg-primary shadow-md"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2.5">
              <Image
                src="/LogoEnviosDosRuedas.webp"
                alt="Envios DosRuedas Logo"
                width={isScrolled ? 32 : 40}
                height={isScrolled ? 32 : 40}
                className="rounded-full transition-all duration-300"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div>
                <h1 className={cn(
                  "font-bold text-secondary transition-all duration-300",
                  isScrolled ? "text-base" : "text-lg"
                )}>Envios DosRuedas</h1>
                <p className={cn(
                  "text-xs text-primary-foreground/90 -mt-0.5 transition-all duration-300",
                   isScrolled ? "opacity-0 h-0" : "opacity-100 h-auto"
                )}>Tu Solución Confiable</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
                 <NavLink href="/" isActive={isActive("/", true)}>
                    <Home className="w-4 h-4 mr-1.5" /> Inicio
                </NavLink>

              {navGroups.map((group) => (
                <motion.div key={group.label} whileHover={{ scale: 1.05 }} className="relative">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className={cn("text-primary-foreground hover:bg-primary-foreground/20 hover:text-white", isGroupActive(group) && "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground")}>
                        <group.icon className="w-4 h-4 mr-1.5" />
                        {group.label}
                        <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                        </Button>
                    </DropdownMenuTrigger>
                    {isGroupActive(group) && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full" layoutId="underline" />}
                    <AnimatePresence>
                        <DropdownMenuContent className="bg-popover/80 backdrop-blur-lg border text-popover-foreground shadow-lg mt-2 w-56">
                            {group.items.map((item) => (
                            <DropdownMenuItem key={item.href} asChild>
                                <motion.div whileHover={{x:3}}>
                                <Link
                                href={item.href}
                                className={cn(
                                    "cursor-pointer transition-colors duration-150 flex items-center w-full px-3 py-2 text-sm",
                                    isActive(item.href)
                                    ? "bg-accent text-accent-foreground font-medium"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                )}
                                >
                                {item.label}
                                </Link>
                                </motion.div>
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </AnimatePresence>
                    </DropdownMenu>
                </motion.div>
              ))}
                <NavLink href="/contacto" isActive={isActive("/contacto")}>
                  <Mail className="w-4 h-4 mr-1.5" /> Contacto
                </NavLink>

                <motion.div whileHover={{ scale: 1.05 }} className="ml-2">
                    <Button asChild size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg">
                        <Link href="/cotizar/express">
                            <CalculatorIcon className="w-4 h-4 mr-2" />
                            Cotizar Envío
                        </Link>
                    </Button>
                </motion.div>
            </nav>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:text-secondary hover:bg-primary/80 transition-colors duration-200"
                  aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={isMenuOpen ? "x" : "menu"}
                      initial={{ rotate: isMenuOpen ? -90 : 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: isMenuOpen ? 90 : -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm bg-primary text-primary-foreground p-0 flex flex-col">
                <SheetHeader className="p-4 border-b border-primary-foreground/20 text-left">
                   <SheetTitle className="flex items-center space-x-2.5">
                     <Image src="/LogoEnviosDosRuedas.webp" alt="Logo" width={32} height={32} className="rounded-full" />
                     <span className="text-md font-bold text-secondary">Envios DosRuedas</span>
                   </SheetTitle>
                </SheetHeader>
                
                <motion.div 
                    className="flex-grow overflow-y-auto p-4 space-y-2"
                    variants={mobileNavVariants}
                    initial="hidden"
                    animate="visible"
                >
                  <motion.div variants={mobileNavItemVariants}>
                    <SheetClose asChild>
                        <Link
                        href="/"
                        className={cn(
                            "flex items-center space-x-3 py-3 px-3 rounded-md transition-colors duration-200 w-full text-left",
                            isActive("/", true)
                            ? "bg-secondary text-secondary-foreground font-semibold"
                            : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10"
                        )}
                        >
                        <Home className="w-5 h-5" />
                        <span className="font-medium text-base">Inicio</span>
                        </Link>
                    </SheetClose>
                  </motion.div>

                  {navGroups.map((group) => (
                    <motion.div key={group.label} variants={mobileNavItemVariants}>
                      <button
                        onClick={() => toggleMobileSection(group.label)}
                        className={cn(
                          "flex items-center justify-between w-full space-x-3 py-3 px-3 rounded-md transition-colors duration-200 text-left",
                          isGroupActive(group) && !openMobileSections[group.label]
                            ? "text-secondary font-semibold hover:bg-primary-foreground/15"
                            : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <group.icon className="w-5 h-5" />
                          <span className="font-medium text-base">{group.label}</span>
                        </div>
                        <ChevronDown className={cn("w-5 h-5 transition-transform", openMobileSections[group.label] && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {openMobileSections[group.label] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="pl-6 mt-1 space-y-0.5 overflow-hidden"
                          >
                            {group.items.map((item) => (
                              <SheetClose asChild key={item.href}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    "block py-2.5 px-3 rounded-md transition-colors duration-200 text-sm w-full text-left",
                                    isActive(item.href)
                                      ? "bg-secondary/80 text-secondary-foreground font-semibold"
                                      : "text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10"
                                  )}
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                  <motion.div variants={mobileNavItemVariants}>
                    <SheetClose asChild>
                        <Link
                        href="/contacto"
                        className={cn(
                            "flex items-center space-x-3 py-3 px-3 rounded-md transition-colors duration-200 w-full text-left",
                            isActive("/contacto")
                            ? "bg-secondary text-secondary-foreground font-semibold"
                            : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10"
                        )}
                        >
                        <Mail className="w-5 h-5" />
                        <span className="font-medium text-base">Contacto</span>
                        </Link>
                    </SheetClose>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  )
}

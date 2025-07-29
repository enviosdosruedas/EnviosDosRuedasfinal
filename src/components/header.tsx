"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Mail, Menu, X, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navGroups, NavGroup } from "@/lib/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (basePath?: string) => {
    if (!basePath) return false;
    return pathname.startsWith(basePath);
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        pathname === href
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );

  const DesktopNav = () => (
    <nav className="hidden items-center gap-2 lg:flex">
      <NavLink href="/">
        <Home className="h-4 w-4" />
        Inicio
      </NavLink>
      {navGroups.map((group) => (
        <DropdownMenu key={group.label}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium",
                isLinkActive(group.basePath)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <group.icon className="h-4 w-4" />
              {group.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {group.items.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className={cn(pathname === item.href && "font-bold")}>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
      <NavLink href="/contacto">
        <Mail className="h-4 w-4" />
        Contacto
      </NavLink>
    </nav>
  );

  const MobileNav = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src="/LogoEnviosDosRuedas.webp" alt="Logo Envios DosRuedas" width={32} height={32} />
              <span className="font-bold">Envios DosRuedas</span>
            </Link>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-6 w-6" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </SheetClose>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-1">
              <SheetClose asChild>
                 <NavLink href="/">
                    <Home className="h-4 w-4" />
                    Inicio
                </NavLink>
              </SheetClose>
              
              <Accordion type="multiple" className="w-full">
                {navGroups.map((group) => (
                  <AccordionItem value={group.label} key={group.label}>
                    <AccordionTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground hover:no-underline">
                       <div className="flex items-center gap-2">
                        <group.icon className="h-4 w-4" />
                        <span>{group.label}</span>
                       </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="ml-7 flex flex-col border-l py-2">
                        {group.items.map((item) => (
                          <SheetClose asChild key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "block rounded-r-md py-2 pl-4 pr-2 text-sm",
                                pathname === item.href
                                  ? "bg-primary/10 font-medium text-primary"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <SheetClose asChild>
                <NavLink href="/contacto">
                    <Mail className="h-4 w-4" />
                    Contacto
                </NavLink>
              </SheetClose>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm transition-all duration-300",
        isScrolled ? "py-1" : "py-2"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/LogoEnviosDosRuedas.webp"
            alt="Logo Envios DosRuedas"
            width={isScrolled ? 32 : 40}
            height={isScrolled ? 32 : 40}
            className="transition-all duration-300"
          />
          <span className="hidden text-lg font-bold sm:inline-block">
            Envios DosRuedas
          </span>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}

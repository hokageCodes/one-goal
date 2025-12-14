"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"

const navItems = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
]

const Logo = () => (
  <Link href="/" className="flex items-center space-x-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <Target className="h-5 w-5" />
    </div>
    <span className="text-xl font-bold">One Goal</span>
  </Link>
)

const NavLink = ({ href, children, onClick, className = "" }) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
      className
    )}
  >
    {children}
  </Link>
)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()
  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-16 items-center justify-between px-4 md:container md:mx-auto">
        <Logo />

        <div className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:gap-3">
          {user ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="p-4 space-y-3">
            {navItems.map((item) => (
              <NavLink key={item.name} href={item.href} onClick={closeMenu} className="block text-base">
                {item.name}
              </NavLink>
            ))}
            <div className="flex flex-col space-y-2 pt-3 border-t">
              {user ? (
                <Button asChild className="w-full">
                  <Link href="/dashboard" onClick={closeMenu}>Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login" onClick={closeMenu}>Log In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/register" onClick={closeMenu}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


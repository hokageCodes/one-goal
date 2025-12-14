import Link from "next/link"
import { Target, Github, Twitter, Mail } from "lucide-react"

const footerLinks = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
]

const legalLinks = [
  { name: "Privacy Policy", href: "#privacy" },
  { name: "Terms of Service", href: "#terms" },
]

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#twitter" },
  { name: "GitHub", icon: Github, href: "#github" },
  { name: "Email", icon: Mail, href: "mailto:support@onegoal.com" },
]

const Logo = () => (
  <Link href="/" className="flex items-center space-x-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <Target className="h-5 w-5" />
    </div>
    <span className="text-xl font-bold">One Goal</span>
  </Link>
)

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-auto w-full">
      <div className="w-full px-4 md:container md:mx-auto">
        <div className="py-8 md:py-12">
          <div className="flex flex-col items-center space-y-8 md:space-y-12">
            <Logo />
            
            <p className="text-body-md text-muted-foreground text-center max-w-md">
              Focus on the one goal that truly matters. No noise, no distractions, just clarity.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-6">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t py-4">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-body-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} One Goal. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-body-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


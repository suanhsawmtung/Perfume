import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth.store"
import { useCartStore } from "@/stores/cart.store"
import { Menu, Search, ShoppingBag } from "lucide-react"
import { Link, useLocation } from "react-router"
import AuthDropdown from "./auth-dropdown"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blogs", label: "Blogs" },
]

export function Navbar() {
  const { pathname } = useLocation();
  const authUser = useAuthStore((state) => state.authUser);
  const { setIsOpen, getItemCount } = useCartStore()
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ContentWrapper className="flex h-16 items-center justify-between">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-4 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-foreground/80",
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight">NOIR</span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-foreground/80",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <ThemeToggle />
          <AuthDropdown user={authUser} />
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </ContentWrapper>
    </header>
  )
}

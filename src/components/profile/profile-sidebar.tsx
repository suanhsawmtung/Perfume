import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Settings, Package, Heart, MessageCircleIcon, type LucideIcon, User } from "lucide-react"
import { Link } from "react-router"

interface ProfileSidebarProps {
  email: string
  displayName: string
  avatarUrl: string | null
  memberSince: string
  tier: string
}

const quickLinks: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Package, label: "Order History", href: "/profile/orders" },
  { icon: Heart, label: "Wishlist", href: "/profile/wishlists" },
  { icon: MessageCircleIcon, label: "Reviews", href: "/profile/reviews" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function ProfileSidebar({
  email,
  displayName,
  avatarUrl,
  memberSince,
  tier,
}: ProfileSidebarProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-secondary/50">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <h1 className="mt-4 text-xl font-semibold">{displayName}</h1>
          <p className="text-sm text-muted-foreground">{email}</p>
          <div className="mt-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            {tier}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Member since {memberSince}
          </p>
          <Button className="mt-6 w-full" variant="outline" asChild>
            <Link to="/settings">Edit Profile</Link>
          </Button>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6">
          <nav className="space-y-1">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center justify-between rounded-lg p-3 text-sm transition-colors hover:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <link.icon className="h-4 w-4 text-muted-foreground" />
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </nav>
        </div>
      </CardContent>
    </Card>
  )
}

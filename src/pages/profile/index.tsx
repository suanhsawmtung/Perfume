"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { products } from "@/lib/data"
import { useWishlistStore } from "@/stores/wishlist.store"
import {
  ChevronRight,
  Heart,
  Package,
  Settings,
} from "lucide-react"
import { Link } from "react-router"

const user = {
  name: "Alexandra Chen",
  email: "alexandra@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  memberSince: "January 2023",
  tier: "Gold Member",
}

const recentOrders = [
  {
    id: "ORD-001",
    date: "Mar 15, 2024",
    status: "Delivered",
    total: 185,
    items: 1,
  },
  {
    id: "ORD-002",
    date: "Feb 28, 2024",
    status: "Delivered",
    total: 310,
    items: 2,
  },
  {
    id: "ORD-003",
    date: "Feb 10, 2024",
    status: "Delivered",
    total: 145,
    items: 1,
  },
]

const quickLinks = [
  { icon: Package, label: "Order History", href: "/profile/orders" },
  { icon: Heart, label: "Wishlist", href: "/profile/wishlist" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function ProfilePage() {
  const { items: wishlistItems } = useWishlistStore()
  const wishlistProducts = wishlistItems.length > 0 
    ? wishlistItems.slice(0, 3) 
    : products.slice(0, 3)

  return (
    <div className="min-h-screen bg-secondary/20">
      <ContentWrapper className="py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h1 className="mt-4 text-xl font-semibold">{user.name}</h1>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                    {user.tier}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Member since {user.memberSince}
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
          </div>

          <div className="space-y-8 lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/profile/orders">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.date} &middot; {order.items} item
                          {order.items > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total}</p>
                        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Wishlist</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/profile/wishlist">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {wishlistProducts.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-3">
                    {wishlistProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="group"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/50">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-2 text-sm font-medium line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${product.price}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <Heart className="mx-auto h-8 w-8 mb-2" />
                    <p>Your wishlist is empty</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link to="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold">1,250</p>
                    <p className="text-sm text-muted-foreground">
                      Points available
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">250 points to Platinum</p>
                    <div className="mt-2 h-2 w-48 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-foreground"
                        style={{ width: "83%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border/50 pt-6">
                  <div className="text-center">
                    <p className="text-2xl font-semibold">12</p>
                    <p className="text-xs text-muted-foreground">
                      Total Orders
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold">$2,340</p>
                    <p className="text-xs text-muted-foreground">
                      Total Spent
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold">8</p>
                    <p className="text-xs text-muted-foreground">
                      Reviews Written
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

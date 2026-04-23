import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { products } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ArrowLeft, ChevronRight, Package } from "lucide-react"
import { Link } from "react-router"

const orders = [
  {
    id: "ORD-001",
    date: "Mar 15, 2024",
    status: "Delivered",
    total: 185,
    items: [
      { product: products[0], quantity: 1 },
    ],
  },
  {
    id: "ORD-002",
    date: "Feb 28, 2024",
    status: "Delivered",
    total: 310,
    items: [
      { product: products[1], quantity: 1 },
      { product: products[2], quantity: 1 },
    ],
  },
  {
    id: "ORD-003",
    date: "Feb 10, 2024",
    status: "Delivered",
    total: 145,
    items: [
      { product: products[4], quantity: 1 },
    ],
  },
  {
    id: "ORD-004",
    date: "Jan 22, 2024",
    status: "Delivered",
    total: 195,
    items: [
      { product: products[3], quantity: 1 },
    ],
  },
  {
    id: "ORD-005",
    date: "Jan 5, 2024",
    status: "Delivered",
    total: 285,
    items: [
      { product: products[5], quantity: 1 },
      { product: products[6], quantity: 1 },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "processing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    default:
      return "bg-secondary text-muted-foreground"
  }
}

export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-secondary/20">
      <ContentWrapper className="py-8">
        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-medium">Order History</h1>
          <p className="mt-2 text-muted-foreground">
            View and track all your orders
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-semibold">{order.id}</h2>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          getStatusColor(order.status)
                        )}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Placed on {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${order.total}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)} item
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/50 pt-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <Link
                        key={index}
                        to={`/products/${item.product.id}`}
                        className="group flex items-center gap-4"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/50">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium group-hover:underline">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.product.brand} &middot; {item.product.size}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${item.product.price}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" size="sm">
                    <Package className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                  <Button variant="outline" size="sm">
                    Buy Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentWrapper>
    </div>
  )
}

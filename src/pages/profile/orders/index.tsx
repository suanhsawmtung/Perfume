import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { products } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ArrowLeft, ChevronRight, Download, FileText, Receipt } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

type OrderItem = {
  product: (typeof products)[0]
  quantity: number
}

type Order = {
  id: string
  date: string
  status: string
  total: number
  items: OrderItem[]
  paymentProof: string
  shippingAddress: string
  paymentMethod: string
}

const orders: Order[] = [
  {
    id: "ORD-001",
    date: "Mar 15, 2024",
    status: "Delivered",
    total: 185,
    items: [{ product: products[0], quantity: 1 }],
    paymentProof: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Bank Transfer",
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
    paymentProof: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD-003",
    date: "Feb 10, 2024",
    status: "Delivered",
    total: 145,
    items: [{ product: products[4], quantity: 1 }],
    paymentProof: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD-004",
    date: "Jan 22, 2024",
    status: "Delivered",
    total: 195,
    items: [{ product: products[3], quantity: 1 }],
    paymentProof: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Bank Transfer",
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
    paymentProof: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Bank Transfer",
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  const [paymentProofOpen, setPaymentProofOpen] = useState(false)

  const handleDownloadPDF = async (order: Order) => {
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    
    // Header
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("NOIR", 20, 25)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("PERFUMES", 20, 32)
    
    // Invoice title
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("INVOICE", pageWidth - 20, 25, { align: "right" })
    
    // Order info
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Invoice #: ${order.id}`, pageWidth - 20, 35, { align: "right" })
    doc.text(`Date: ${order.date}`, pageWidth - 20, 42, { align: "right" })
    doc.text(`Status: ${order.status}`, pageWidth - 20, 49, { align: "right" })
    
    // Divider
    doc.setDrawColor(200)
    doc.line(20, 60, pageWidth - 20, 60)
    
    // Billing info
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text("Bill To:", 20, 72)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text("John Doe", 20, 80)
    doc.text(order.shippingAddress, 20, 87)
    doc.text(`Payment: ${order.paymentMethod}`, 20, 94)
    
    // Table header
    const tableTop = 115
    doc.setFillColor(245, 245, 245)
    doc.rect(20, tableTop - 7, pageWidth - 40, 12, "F")
    doc.setFont("helvetica", "bold")
    doc.text("Item", 25, tableTop)
    doc.text("Qty", 120, tableTop)
    doc.text("Price", 145, tableTop)
    doc.text("Total", pageWidth - 25, tableTop, { align: "right" })
    
    // Table items
    doc.setFont("helvetica", "normal")
    let yPos = tableTop + 15
    order.items.forEach((item) => {
      doc.text(item.product.name, 25, yPos)
      doc.setFontSize(8)
      doc.setTextColor(100)
      doc.text(item.product.brand, 25, yPos + 5)
      doc.setFontSize(10)
      doc.setTextColor(0)
      doc.text(String(item.quantity), 120, yPos)
      doc.text(`$${item.product.price}`, 145, yPos)
      doc.text(`$${item.product.price * item.quantity}`, pageWidth - 25, yPos, { align: "right" })
      yPos += 18
    })
    
    // Divider
    doc.line(20, yPos + 5, pageWidth - 20, yPos + 5)
    
    // Totals
    yPos += 18
    doc.text("Subtotal:", 130, yPos)
    doc.text(`$${order.total}`, pageWidth - 25, yPos, { align: "right" })
    yPos += 8
    doc.text("Shipping:", 130, yPos)
    doc.text("Free", pageWidth - 25, yPos, { align: "right" })
    yPos += 8
    doc.setFont("helvetica", "bold")
    doc.text("Total:", 130, yPos)
    doc.text(`$${order.total}`, pageWidth - 25, yPos, { align: "right" })
    
    // Footer
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(100)
    doc.text("Thank you for shopping with NOIR Perfumes!", pageWidth / 2, 270, { align: "center" })
    doc.text("www.noirperfumes.com | support@noirperfumes.com", pageWidth / 2, 277, { align: "center" })
    
    doc.save(`${order.id}-invoice.pdf`)
  }

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
              <CardContent className="p-4 sm:p-6">
                {/* Order Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
                  <div className="sm:text-right">
                    <p className="text-lg font-semibold">${order.total}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)} item
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-6 border-t border-border/50 pt-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <Link
                        key={index}
                        to={`/products/${item.product.id}`}
                        className="group block"
                      >
                        <div className="flex gap-3 sm:gap-4">
                          {/* Product Image */}
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/50 sm:h-20 sm:w-20">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          
                          {/* Product Info - Stack on mobile */}
                          <div className="flex min-w-0 flex-1 flex-col justify-center">
                            <p className="truncate font-medium group-hover:underline">
                              {item.product.name}
                            </p>
                            <p className="mt-0.5 truncate text-sm text-muted-foreground">
                              {item.product.brand}
                            </p>
                            {/* Price and Qty on mobile - below name */}
                            <div className="mt-2 flex items-center gap-3 text-sm sm:hidden">
                              <span className="font-medium">${item.product.price}</span>
                              <span className="text-muted-foreground">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          
                          {/* Price and Qty on desktop - right side */}
                          <div className="hidden shrink-0 items-center gap-4 sm:flex">
                            <div className="text-right">
                              <p className="font-medium">${item.product.price}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setSelectedOrder(order)
                      setInvoiceOpen(true)
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Invoice
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setSelectedOrder(order)
                      setPaymentProofOpen(true)
                    }}
                  >
                    <Receipt className="mr-2 h-4 w-4" />
                    View Payment Proof
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentWrapper>

      {/* Invoice Sheet */}
      <Sheet open={invoiceOpen} onOpenChange={setInvoiceOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Invoice</SheetTitle>
          </SheetHeader>
          
          {selectedOrder && (
            <div className="mt-6">
              {/* Invoice Preview */}
              <div className="rounded-lg border bg-card p-6">
                {/* Invoice Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold">NOIR</h3>
                    <p className="text-xs tracking-widest text-muted-foreground">PERFUMES</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">INVOICE</p>
                    <p className="mt-1 text-sm text-muted-foreground">{selectedOrder.id}</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-muted-foreground">{selectedOrder.status}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium">Shipping Address</p>
                    <p className="text-muted-foreground">{selectedOrder.shippingAddress}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium">Payment Method</p>
                    <p className="text-muted-foreground">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 border-t" />

                {/* Items */}
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-2 text-xs font-medium uppercase text-muted-foreground">
                    <div className="col-span-6">Item</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                  
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 text-sm">
                      <div className="col-span-6">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                      </div>
                      <div className="col-span-2 text-center">{item.quantity}</div>
                      <div className="col-span-2 text-right">${item.product.price}</div>
                      <div className="col-span-2 text-right font-medium">
                        ${item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-6 border-t" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-base font-semibold">
                    <span>Total</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-muted-foreground">
                  <p>Thank you for shopping with NOIR Perfumes!</p>
                  <p className="mt-1">www.noirperfumes.com | support@noirperfumes.com</p>
                </div>
              </div>

              {/* Download Button */}
              <Button
                className="mt-6 w-full"
                onClick={() => handleDownloadPDF(selectedOrder)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Payment Proof Dialog */}
      <Dialog open={paymentProofOpen} onOpenChange={setPaymentProofOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="flex items-center justify-between">
              Payment Proof
              {selectedOrder && (
                <span className="text-sm font-normal text-muted-foreground">
                  {selectedOrder.id}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="p-4">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-secondary/50">
                <img
                  src={selectedOrder.paymentProof}
                  alt="Payment proof"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="font-medium">${selectedOrder.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{selectedOrder.date}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

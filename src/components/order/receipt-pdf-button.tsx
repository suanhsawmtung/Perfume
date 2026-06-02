import { Button } from "@/components/ui/button"
import { formatDate, formatPrice } from "@/lib/utils"
import type { OrderType } from "@/types/order.type"
import { Download } from "lucide-react"



export function ReceiptPDFButton({ order }: { order: OrderType }) {
    const handleDownloadPDF = async () => {
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

        // Receipt title
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text("RECEIPT", pageWidth - 20, 25, { align: "right" })

        // Order info
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(`Receipt #: ${order.code}`, pageWidth - 20, 35, { align: "right" })
        doc.text(`Date: ${formatDate(order.createdAt)}`, pageWidth - 20, 42, { align: "right" })
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
        doc.text(order.customerName || "Customer", 20, 80)
        doc.text(order.customerAddress || "N/A", 20, 87)
        doc.text(`Payment: Bank Transfer`, 20, 94)

        let tableTop = 115

        // Cancelled Reason (if exists)
        if (order.cancelledReason) {
            doc.setFillColor(245, 245, 245)
            doc.rect(20, 105, pageWidth - 40, 25, "F")
            doc.setFontSize(9)
            doc.setFont("helvetica", "bold")
            doc.setTextColor(100)
            doc.text("Cancellation Reason:", 25, 113)
            doc.setFont("helvetica", "normal")
            doc.setTextColor(80)
            const reasonLines = doc.splitTextToSize(order.cancelledReason, pageWidth - 50)
            doc.text(reasonLines, 25, 120)
            doc.setTextColor(0)
            tableTop = 145
        }

        // Table header
        doc.setFillColor(245, 245, 245)
        doc.rect(20, tableTop - 7, pageWidth - 40, 12, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(10)
        doc.text("Item", 25, tableTop)
        doc.text("Qty", 110, tableTop)
        doc.text("Price", 135, tableTop)
        doc.text("Total", pageWidth - 25, tableTop, { align: "right" })

        // Table items
        doc.setFont("helvetica", "normal")
        let yPos = tableTop + 15
        order.orderItems.forEach((item) => {
            doc.text(item.product.name, 25, yPos)
            doc.setFontSize(8)
            doc.setTextColor(100)
            doc.text(item.product.brand, 25, yPos + 5)
            doc.setFontSize(10)
            doc.setTextColor(0)
            doc.text(String(item.quantity), 110, yPos)
            doc.text(formatPrice(Number(item.price)), 135, yPos)
            doc.text(formatPrice(Number(item.price) * item.quantity), pageWidth - 25, yPos, { align: "right" })
            yPos += 18
        })

        // Divider
        doc.line(20, yPos + 5, pageWidth - 20, yPos + 5)

        // Totals
        yPos += 18
        doc.text("Subtotal:", 130, yPos)
        doc.text(formatPrice(order.totalPrice), pageWidth - 25, yPos, { align: "right" })
        yPos += 8
        doc.text("Shipping:", 130, yPos)
        doc.text("Free", pageWidth - 25, yPos, { align: "right" })
        yPos += 8
        doc.setFont("helvetica", "bold")
        doc.text("Order Total:", 130, yPos)
        doc.text(formatPrice(order.totalPrice), pageWidth - 25, yPos, { align: "right" })

        // Total Paid
        yPos += 10
        doc.setTextColor(22, 163, 74) // Green
        doc.text("Total Paid:", 130, yPos)
        doc.text(formatPrice(order.totalPaidAmount), pageWidth - 25, yPos, { align: "right" })

        // Total Refund (if any)
        if (order.totalRefundAmount > 0) {
            yPos += 8
            doc.setTextColor(220, 38, 38) // Red
            doc.text("Total Refund:", 130, yPos)
            doc.text(`-${formatPrice(order.totalRefundAmount)}`, pageWidth - 25, yPos, { align: "right" })

            // Net Amount
            yPos += 10
            doc.setTextColor(0)
            doc.setFontSize(12)
            doc.text("Net Amount:", 130, yPos)
            doc.text(formatPrice(order.totalPaidAmount - order.totalRefundAmount), pageWidth - 25, yPos, { align: "right" })
            doc.setFontSize(10)
        }

        doc.setTextColor(0)

        // Footer
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(100)
        doc.text("Thank you for shopping with NOIR Perfumes!", pageWidth / 2, 270, { align: "center" })
        doc.text("www.noirperfumes.com | support@noirperfumes.com", pageWidth / 2, 277, { align: "center" })

        doc.save(`${order.code}-receipt.pdf`)
    }

    return (
        <Button className="w-full" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
        </Button>
    )
}

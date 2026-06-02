import type { OrderType } from "@/types/order.type"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { formatDate, formatPrice } from "@/lib/utils"
import { ReceiptPDFButton } from "./receipt-pdf-button"

interface ReceiptSectionProps {
    order: OrderType;
}

interface ReceiptDetailItemProps {
    label: string;
    value: React.ReactNode;
    fullWidth?: boolean;
}

function ReceiptHeaderComponent({ order }: ReceiptSectionProps) {
    return (
        <div className="flex items-start justify-between">
            <div>
                <h3 className="font-serif text-2xl font-bold">NOIR</h3>
                <p className="text-xs tracking-widest text-muted-foreground">PERFUMES</p>
            </div>
            <div className="text-right">
                <p className="text-lg font-semibold">RECEIPT</p>
                <p className="mt-1 text-sm text-muted-foreground">{order.code}</p>
            </div>
        </div>
    );
}

function ReceiptDetailItem({ label, value, fullWidth = false }: ReceiptDetailItemProps) {
    return (
        <div className={fullWidth ? "col-span-2" : undefined}>
            <p className="font-medium">{label}</p>
            <p className="text-muted-foreground">{value}</p>
        </div>
    );
}

function ReceiptDetails({ order }: ReceiptSectionProps) {
    return (
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <ReceiptDetailItem label="Date" value={formatDate(order.createdAt)} />
            <ReceiptDetailItem label="Status" value={order.status} />
            <ReceiptDetailItem label="Shipping Address" value={order.customerAddress || "N/A"} fullWidth />
            <ReceiptDetailItem label="Payment Method" value={`Bank Transfer (${order.paymentStatus})`} fullWidth />
        </div>
    );
}

function ReceiptItems({ order }: ReceiptSectionProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium uppercase text-muted-foreground">
                <div className="col-span-6">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
            </div>

            {order.orderItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-6">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {item.product.brand} {item.size ? `• ${item.size}ml` : ""}
                        </p>
                    </div>
                    <div className="col-span-2 text-center">{item.quantity}</div>
                    <div className="col-span-2 text-right">{formatPrice(Number(item.price))}</div>
                    <div className="col-span-2 text-right font-medium">
                        {formatPrice(Number(item.price) * item.quantity)}
                    </div>
                </div>
            ))}
        </div>
    );
}

function ReceiptTotals({ order }: ReceiptSectionProps) {
    const netAmount = order.totalPaidAmount - (order.totalRefundAmount || 0);

    return (
        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.totalPrice)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
            </div>
            <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Order Total</span>
                <span className="font-medium">{formatPrice(order.totalPrice)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-green-600 dark:text-green-400">Total Paid</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatPrice(order.totalPaidAmount)}
                </span>
            </div>
            {order.totalRefundAmount > 0 && (
                <div className="flex justify-between">
                    <span className="text-red-600 dark:text-red-400">Total Refund</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                        -{formatPrice(order.totalRefundAmount)}
                    </span>
                </div>
            )}
            {order.totalRefundAmount > 0 && (
                <div className="flex justify-between border-t pt-2 text-base font-bold">
                    <span>Net Amount</span>
                    <span>{formatPrice(netAmount)}</span>
                </div>
            )}
        </div>
    );
}

function ReceiptFooter() {
    return (
        <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Thank you for shopping with NOIR Perfumes!</p>
            <p className="mt-1">www.noirperfumes.com | support@noirperfumes.com</p>
        </div>
    );
}

export function ReceiptSheet({
    open,
    onOpenChange,
    order
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    order: OrderType | null
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Receipt</SheetTitle>
                </SheetHeader>

                {order && (
                    <div className="mt-6">
                        {/* Receipt Preview */}
                        <div className="p-6">
                            <ReceiptHeaderComponent order={order} />
                            <ReceiptDetails order={order} />

                            {/* Cancelled Reason in Receipt */}
                            {order.cancelledReason && (
                                <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
                                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Cancellation Reason</p>
                                    <p className="mt-1 break-words text-sm text-zinc-600 dark:text-zinc-400">{order.cancelledReason}</p>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="my-6 border-t" />

                            <ReceiptItems order={order} />

                            {/* Divider */}
                            <div className="my-6 border-t" />

                            <ReceiptTotals order={order} />
                            <ReceiptFooter />
                        </div>

                        {/* Download Button */}
                        <div className="p-6">
                            <ReceiptPDFButton order={order} />
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
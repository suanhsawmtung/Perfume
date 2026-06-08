import type { OrderStatus, OrderType } from "@/types/order.type";
import { cn, formatDate, formatImagePath, formatPrice, getOrderStatusColor } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { AlertTriangle, ChevronRight, FileText, ImageIcon, MessageSquare, Receipt, XCircle } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CancelOrderForm } from "./cancel-order-form";

interface OrderNoteAlertProps {
    title: string;
    content: string;
    icon: React.ComponentType<{ className?: string }>;
    variant?: "blue" | "red" | "zinc";
}

interface OrderPaymentSummaryProps {
    totalPaidAmount: number;
    totalRefundAmount: number;
}

const canCancel = (status: string) => {
    const nonCancellableStatuses: OrderStatus[] = [
        "SHIPPED",
        "DELIVERED",
        "DONE",
        "REJECTED",
        "CANCELLED",
    ]
    return !nonCancellableStatuses.includes(status as OrderStatus)
}

export function OrderCard({
    order,
    cancellingOrderCode,
    setCancellingOrderCode,
    setReceiptOpen,
    setPaymentProofOpen,
    setSelectedOrder,
}: {
    order: OrderType,
    cancellingOrderCode: string | null,
    setCancellingOrderCode: (code: string | null) => void,
    setReceiptOpen: (open: boolean) => void,
    setPaymentProofOpen: (open: boolean) => void,
    setSelectedOrder: (order: OrderType | null) => void,
}) {
    return (
        <Card key={order.id}>
            <CardContent className="p-4 sm:p-6">
                {/* Order Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h2 className="font-semibold">#{order.code}</h2>
                            <span
                                className={cn(
                                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                    getOrderStatusColor(order.status)
                                )}
                            >
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Placed on {formatDate(order.createdAt)}
                        </p>
                    </div>
                    <div className="sm:text-right">
                        <p className="text-lg font-semibold">{formatPrice(order.totalPrice)}</p>
                        <p className="text-sm text-muted-foreground">
                            {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)} item
                            {order.orderItems.length > 1 ? "s" : ""}
                        </p>
                    </div>
                </div>


                {/* Payment Summary */}
                <div className="mt-4">
                    <OrderPaymentSummary
                        totalPaidAmount={order.totalPaidAmount}
                        totalRefundAmount={order.totalRefundAmount}
                    />
                </div>

                {/* Customer Note */}
                {order.customerNotes && (
                    <div className="mt-4">
                        <OrderNoteAlert
                            title="Customer Note"
                            content={order.customerNotes}
                            icon={MessageSquare}
                            variant="blue"
                        />
                    </div>
                )}

                {/* Rejected Reason */}
                {order.rejectedReason && (
                    <div className="mt-4">
                        <OrderNoteAlert
                            title="Rejected Reason"
                            content={order.rejectedReason}
                            icon={AlertTriangle}
                            variant="red"
                        />
                    </div>
                )}

                {/* Cancelled Reason */}
                {order.cancelledReason && (
                    <div className="mt-4">
                        <OrderNoteAlert
                            title="Cancellation Reason"
                            content={order.cancelledReason}
                            icon={XCircle}
                            variant="zinc"
                        />
                    </div>
                )}

                {/* Order Items */}
                <div className="mt-6 border-t border-border/50 pt-6">
                    <div className="space-y-4">
                        {order.orderItems.map((item, index) => {
                            const variantImage = item.image;
                            const imageUrl = variantImage
                                ? formatImagePath(variantImage, "product")
                                : "/placeholder.png";

                            return (
                                <Link
                                    key={index}
                                    to={`/products/${item.product.slug}`}
                                    className="group block"
                                >
                                    <div className="flex gap-3 sm:gap-4">
                                        {/* Product Image */}
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/50 sm:h-20 sm:w-20">
                                            {item.image ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={item.product.name || "Product image"}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                                                    <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info - Stack on mobile */}
                                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                                            <p className="truncate font-medium group-hover:underline">
                                                {item.product.name}
                                            </p>
                                            <p className="mt-0.5 truncate text-sm text-muted-foreground">
                                                {item.product.brand} {item.size ? `• ${item.size}ml` : ""}
                                            </p>
                                            {/* Price and Qty on mobile - below name */}
                                            <div className="mt-2 flex items-center gap-3 text-sm sm:hidden">
                                                <span className="font-medium">{formatPrice(Number(item.price))}</span>
                                                <span className="text-muted-foreground">Qty: {item.quantity}</span>
                                            </div>
                                        </div>

                                        {/* Price and Qty on desktop - right side */}
                                        <div className="hidden shrink-0 items-center gap-4 sm:flex">
                                            <div className="text-right">
                                                <p className="font-medium">{formatPrice(Number(item.price))}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Cancel Order Form */}
                {cancellingOrderCode && cancellingOrderCode === order.code && (
                    <div className="mt-6">
                        <CancelOrderForm
                            cancellingOrderCode={cancellingOrderCode}
                            setCancellingOrderCode={setCancellingOrderCode}
                            canCancel={canCancel(order.status)}
                        />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
                    {canCancel(order.status) && cancellingOrderCode !== order.code && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/50 sm:w-auto"
                            onClick={() => setCancellingOrderCode(order.code)}
                        >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => {
                            setSelectedOrder(order)
                            setReceiptOpen(true)
                        }}
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        Receipt
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
    )
}

function OrderPaymentSummary({ totalPaidAmount, totalRefundAmount }: OrderPaymentSummaryProps) {
    if (totalPaidAmount <= 0) return null;

    return (
        <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-lg py-3 text-sm">
            {/* Always show paid if section is visible */}
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Total Paid:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatPrice(totalPaidAmount)}
                </span>
            </div>

            {/* Only show if refund exists */}
            {totalRefundAmount > 0 && (
                <>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Refunded:</span>
                        <span className="font-semibold text-red-600 dark:text-red-400">
                            {formatPrice(totalRefundAmount)}
                        </span>
                    </div>

                    {/* Only show if refund exists — paid minus refund */}
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Net Amount:</span>
                        <span className="font-semibold">
                            {formatPrice((totalPaidAmount ?? 0) - (totalRefundAmount ?? 0))}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

function OrderNoteAlert({ title, content, icon: Icon, variant = "zinc" }: OrderNoteAlertProps) {
    const variantStyles = {
        blue: {
            container: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50",
            icon: "text-blue-600 dark:text-blue-400",
            title: "text-blue-700 dark:text-blue-300",
            content: "text-blue-800 dark:text-blue-200",
        },
        red: {
            container: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50",
            icon: "text-red-600 dark:text-red-400",
            title: "text-red-700 dark:text-red-300",
            content: "text-red-800 dark:text-red-200",
        },
        zinc: {
            container: "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50",
            icon: "text-zinc-600 dark:text-zinc-400",
            title: "text-zinc-700 dark:text-zinc-300",
            content: "text-zinc-800 dark:text-zinc-200",
        },
    }[variant];

    return (
        <div className={cn("rounded-lg border p-3", variantStyles.container)}>
            <div className="flex items-start gap-2">
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", variantStyles.icon)} />
                <div className="min-w-0 flex-1">
                    <p className={cn("text-xs font-medium", variantStyles.title)}>{title}</p>
                    <p className={cn("mt-1 text-sm", variantStyles.content)}>{content}</p>
                </div>
            </div>
        </div>
    );
}
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import type { OrderType } from "@/types/order.type"
import { formatImagePath } from "@/lib/utils"
import { Receipt, X } from "lucide-react"

interface PaymentProofDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedOrder: OrderType | null;
}

export function PaymentProofDialog({
    open,
    onOpenChange,
    selectedOrder
}: PaymentProofDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogPortal>
                <DialogOverlay className="bg-black/90 backdrop-blur-sm z-[100]" />
                <DialogContent
                    showCloseButton={false}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-transparent border-none p-0 max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] w-full flex flex-col items-center justify-center outline-none shadow-none focus:outline-none"
                >
                    <DialogTitle className="sr-only">Payment Proof: {selectedOrder?.code}</DialogTitle>

                    {selectedOrder && (
                        <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center">
                            {/* {selectedOrder.image && (
                                <>
                                    <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex((prev) =>
                                        prev !== null ? (prev - 1 + post.images!.length) % post.images!.length : null
                                        );
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors z-50 border border-white/10 backdrop-blur-sm"
                                    aria-label="Previous image"
                                    >
                                    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    </button>
                                    <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex((prev) =>
                                        prev !== null ? (prev + 1) % post.images!.length : null
                                        );
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors z-50 border border-white/10 backdrop-blur-sm"
                                    aria-label="Next image"
                                    >
                                    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    </button>
                                </>
                            )} */}

                            <div className="relative w-full h-full">
                                {selectedOrder.image ? (
                                    <img
                                        src={formatImagePath(selectedOrder.image, "order")}
                                        alt="Payment proof"
                                        className="w-full h-full object-contain rounded-xl select-none"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                                        <Receipt className="h-10 w-10 mb-2 opacity-50" />
                                        <p className="text-sm font-medium">No Payment Slip Uploaded</p>
                                        <p className="text-xs opacity-75 mt-1">Please upload proof of bank transfer payment.</p>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors z-50 border border-white/10 backdrop-blur-sm"
                                aria-label="Close dialog"
                            >
                                <X className="size-5" />
                            </Button>

                            {/* {post.images.length > 1 && (
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                    {activeImageIndex + 1} / {post.images.length}
                                </div>
                            )} */}
                        </div>
                    )}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
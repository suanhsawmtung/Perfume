import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatImagePath } from "@/lib/utils";
import { Receipt, X } from "lucide-react";

interface PaymentProofDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrderCode?: string | null;
  selectedOrderImage?: string | null;
}

export function PaymentProofDialog({
  open,
  onOpenChange,
  selectedOrderCode,
  selectedOrderImage,
}: PaymentProofDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-black/90 backdrop-blur-sm" />
        <DialogContent
          showCloseButton={false}
          className="fixed top-1/2 left-1/2 z-[101] flex w-full max-w-[95vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border-none bg-transparent p-0 shadow-none outline-none focus:outline-none sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw]"
        >
          {selectedOrderCode && (
            <DialogTitle className="mb-4 text-center text-lg font-semibold text-white">
              Payment Proof for Order: {selectedOrderCode}
            </DialogTitle>
          )}

          {selectedOrderImage && (
            <div className="relative flex h-[65vh] w-full items-center justify-center sm:h-[75vh] md:h-[80vh]">
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

              <div className="relative h-full w-full">
                {selectedOrderImage ? (
                  <img
                    src={formatImagePath(selectedOrderImage, "order")}
                    alt="Payment proof"
                    className="h-full w-full rounded-xl object-contain select-none"
                  />
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center justify-center p-6 text-center">
                    <Receipt className="mb-2 h-10 w-10 opacity-50" />
                    <p className="text-sm font-medium">
                      No Payment Slip Uploaded
                    </p>
                    <p className="mt-1 text-xs opacity-75">
                      Please upload proof of bank transfer payment.
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute -top-12 right-0 z-50 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
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

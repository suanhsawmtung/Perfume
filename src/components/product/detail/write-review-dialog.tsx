import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { Link } from "react-router";
import { WriteReviewForm } from "./write-review-form";

interface WriteReviewDialogProps {
    children: React.ReactNode;
    canReview: boolean;
    productId: number
}

export function WriteReviewDialog({ children, canReview, productId }: WriteReviewDialogProps) {
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

    const authUser = useAuthStore((state) => state.authUser);

    return (
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            {!authUser ? (
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Sign in to write a review</DialogTitle>
                        <DialogDescription>
                            You need to be logged in to share your experience.
                        </DialogDescription>
                    </DialogHeader>
                    <Button asChild>
                        <Link to="/sign-in">Sign In</Link>
                    </Button>
                </DialogContent>
            ) : !canReview ? (
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Purchase required</DialogTitle>
                        <DialogDescription>
                            Only customers who have purchased this product can leave a review.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            ) : (
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                    </DialogHeader>
                    <WriteReviewForm
                        productId={productId}
                        setReviewDialogOpen={setReviewDialogOpen}
                    />
                </DialogContent>
            )}
        </Dialog>
    )
}
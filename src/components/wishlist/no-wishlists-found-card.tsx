import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link } from "react-router";

export function NoWishlistsFoundCard() {
    return (
        <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center text-center">
                <div className="rounded-full bg-secondary p-6">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="mt-6 text-xl font-semibold">Your wishlist is empty</h2>
                <p className="mt-2 max-w-sm text-muted-foreground">
                    Start adding your favorite fragrances to your wishlist by clicking
                    the heart icon on any product.
                </p>
                <Button className="mt-6" asChild>
                    <Link to="/products">Browse Products</Link>
                </Button>
            </CardContent>
        </Card>
    )
}
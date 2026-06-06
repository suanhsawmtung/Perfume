import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export function NoOrdersFoundCard() {
    return (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
            <Receipt className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No orders found</h3>
            <p className="text-muted-foreground mt-2 mb-6">You haven't placed any orders yet.</p>
            <Button asChild>
                <Link to="/products">Browse Products</Link>
            </Button>
        </Card>
    )
}
import { RotateCcw, Shield, Truck } from "lucide-react";

export function ProductDetailBenefits() {
    return (
        <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-8">
            <div className="flex flex-col items-center text-center">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On All Orders</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-xs font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30 Day Policy</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-xs font-medium">Authentic</p>
                <p className="text-xs text-muted-foreground">100% Genuine</p>
            </div>
        </div>
    )
}
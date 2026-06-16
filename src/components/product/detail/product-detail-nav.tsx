import { Link } from "react-router";

export function ProductDetailNav({
    productName
}: {
    productName: string;
}) {
    return (
        <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
                Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-foreground">
                Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{productName}</span>
        </nav>
    );
}
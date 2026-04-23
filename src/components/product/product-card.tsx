// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { cn, formatPrice } from "@/lib/utils";
// import type { Product } from "@/types";
// import { AspectRatio } from "@radix-ui/react-aspect-ratio";
// import { Plus } from "lucide-react";
// import type { HTMLAttributes } from "react";
// import { Link } from "react-router";
// import { Button } from "../ui/button";

// interface Props extends HTMLAttributes<HTMLDivElement> {
//   product: Product;
// }

// const ProductCard = ({ product, className }: Props) => {
//   return (
//     <Card className={cn("w-full overflow-hidden rounded-lg p-0", className)}>
//       <div className="space-y-2">
//         <Link to={`/products/${product.id}`} className="space-y-2">
//           <CardHeader className="p-0">
//             <AspectRatio ratio={1 / 1} className="w-full">
//               <img
//                 src={product.images[0]}
//                 alt={product.name}
//                 className="size-full object-cover"
//               />
//             </AspectRatio>
//           </CardHeader>
//           <CardContent className="space-y-1.5 px-4">
//             <CardTitle className="line-clamp-1">{product.name}</CardTitle>
//             <CardDescription className="line-clamp-1 flex items-center gap-x-2">
//               {formatPrice(product.price)}
//               {product.discount > 0 && (
//                 <span className="font-extralight line-through">
//                   {formatPrice(product.discount)}
//                 </span>
//               )}
//             </CardDescription>
//           </CardContent>
//         </Link>
//         <CardFooter className="w-full p-4">
//           {product.inventory > 0 && product.status === "active" ? (
//             <Button
//               type="button"
//               size="sm"
//               className="bg-hero w-full cursor-pointer rounded-sm font-bold"
//             >
//               <Plus />
//               Add To Cart
//             </Button>
//           ) : (
//             <Button
//               type="button"
//               size="sm"
//               className="size-sm bg-hero w-full rounded-sm font-bold"
//               disabled
//             >
//               Sold Out
//             </Button>
//           )}
//         </CardFooter>
//       </div>
//     </Card>
//   );
// };

// export default ProductCard;

import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { Link } from "react-router"

interface ProductCardProps {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  isNew?: boolean
  isBestSeller?: boolean
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  isNew,
  isBestSeller,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/50">
        <img
          src={image}
          alt={name}
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-foreground px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
              New
            </span>
          )}
          {isBestSeller && (
            <span className="bg-foreground/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
              Best Seller
            </span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {brand}
        </p>
        <h3 className="mt-1 font-medium text-foreground line-clamp-1">
          {name}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3 w-3",
                i < Math.floor(rating)
                  ? "fill-foreground text-foreground"
                  : "fill-muted text-muted"
              )}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            ({reviewCount})
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">${price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

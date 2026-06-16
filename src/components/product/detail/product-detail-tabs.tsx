import { useState } from "react";
import { ProductReviews } from "./product-reviews";
import { cn } from "@/lib/utils";
import type { ProductDetailType } from "@/types/product.type";

interface ProductDetailTabsProps {
  product: ProductDetailType
}

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "notes" | "reviews">(
    "description"
  );

  return (
    <div className="border-t border-border/50 pt-16">
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-3xl space-x-8 text-start">
          {(["description", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 text-sm font-medium capitalize transition-colors",
                activeTab === tab
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {activeTab === "description" && (
          <div className="w-full mx-auto max-w-3xl">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* 
                    {activeTab === "notes" && product &&. (
                      <div className="grid gap-8 md:grid-cols-3">
                        <div>
                          <h3 className="font-medium">Top Notes</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            The initial impression of the fragrance
                          </p>
                          <ul className="mt-4 space-y-2">
                            {product.notes.top.map((note) => (
                              <li
                                key={note}
                                className="text-sm text-muted-foreground"
                              >
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium">Middle Notes</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            The heart of the fragrance
                          </p>
                          <ul className="mt-4 space-y-2">
                            {product.notes.middle.map((note) => (
                              <li
                                key={note}
                                className="text-sm text-muted-foreground"
                              >
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium">Base Notes</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            The lasting foundation
                          </p>
                          <ul className="mt-4 space-y-2">
                            {product.notes.base.map((note) => (
                              <li
                                key={note}
                                className="text-sm text-muted-foreground"
                              >
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )} */}

        {activeTab === "reviews" && (
          <ProductReviews
            productId={product.id}
            hasReviewed={product.hasReviewed}
            canReview={product.canReview}
          />
        )}
      </div>
    </div>
  );
}
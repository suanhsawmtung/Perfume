import { cn, formatImagePath } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function ProductDetailImageCarousel({
    images,
    productName
}: {
    images: {
        path: string;
        isPrimary: boolean;
        order: number;
    }[];
    productName: string;
}) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap())
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    return (
        <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full lg:w-1/2"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem key={image.path}>
                        <Card className="p-0 rounded-none">
                            <CardContent className="relative aspect-square w-full overflow-hidden bg-secondary/50 p-0">
                                <img
                                    src={formatImagePath(image.path, 'product')}
                                    alt={productName}
                                    className="w-full h-full object-cover"
                                />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="mt-4 flex items-center justify-center gap-2.5">
                {images.map((image, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => api?.scrollTo(index)}
                        className={cn(
                            "h-auto w-auto p-0 border-0 bg-none",
                        )}
                    >
                        <div className={cn(
                            "relative aspect-square w-20 overflow-hidden bg-secondary/50 p-0 rounded-sm transition-all duration-200 ease-in-out",
                            current === index ? "border-3 border-amber-400" : "border border-foreground/20",
                        )}>
                            <img
                                src={formatImagePath(image.path, 'product')}
                                alt={productName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Button>
                ))}
            </div>
        </Carousel>
    )
}

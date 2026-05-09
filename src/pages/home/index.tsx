import { ReviewsSlider } from "@/components/home/reviews-slider";
import { BestSellersSection } from "@/components/home/sections/best-sellers-section";
import { ForYouSection } from "@/components/home/sections/for-you-section";
import { HeroSection } from "@/components/home/sections/hero-section";
import { LatestBlogsSection } from "@/components/home/sections/latest-blogs-section";
import { useHomeData } from "@/services/home/queries/useGetHomeData";
import { usePreferenceStore } from "@/stores/preference.store";

export default function HomePage() {
  const gender = usePreferenceStore((state) => state.gender);
  const { data } = useHomeData(gender);

  return (
    <>
      <HeroSection />
      <ForYouSection products={data?.productsForYou || []} />
      <BestSellersSection products={data?.bestSellerProducts || []} />
      <ReviewsSlider reviews={data?.latestReviews || []} />
      <LatestBlogsSection posts={data?.latestPosts || []} />
    </>
  )
}


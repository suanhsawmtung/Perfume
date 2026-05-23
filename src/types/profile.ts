export interface MyProfileT {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  emailVerifiedAt: string | Date | null;
  createdAt: string | Date;
  username: string;
  phone: string | null;
  image: string | null;
  orders: {
    id: number;
    code: string;
    createdAt: string | Date;
    totalPrice: number;
    totalQuantity: number;
  }[];
  wishlist: {
    id: number;
    name: string;
    image: string | null;
    price: number;
    discount: number;
  }[];
  reviews: {
    id: number;
    content: string | null;
    rating: number;
    isPublish: boolean;
    createdAt: string | Date;
    productName: string;
  }[];
  rewards: {
    currentPoints: number;
    currentGrade: "PLATINUM" | "GOLD" | "SILVER" | "BRONZE";
    progress: number;
    range: { start: number; end: number };
    toNextGrade: number;
    totalOrders: number;
    totalSpent: number;
    totalReviews: number;
  };
}

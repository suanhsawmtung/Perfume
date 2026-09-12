import ContentWrapper from "@/components/wrapper/content-wrapper";
import { Link } from "react-router";
import NewsLetterForm from "./news-letter-form";

const footerLinks = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?gender=MALE", label: "For Men" },
    { href: "/products?gender=FEMALE", label: "For Women" },
    { href: "/products?gender=UNISEX", label: "Unisex" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/blogs", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping" },
    { href: "/returns", label: "Returns" },
    { href: "/track-order", label: "Track Order" },
  ],
};

export function Footer() {
  return (
    <footer className="border-border/40 bg-secondary/30 border-t">
      <ContentWrapper className="py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-semibold tracking-tight">
                AZUE
              </span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
              Discover the art of fragrance. Premium perfumes crafted for those
              who appreciate the finer things in life.
            </p>
            <div className="mt-6">
              <NewsLetterForm />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border/40 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} AZUE Perfume House. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
}

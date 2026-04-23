// import LogoIcon from "@/components/icons/logo-icon";
// import { siteConfig } from "@/config/site";
// import { Link } from "react-router";
// import ContentWrapper from "../../wrapper/content-wrapper";
// import NewsLetterForm from "./news-letter-form";

// const Footer = () => {
//   return (
//     <footer className="w-full border-t">
//       <ContentWrapper className="pt-8 pb-14">
//         <div className="flex flex-col items-start justify-start gap-x-16 gap-y-12 xl:flex-row">
//           <Link to="/">
//             <div className="flex items-center gap-x-2">
//               <LogoIcon className="text-primary size-8" aria-hidden={true} />
//               <h1 className="text-xl font-semibold">{siteConfig.name}</h1>
//               <span className="sr-only">Home</span>
//             </div>
//           </Link>

//           <div className="grid w-full grid-cols-2 gap-14 lg:w-auto lg:grid-cols-4">
//             {siteConfig.footerNav.map((data) => (
//               <div key={data.title} className="space-y-4">
//                 <h2 className="text-base font-semibold">{data.title}</h2>
//                 <ul className="flex flex-col items-start justify-start gap-y-2">
//                   {data.items.map((item) => (
//                     <li
//                       key={item.title}
//                       className="text-muted-foreground hover:text-accent-foreground text-base"
//                     >
//                       <Link
//                         to={item.href || "/"}
//                         target={item.external ? "_blank" : undefined}
//                       >
//                         {item.title}
//                         <span className="sr-only">{item.title}</span>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           <div className="flex w-full flex-1 items-start justify-start xl:w-auto xl:justify-center">
//             <NewsLetterForm />
//           </div>
//         </div>
//       </ContentWrapper>
//     </footer>
//   );
// };

// export default Footer;

import ContentWrapper from "@/components/wrapper/content-wrapper"
import { Link } from "react-router"
import NewsLetterForm from "./news-letter-form"

const footerLinks = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?category=men", label: "For Men" },
    { href: "/products?category=women", label: "For Women" },
    { href: "/products?category=unisex", label: "Unisex" },
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
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/30">
      <ContentWrapper className="py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-semibold tracking-tight">NOIR</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Discover the art of fragrance. Premium perfumes crafted for those
              who appreciate the finer things in life.
            </p>
            <div className="mt-6">
              <NewsLetterForm />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NOIR Perfumes. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  )
}


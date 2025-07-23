import Link from "next/link";
import { Code, ArrowRight } from "lucide-react";

const footerLinks = {
  product: [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/tracing", label: "Tracing" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/docs", label: "Documentation" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/security", label: "Security" },
    { href: "/compliance", label: "Compliance" },
  ],
  developers: [
    { href: "https://github.com/graphbit-org/graphbit", label: "GitHub", external: true },
    { href: "/api-docs", label: "API Reference" },
    { href: "/community", label: "Community" },
    { href: "/changelog", label: "Changelog" },
  ],
};

const socialLinks = [
  { href: "https://github.com/graphbit-org/graphbit", label: "GitHub" },
  { href: "https://twitter.com/graphbit", label: "Twitter" },
  { href: "https://linkedin.com/company/graphbit", label: "LinkedIn" },
  { href: "mailto:hello@graphbit.io", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white">
      <div className="container-responsive responsive-py">
        <div className="grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2 touch-target-sm group">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold responsive-text-lg text-gray-900">GraphBit</span>
            </Link>
            <p className="text-muted-foreground responsive-text-xs leading-relaxed max-w-md">
              The most intuitive platform for deploying, monitoring, and scaling AI agents. 
              Build with confidence using our powerful tracing and marketplace ecosystem.
            </p>
            
            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="font-bold responsive-text-xs text-gray-900 border-b border-black pb-2">🌐 Follow Us</h4>
              <div className="flex items-center flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="responsive-text-xs text-muted-foreground hover:text-primary transition-colors duration-200 touch-target-sm"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-bold responsive-text-xs text-gray-900 border-b border-black pb-2">🚀 Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="responsive-text-xs text-muted-foreground hover:text-primary transition-colors duration-200 touch-target-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-bold responsive-text-xs text-gray-900 border-b border-black pb-2">🏢 Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="responsive-text-xs text-muted-foreground hover:text-primary transition-colors duration-200 touch-target-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Links */}
          <div className="space-y-4">
            <h3 className="font-bold responsive-text-xs text-gray-900 border-b border-black pb-2">💻 Developers</h3>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="responsive-text-xs text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 touch-target-sm"
                  >
                    {link.label}
                    {link.external && <ArrowRight className="h-3 w-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Legal Section */}
        <div className="mt-8 pt-8 border-t-2 border-black">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 touch-target-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} GraphBit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
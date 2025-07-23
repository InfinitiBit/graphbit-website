import Link from 'next/link';
import { Code, ArrowRight } from 'lucide-react';

const footerLinks = {
  product: [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/tracing', label: 'Tracing' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/docs', label: 'Documentation' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/security', label: 'Security' },
    { href: '/compliance', label: 'Compliance' },
  ],
  developers: [
    { href: 'https://github.com/graphbit-org/graphbit', label: 'GitHub', external: true },
    { href: '/api-docs', label: 'API Reference' },
    { href: '/community', label: 'Community' },
    { href: '/changelog', label: 'Changelog' },
  ],
};

const socialLinks = [
  { href: 'https://github.com/graphbit-org/graphbit', label: 'GitHub' },
  { href: 'https://twitter.com/graphbit', label: 'Twitter' },
  { href: 'https://linkedin.com/company/graphbit', label: 'LinkedIn' },
  { href: 'mailto:hello@graphbit.io', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white">
      <div className="container-responsive responsive-py">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="touch-target-sm group flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black transition-colors group-hover:bg-gray-800">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="responsive-text-lg font-bold text-gray-900">GraphBit</span>
            </Link>
            <p className="responsive-text-xs max-w-md leading-relaxed text-muted-foreground">
              The most intuitive platform for deploying, monitoring, and scaling AI agents. Build
              with confidence using our powerful tracing and marketplace ecosystem.
            </p>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="responsive-text-xs border-b border-black pb-2 font-bold text-gray-900">
                🌐 Follow Us
              </h4>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="responsive-text-xs touch-target-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="responsive-text-xs border-b border-black pb-2 font-bold text-gray-900">
              🚀 Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="responsive-text-xs touch-target-sm inline-block text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="responsive-text-xs border-b border-black pb-2 font-bold text-gray-900">
              🏢 Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="responsive-text-xs touch-target-sm inline-block text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Links */}
          <div className="space-y-4">
            <h3 className="responsive-text-xs border-b border-black pb-2 font-bold text-gray-900">
              💻 Developers
            </h3>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="responsive-text-xs touch-target-sm flex items-center gap-1 text-muted-foreground transition-colors duration-200 hover:text-primary"
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
        <div className="mt-8 border-t-2 border-black pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="touch-target-sm text-xs text-muted-foreground transition-colors duration-200 hover:text-primary"
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

import { Link, useNavigate, useLocation } from "react-router-dom";
import { Facebook, Instagram, Youtube, Music } from "lucide-react";
import { navLinks, socialLinks, footerContent } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  facebook: <Facebook size={20} />,
  instagram: <Instagram size={20} />,
  youtube: <Youtube size={20} />,
  music: <Music size={20} />,
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href: string, isScroll: boolean) => {
    if (isScroll) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="section-container py-16">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-all duration-300"
              aria-label={social.label}
            >
              {iconMap[social.icon]}
            </a>
          ))}
        </div>

        {/* X Link */}
        <div className="text-center mb-8">
          <a
            href={footerContent.linkX.href}
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            {footerContent.linkX.label}
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          {footerContent.copyright}
        </p>

        {/* Designed By */}
        <p className="text-center text-sm text-muted-foreground mb-8">
          <a
            href={footerContent.designedBy.href}
            className="hover:text-foreground transition-colors"
          >
            {footerContent.designedBy.label}
          </a>
        </p>

        {/* Nav Links */}
        <div className="flex justify-center gap-8 flex-wrap">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href, link.isScroll)}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

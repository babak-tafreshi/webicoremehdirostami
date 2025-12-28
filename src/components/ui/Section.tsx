import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  showDivider?: boolean;
}

const Section = ({ id, title, children, className = "", showDivider = true }: SectionProps) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="section-container"
      >
        {title && (
          <h2 className="heading-md text-center mb-12">{title}</h2>
        )}
        {children}
      </motion.div>
      {showDivider && <div className="section-divider" />}
    </section>
  );
};

export default Section;

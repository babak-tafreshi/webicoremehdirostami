import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { concerts, siteConfig } from "@/data/content";

const Concerts = () => {
  return (
    <>
      <SEOHead
        title={`Concerts | ${siteConfig.name}`}
        description="View the complete concert history of Mehdi Rostami, featuring performances across Iran, Europe, and beyond."
        path="/concerts"
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="section-container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="heading-lg text-center mb-16"
          >
            Concerts
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <ul className="space-y-4">
              {concerts.map((concert, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="body-text border-b border-border pb-4 last:border-0"
                >
                  <span className="font-medium text-foreground">{concert.year}</span>
                  <span className="mx-3 text-muted-foreground">—</span>
                  <span>{concert.description}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Concerts;

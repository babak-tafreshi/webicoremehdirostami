import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Section from "@/components/ui/Section";
import AudioPlayer from "@/components/AudioPlayer";
import ImageGrid from "@/components/ImageGrid";
import {
  heroContent,
  aboutContent,
  moreContent,
  albums,
  educations,
  skills,
  quoteHeading,
  siteConfig,
} from "@/data/content";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import more1 from "@/assets/more-1.jpg";
import more2 from "@/assets/more-2.jpg";

const heroImages = [
  { src: hero1, alt: "Setar instrument" },
  { src: hero2, alt: "Concert performance" },
  { src: hero3, alt: "Persian instruments" },
];

const moreImages = [
  { src: more1, alt: "Music teaching" },
  { src: more2, alt: "Traditional music heritage" },
];

const Index = () => {
  return (
    <>
      <SEOHead />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="section-container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="heading-lg mb-4"
          >
            {heroContent.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground font-light tracking-wide mb-12"
          >
            {heroContent.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mb-12"
          >
            <AudioPlayer trackDuration={heroContent.trackDuration} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <ImageGrid images={heroImages} columns={3} />
          </motion.div>
        </div>
        <div className="section-divider" />
      </section>

      {/* About Section */}
      <Section id="about" title="About">
        <p className="body-text text-center max-w-3xl mx-auto">{aboutContent.text}</p>
      </Section>

      {/* Performances Section */}
      <Section title="Performances">
        <div className="text-center">
          <Link to="/concerts" className="btn-outline">
            See All
          </Link>
        </div>
      </Section>

      {/* More Section */}
      <Section title="More">
        <p className="body-text text-center max-w-3xl mx-auto mb-12">{moreContent.text}</p>
        <ImageGrid images={moreImages} columns={2} />
      </Section>

      {/* Albums Section */}
      <Section title="Albums">
        <ul className="space-y-3 text-center">
          {albums.map((album, index) => (
            <li key={index} className="body-text">
              {album.year} {album.title}
            </li>
          ))}
        </ul>
      </Section>

      {/* Educations Section */}
      <Section title="Educations">
        <ul className="space-y-3 text-center">
          {educations.map((edu, index) => (
            <li key={index} className="body-text">{edu}</li>
          ))}
        </ul>
      </Section>

      {/* Skills Section */}
      <Section title="Skills">
        <ul className="space-y-2 max-w-xl mx-auto">
          {skills.map((skill, index) => (
            <li key={index} className="body-text">. {skill}</li>
          ))}
        </ul>
      </Section>

      {/* Quote Section */}
      <Section showDivider={true}>
        <h2 className="heading-md text-center mb-8">{quoteHeading}</h2>
        <div className="max-w-2xl mx-auto">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/kfQF6fF4kRI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Contact" showDivider={false}>
        <p className="body-text text-center text-lg">
          <a href={`mailto:${siteConfig.email}`} className="text-primary hover:text-primary/80 transition-colors font-semibold break-all">
            {siteConfig.email}
          </a>
        </p>
      </Section>
    </>
  );
};

export default Index;

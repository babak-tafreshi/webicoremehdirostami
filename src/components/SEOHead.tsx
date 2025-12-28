import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/data/content";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

const SEOHead = ({ 
  title = siteConfig.title, 
  description = siteConfig.description,
  path = ""
}: SEOHeadProps) => {
  const fullUrl = `${siteConfig.url}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteConfig.name} />
      <meta name="keywords" content="setar, Persian music, Iranian musician, Mehdi Rostami, classical music, traditional music" />
    </Helmet>
  );
};

export default SEOHead;

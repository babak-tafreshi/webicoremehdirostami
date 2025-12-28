import { useState } from "react";
import { motion } from "framer-motion";

interface ImageGridProps {
  images: { src: string; alt: string }[];
  columns?: 2 | 3;
}

const ImageGrid = ({ images, columns = 3 }: ImageGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setErrorImages((prev) => ({ ...prev, [index]: true }));
  };

  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-4 md:gap-6`}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="aspect-[4/3] overflow-hidden bg-muted"
        >
          {errorImages[index] ? (
            <div className="w-full h-full image-placeholder">
              <span className="text-center px-4">Image placeholder</span>
            </div>
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
              className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                loadedImages[index] ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {!loadedImages[index] && !errorImages[index] && (
            <div className="absolute inset-0 image-placeholder animate-pulse" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;

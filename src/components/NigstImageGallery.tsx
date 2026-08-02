import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ExternalLink, X } from 'lucide-react';

import img1 from '../imports/1774869242215.jpg';
import img2 from '../imports/1774869242357.jpg';
import img3 from '../imports/1774869246661.jpg';
import img4 from '../imports/1774869248707.jpg';
import img5 from '../imports/1774869274403.jpg';
import img6 from '../imports/1774869274954.jpg';

export default function NigstImageGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const images = [
    { src: img1, alt: "NIGST Survey of India - UAV Orthorectified Imagery Processing" },
    { src: img2, alt: "NIGST Survey of India - Building Footprint Segmentation Results" },
    { src: img3, alt: "NIGST Survey of India - Deep Learning Pipeline Architecture" },
    { src: img4, alt: "NIGST Survey of India - Road Network Extraction Validation" },
    { src: img5, alt: "NIGST Survey of India - Georeferenced GeoJSON Spatial Outputs" },
    { src: img6, alt: "NIGST Survey of India - Model Evaluation on NVIDIA RTX A5000" },
  ];

  return (
    <div className="mt-6 space-y-4 w-full">
      {/* 3x2 Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImg(img.src)}
            className="group relative h-40 overflow-hidden border border-border bg-black/50 cursor-pointer hover:border-primary transition-all duration-300"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2 bg-background/80 text-primary border border-primary/40 rounded-full backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Direct LinkedIn Post Button */}
      <div className="pt-2 flex items-center gap-3">
        <a
          href="https://lnkd.in/p/gizsSsGQ"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono font-bold text-xs hover:bg-primary/90 transition-colors z-20 relative shadow-sm"
        >
          <ExternalLink className="w-4 h-4" /> View it on LinkedIn
        </a>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl max-h-[90vh] overflow-hidden border border-primary/50 bg-background/95 p-2">
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-2 bg-background/80 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors z-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedImg} alt="Enlarged view" className="max-w-full max-h-[82vh] object-contain mx-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

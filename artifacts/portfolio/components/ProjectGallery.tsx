'use client';

import Image from "next/image";
import { useState } from "react";

interface ProjectGalleryProps {
  images: string[];
  alt: string;
  /** "contain" keeps whole phone screens visible; "cover" fills the header. */
  fit?: "cover" | "contain";
}

// Header screenshots for a project card. With more than one image, small
// dot buttons switch between them. Each dot is a 24px target.
export function ProjectGallery({ images, alt, fit = "cover" }: ProjectGalleryProps) {
  const [idx, setIdx] = useState(0);
  const fitClass = fit === "contain" ? "object-contain" : "object-cover object-top";

  return (
    <>
      <Image
        key={images[idx]}
        src={images[idx]}
        alt={`${alt} screenshot ${idx + 1} of ${images.length}`}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className={fitClass}
      />
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-0.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-pressed={i === idx}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span className={`h-2 w-2 rounded-full transition-colors ${i === idx ? "bg-foreground" : "bg-foreground/30 hover:bg-foreground/60"}`} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

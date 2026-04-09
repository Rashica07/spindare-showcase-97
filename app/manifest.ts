import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KIQA DEV",
    short_name: "KIQA DEV",
    description: "Professional mobile app and web development services by Kristian Gjergji.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      { src: "/favicon.ico",         sizes: "any",     type: "image/x-icon" },
      { src: "/icon.png",            sizes: "512x512", type: "image/png"    },
      { src: "/apple-touch-icon.png",sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

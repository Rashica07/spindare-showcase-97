// Share images. /og redirects to one of these at random, picked by weight, so
// link previews vary between platforms and shares. To add or swap one, drop a
// 1200x630 image into public/og/ and list it here; nothing else needs to change.
// A higher weight is picked more often; weight 0 turns an image off, and if
// only one image has weight it is always the one used.
export const OG_IMAGES = [
  { src: "/og/og-1.webp", weight: 2 },
  { src: "/og/og-2.webp", weight: 2 },
  { src: "/og/og-3.webp", weight: 4 }, // the signature card: the favourite
  { src: "/og/og-4.webp", weight: 2 },
] as const;

const fs = require('fs');
const file = 'C:/Users/r-oberti/Documents/GitHub/spindare-showcase-97/artifacts/portfolio/app/portfolio/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const imports = `import spindareFeedImg from "@/public/spindare-feed.webp";
import spindareProfileImg from "@/public/spindare-profile.webp";
import spindareDarkFeedImg from "@/public/spindare-dark-feed.webp";
import spindareChallengeImg from "@/public/spindare-challenge.webp";
import spindareSettingsImg from "@/public/spindare-settings.webp";
import spindareWheelImg from "@/public/spindare-wheel.webp";

import torreGroup1Img from "@/public/torre-group-1.webp";
import torreGroup2Img from "@/public/torre-group-2.webp";
import torreGroup3Img from "@/public/torre-group-3.webp";
import torreGroup4Img from "@/public/torre-group-4.webp";
import torreGroup5Img from "@/public/torre-group-5.webp";

import luxhotel1Img from "@/public/luxhotel-1.webp";
import luxhotel2Img from "@/public/luxhotel-2.webp";
import luxhotel3Img from "@/public/luxhotel-3.webp";
import luxhotel4Img from "@/public/luxhotel-4.webp";

import truckserv1Img from "@/public/truckserv-1.webp";
`;

content = content.replace('function FadeUp', imports + '\nfunction FadeUp');

content = content.replace(/const SPINDARE_SCREENS = \[[\s\S]*?\];/, `const SPINDARE_SCREENS = [
  { id: "feed", name: "Feed", src: spindareFeedImg },
  { id: "profile", name: "Profile Screen", src: spindareProfileImg },
  { id: "notification", name: "Notification Screen", src: spindareDarkFeedImg },
  { id: "challenge", name: "Challenge", src: spindareChallengeImg },
  { id: "settings", name: "Settings", src: spindareSettingsImg },
  { id: "wheel", name: "Wheel", src: spindareWheelImg },
];`);

content = content.replace(/const TORRE_SCREENS = \[[\s\S]*?\];/, `const TORRE_SCREENS = [
  { id: "torre", name: "Torre Group", src: torreGroup1Img },
  { id: "magfa", name: "Magfa Group", src: torreGroup2Img },
  { id: "swisstech", name: "Swisstech", src: torreGroup3Img },
  { id: "umbria", name: "Torre di Umbria", src: torreGroup4Img },
  { id: "home", name: "Torre Home", src: torreGroup5Img },
];`);

content = content.replace(/const LUXHOTEL_SCREENS = \[[\s\S]*?\];/, `const LUXHOTEL_SCREENS = [
  { id: "home", name: "Landing Page", src: luxhotel1Img },
  { id: "features", name: "Features", src: luxhotel2Img },
  { id: "dashboard", name: "Dashboard", src: luxhotel3Img },
  { id: "calendar", name: "Calendar", src: luxhotel4Img },
];`);

content = content.replace(/src="\/truckserv-1.webp"/g, 'src={truckserv1Img}');
content = content.replace(/<Image /g, '<Image placeholder="blur" ');

fs.writeFileSync(file, content, 'utf8');
console.log('Updated portfolio images successfully!');

import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  alternates: { canonical: "https://kiqa-dev.it" },
};

export default function HomePage() {
  return <HomeClient />;
}

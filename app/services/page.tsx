import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Development Services — Mobile Apps & Web",
  alternates: { canonical: "https://kiqa-dev.it/services" },
};

export default function ServicesPage() {
  return <ServicesClient />;
}

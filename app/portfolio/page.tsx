import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio — Projects by Kristian Gjergji",
  alternates: { canonical: "https://kiqa-dev.it/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}

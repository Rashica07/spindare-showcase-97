import { notFound } from "next/navigation";
import { RedesignHome } from "@/components/redesign/RedesignHome";

type Params = { scope: string; accent: string };

// Rendered on demand (no generateStaticParams): prerendered dynamic routes
// can't be served by the Cloudflare/OpenNext deployment (no incremental cache).
export default async function RedesignVariant({ params }: { params: Promise<Params> }) {
  const { scope, accent } = await params;
  if (!/^[123]$/.test(scope) || !/^[123]$/.test(accent)) notFound();
  return <RedesignHome scope={Number(scope) as 1 | 2 | 3} accent={Number(accent) as 1 | 2 | 3} />;
}

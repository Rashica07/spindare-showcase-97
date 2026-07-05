import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">404</p>
        <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you are looking for does not exist.</p>
        <Link href="/" className="inline-flex items-center gap-2 mt-8 text-sm text-primary hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

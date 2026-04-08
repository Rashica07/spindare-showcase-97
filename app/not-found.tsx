import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-inner">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-sub">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}

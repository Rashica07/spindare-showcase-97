import type { Metadata } from "next";
import { ContactResult } from "@/components/ContactResult";

export const metadata: Metadata = {
  title: "Message sent | KIQA DEV",
  robots: { index: false },
};

// Where the no-JavaScript contact form lands after posting to /submit-contact.
export default async function ContactSentPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <ContactResult failed={Boolean(error)} />;
}

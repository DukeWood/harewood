import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <main className="legal-page">
      <div className="legal-card">
        <Link href="/"><ArrowLeft size={16} /> Back to Harewood Village Hall</Link>
        <span className="section-kicker">Privacy</span>
        <h1>Privacy notice</h1>
        <p>This website provides information about Harewood Village Hall and the local area. The Red Kite guide answers from information held within the website and does not send chat messages to an external AI service.</p>
        <h2>Enquiries</h2>
        <p>If you use an email link or the enquiry form, your own email application is used to contact the Hall. The Hall may retain your message and contact details for as long as needed to respond to or manage your enquiry.</p>
        <h2>Cookies and analytics</h2>
        <p>This version of the website does not set advertising cookies or use third-party analytics. Links to external services are governed by those services&apos; own privacy notices.</p>
        <h2>Your questions</h2>
        <p>For privacy questions, email <a href="mailto:hanbury88@btinternet.com">hanbury88@btinternet.com</a>.</p>
        <small>Last updated: 18 July 2026</small>
      </div>
    </main>
  );
}

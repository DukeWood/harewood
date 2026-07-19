import { RedKiteChat } from "./red-kite-chat";
import { BookingCalendar } from "./booking-calendar";
import { EventsExplorer } from "./events-explorer";
import { HallGallery } from "./hall-gallery";
import { NeighbourhoodLife } from "./neighbourhood-life";
import {
  ArrowRight,
  BedDouble,
  BusFront,
  CalendarDays,
  Check,
  Clock3,
  Coffee,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Trees,
  Users,
} from "lucide-react";

const heroImage = "/harewood-village-hall-exterior.jpg";

const localHighlights = [
  {
    icon: Landmark,
    eyebrow: "Visit & discover",
    title: "Harewood House",
    copy: "An 18th-century country house, gardens and parkland — with its full history, including its links to Caribbean slavery, shared by the Trust.",
    href: "https://harewood.org/",
    link: "Plan a visit",
  },
  {
    icon: BedDouble,
    eyebrow: "Stay",
    title: "Harewood Holidays",
    copy: "Characterful self-catering properties across the Harewood Estate, from historic cottages to old hunting lodges — with countryside at the door.",
    href: "https://harewoodholidays.com/",
    link: "Find a place to stay",
  },
  {
    icon: Coffee,
    eyebrow: "Food & drink",
    title: "Muddy Boots Café",
    copy: "A dog-friendly village café and bistro beside the Hall, serving simple home-cooked food with a focus on local suppliers and Estate produce.",
    href: "https://www.harewoodfoodanddrink.com/muddybootscafe",
    link: "Visit Muddy Boots",
  },
  {
    icon: BedDouble,
    eyebrow: "Stay & meet",
    title: "Harewood Arms",
    copy: "A longstanding village hotel and pub offering a convenient local place for overnight stays, food and drinks in the heart of Harewood.",
    href: "https://samuelsmithshotels.co.uk/hotel/harewood-arms/",
    link: "Visit the Harewood Arms",
  },
  {
    icon: Trees,
    eyebrow: "Walks & wildlife",
    title: "Leeds Country Way",
    copy: "The 62-mile circular trail passes through the Harewood landscape. Pick a shorter section and keep an eye on the sky for red kites.",
    href: "https://www.leeds.gov.uk/parks-and-countryside/public-rights-of-way/the-leeds-country-way",
    link: "View the route",
  },
  {
    icon: GraduationCap,
    eyebrow: "Education",
    title: "Gateways School",
    copy: "An independent Harewood school for children aged 2–18, spanning nursery and early years through prep, high school and sixth form.",
    href: "https://www.gatewaysschool.co.uk/",
    link: "Explore Gateways",
  },
  {
    icon: GraduationCap,
    eyebrow: "Village school",
    title: "Harewood CE Primary",
    copy: "The local Church of England primary school, with information for families about admissions, classes, clubs, news and village school life.",
    href: "https://harewood.leeds.sch.uk/",
    link: "Visit the school",
  },
  {
    icon: BusFront,
    eyebrow: "Getting here",
    title: "The 36 bus",
    copy: "Harewood sits on the 36 route between Leeds, Harrogate and Ripon — a practical way to arrive without the car.",
    href: "https://www.transdevbus.co.uk/the-harrogate-bus-company/services/36/",
    link: "Check the timetable",
  },
];

function KiteMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`kite-mark ${small ? "small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <path d="M6 29C22 25 36 11 58 8 48 19 44 30 40 44c-8-6-14-8-20-9 7 6 9 12 8 21-5-12-11-20-22-27Z" />
        <path d="M39 44c5 1 9 4 12 8-6-2-10-1-14 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <div className="topbar">
        <div className="shell topbar-inner">
          <span>Harewood Village Hall · Church Lane · LS17 9LX</span>
          <a href="tel:+447496275356"><Phone size={13} /> 07496 275356</a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell nav-wrap">
          <a className="brand" href="#top" aria-label="Harewood Village Hall home">
            <KiteMark />
            <span><strong>Harewood</strong><small>Village Hall</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#hall">The Hall</a>
            <a href="#booking">Book</a>
            <a href="#events">What&apos;s on</a>
            <a href="#village-life">Village life</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button button-dark nav-cta" href="#hire">Hire the hall <ArrowRight size={16} /></a>
          <details className="mobile-menu">
            <summary aria-label="Open navigation"><Menu /></summary>
            <nav><a href="#hall">The Hall</a><a href="#booking">Book</a><a href="#events">What&apos;s on</a><a href="#village-life">Village life</a><a href="#contact">Contact</a></nav>
          </details>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grain" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-line" /> At the heart of Harewood</span>
            <h1>A space to meet,<br /><em>make & belong.</em></h1>
            <p>From family celebrations to village traditions, Harewood Village Hall is a place for the community to come together.</p>
            <div className="hero-actions">
              <a className="button button-red" href="#hire">Plan your event <ArrowRight size={17} /></a>
              <button className="text-link" data-open-red-kite>Ask Red Kite <Sparkles size={16} /></button>
            </div>
            <div className="hero-trust">
              <span><Check size={15} /> Village setting</span>
              <span><Check size={15} /> Community run</span>
              <span><Check size={15} /> Enquiries welcome</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <img src={heroImage} alt="The stone exterior of Harewood Village Hall on Church Lane" />
            </div>
            <div className="hero-note">
              <KiteMark small />
              <span><strong>Your local hall</strong>Church Lane, Harewood</span>
            </div>
            <div className="hero-stamp"><span>LS17</span><small>Harewood<br />Yorkshire</small></div>
          </div>
        </div>
      </section>

      <section className="intro section" id="hall">
        <div className="shell intro-grid">
          <div>
            <span className="section-kicker">Welcome in</span>
            <h2>A village hall with room for your next chapter.</h2>
          </div>
          <div className="intro-copy">
            <p>The Hall is a flexible community setting for local gatherings, celebrations and shared experiences. Tell us what you have in mind and we&apos;ll help you understand whether the space is right for it.</p>
            <a className="underline-link" href="#gallery">Take a look inside <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="shell value-row">
          <div><Users /><span><strong>Community first</strong><small>A welcoming place for Harewood</small></span></div>
          <div><CalendarDays /><span><strong>Made for moments</strong><small>Gatherings, groups and celebrations</small></span></div>
          <div><HeartHandshake /><span><strong>Powered by people</strong><small>Volunteer and help the Hall thrive</small></span></div>
        </div>
      </section>

      <BookingCalendar />

      <section className="hire section" id="hire">
        <div className="shell hire-grid">
          <div className="hire-photo"><img src="/hall-gallery/06-village-hall-2.jpg" alt="The main interior space at Harewood Village Hall" /></div>
          <div className="hire-card">
            <span className="section-kicker light">Hall hire</span>
            <h2>Make the space yours.</h2>
            <p>Planning a family celebration, community group, class or local event? Speak with Olga about your date, timings and setup.</p>
            <ul>
              <li><Check /> Tell us your preferred date</li>
              <li><Check /> Share your event type and guest numbers</li>
              <li><Check /> Ask about access, layout and availability</li>
            </ul>
            <div className="hire-actions">
              <a className="button button-cream" href="#booking"><CalendarDays size={17} /> Choose a date</a>
              <button className="button button-outline" data-open-red-kite><Sparkles size={17} /> Talk to Red Kite</button>
            </div>
            <small className="fact-note">Hire rates and facilities are confirmed directly for each enquiry.</small>
          </div>
        </div>
      </section>

      <EventsExplorer />

      <HallGallery />

      <NeighbourhoodLife />

      <section className="red-kite-band">
        <div className="shell kite-band-grid">
          <div className="kite-illustration"><KiteMark /></div>
          <div>
            <span className="section-kicker light">Meet your local co-pilot</span>
            <h2>Not sure where to start?<br />Ask Red Kite.</h2>
          </div>
          <div>
            <p>From hall enquiries to walks, buses and local landmarks, Red Kite helps you find the right answer quickly.</p>
            <button className="button button-cream" data-open-red-kite>Ask Red Kite <Sparkles size={17} /></button>
          </div>
        </div>
      </section>

      <section className="discover section" id="harewood">
        <div className="shell section-heading split-heading">
          <div><span className="section-kicker">Beyond the Hall</span><h2>Discover Harewood.</h2></div>
          <p>A North Leeds village shaped by landscape, heritage and community — with Harewood, Wike, Wigton Moor and Slaid Hill forming the wider civil parish.</p>
        </div>
        <div className="shell directory-key"><span>Stay</span><span>Eat</span><span>Learn</span><span>Explore</span><small>Eight useful local links</small></div>
        <div className="shell highlights-grid">
          {localHighlights.map(({ icon: Icon, ...item }, index) => (
            <article className="highlight-card" key={item.title}>
              <span className="highlight-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="highlight-icon"><Icon /></div>
              <span>{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href={item.href} target="_blank" rel="noreferrer">{item.link} <ExternalLink size={15} /></a>
            </article>
          ))}
        </div>
        <div className="shell parish-note">
          <div><span>Harewood Parish</span><strong>Village life, connected.</strong></div>
          <p>The civil parish stretches beyond Harewood village to include Slaid Hill, Wigton Moor and Wike. Parish Council meetings are held locally, including at Harewood Village Hall.</p>
          <a href="https://harewoodparishcouncil.gov.uk/" target="_blank" rel="noreferrer">Visit the Parish Council <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <span className="section-kicker light">Come and say hello</span>
            <h2>Find us in the heart of Harewood.</h2>
            <p>For hall hire, volunteering and general enquiries, contact Olga directly.</p>
            <div className="contact-list">
              <a href="https://maps.google.com/?q=Harewood+Village+Hall+Church+Lane+Leeds+LS17+9LX" target="_blank" rel="noreferrer"><MapPin /><span><strong>Harewood Village Hall</strong><small>Church Lane, Harewood, Leeds LS17 9LX</small></span></a>
              <a href="tel:+447496275356"><Phone /><span><strong>07496 275356</strong><small>Call Olga with your enquiry</small></span></a>
              <a href="mailto:hanbury88@btinternet.com"><Mail /><span><strong>hanbury88@btinternet.com</strong><small>Email the Hall</small></span></a>
            </div>
          </div>
          <form className="enquiry-card" action="mailto:hanbury88@btinternet.com" method="post" encType="text/plain">
            <span className="form-title">Start an enquiry</span>
            <label>Your name<input name="name" required placeholder="e.g. Jane Smith" /></label>
            <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
            <label>What are you planning?<textarea name="message" rows={4} placeholder="Tell us the event, date and approximate guest numbers…" /></label>
            <button className="button button-red" type="submit">Send enquiry <ArrowRight size={17} /></button>
            <small>Your email app will open to send this message.</small>
          </form>
        </div>
      </section>

      <footer>
        <div className="shell footer-main">
          <div className="brand footer-brand"><KiteMark /><span><strong>Harewood</strong><small>Village Hall</small></span></div>
          <p>A space for the community, on Church Lane in Harewood.</p>
          <div className="footer-links"><a href="#hall">The Hall</a><a href="#events">What&apos;s on</a><a href="#harewood">Explore</a><a href="/privacy">Privacy</a></div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Harewood Village Hall</span>
          <span>Community information last reviewed 18 July 2026</span>
        </div>
      </footer>
      <RedKiteChat />
    </main>
  );
}

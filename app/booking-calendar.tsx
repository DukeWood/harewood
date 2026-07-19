"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, ChevronLeft, ChevronRight, Clock3, ExternalLink, Sparkles, Users } from "lucide-react";

type Selected = { date: Date; session: string } | null;

const nearbyEvents = [
  { date: "18 Jul – 6 Sep 2026", title: "Summer at Harewood", place: "Harewood House", href: "https://harewood.org/events/whats-on-at-harewood-this-summer/" },
  { date: "8–9 Aug 2026", title: "VW Festival", place: "Harewood Estate", href: "https://harewood.org/whats-on/" },
  { date: "21–23 Aug 2026", title: "Outdoor cinema weekend", place: "Harewood Estate", href: "https://harewood.org/whats-on/" },
];

const sessions = ["Morning", "Afternoon", "Evening", "All day"];
const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(date);
}

export function BookingCalendar() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Selected>(null);
  const [step, setStep] = useState<"calendar" | "details" | "done">("calendar");
  const [eventType, setEventType] = useState("Family celebration");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const mondayOffset = (first.getDay() + 6) % 7;
    const start = new Date(first);
    start.setDate(first.getDate() - mondayOffset);
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [month]);

  function changeMonth(delta: number) {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  }

  function chooseDay(date: Date) {
    if (date < today || date.getMonth() !== month.getMonth()) return;
    setSelected({ date, session: selected?.session || "" });
  }

  function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const subject = encodeURIComponent(`Hall booking request — ${formatDate(selected.date)}`);
    const body = encodeURIComponent(`Hello Olga,\n\nI would like to enquire about hiring Harewood Village Hall.\n\nDate: ${formatDate(selected.date)}\nSession: ${selected.session}\nEvent: ${eventType}\nApprox. guests: ${guests}\nName: ${name}\nEmail: ${email}\n\nNotes:\n${notes || "None"}\n\nPlease confirm availability, facilities and price.\n`);
    window.location.href = `mailto:hanbury88@btinternet.com?subject=${subject}&body=${body}`;
    setStep("done");
  }

  return (
    <section className="booking section" id="booking">
      <div className="shell section-heading split-heading booking-heading">
        <div><span className="section-kicker">Book the Hall</span><h2>Find a date that works.</h2></div>
        <div className="availability-note"><i /><span><strong>Open to enquiry</strong>Dates require final confirmation by the Hall</span></div>
      </div>

      <div className="shell booking-layout">
        <div className="calendar-card">
          {step === "calendar" && <>
            <div className="calendar-top">
              <div><span className="calendar-label">Availability calendar</span><h3>{month.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</h3></div>
              <div className="calendar-controls"><button onClick={() => changeMonth(-1)} aria-label="Previous month"><ChevronLeft /></button><button onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}>Today</button><button onClick={() => changeMonth(1)} aria-label="Next month"><ChevronRight /></button></div>
            </div>
            <div className="calendar-grid week-row">{week.map((day) => <span key={day}>{day}</span>)}</div>
            <div className="calendar-grid days-grid">
              {days.map((date) => {
                const outside = date.getMonth() !== month.getMonth();
                const past = date < today;
                const chosen = selected && sameDay(selected.date, date);
                return <button key={date.toISOString()} className={`${outside ? "outside" : ""} ${past ? "past" : ""} ${chosen ? "selected" : ""}`} disabled={outside || past} onClick={() => chooseDay(date)}><span>{date.getDate()}</span>{!outside && !past && <i />}{sameDay(date, today) && <small>Today</small>}</button>;
              })}
            </div>
            <div className={`session-picker ${selected ? "visible" : ""}`}>
              <div><Clock3 /><span><strong>{selected ? formatDate(selected.date) : "Choose a date"}</strong><small>Select a preferred session</small></span></div>
              <div className="session-options">{sessions.map((session) => <button key={session} className={selected?.session === session ? "active" : ""} onClick={() => selected && setSelected({ ...selected, session })}>{session}</button>)}</div>
              <button className="button button-red" disabled={!selected?.session} onClick={() => setStep("details")}>Continue <ArrowRight size={17} /></button>
            </div>
          </>}

          {step === "details" && selected && <form className="booking-form" onSubmit={submitRequest}>
            <button type="button" className="back-link" onClick={() => setStep("calendar")}><ArrowLeft size={15} /> Change date</button>
            <div className="booking-summary"><CalendarCheck /><div><span>Booking request for</span><strong>{formatDate(selected.date)}</strong><small>{selected.session} · subject to confirmation</small></div></div>
            <div className="form-two">
              <label>Type of event<select value={eventType} onChange={(e) => setEventType(e.target.value)}><option>Family celebration</option><option>Community event</option><option>Class or group</option><option>Meeting</option><option>Other</option></select></label>
              <label>Approx. guests<input value={guests} onChange={(e) => setGuests(e.target.value)} type="number" min="1" required placeholder="e.g. 40" /></label>
              <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" /></label>
              <label>Email address<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@example.com" /></label>
            </div>
            <label>Anything else we should know?<textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Setup, timings, accessibility or other questions…" /></label>
            <div className="booking-submit"><button className="button button-red" type="submit">Place booking request <ArrowRight size={17} /></button><small>This sends a prepared email to the Hall. Your booking is not confirmed until Olga replies.</small></div>
          </form>}

          {step === "done" && <div className="booking-done"><div><Check /></div><span className="section-kicker">Request prepared</span><h3>Thank you, {name}.</h3><p>Your email app should now be open with all the booking details. Send that message and the Hall will reply to confirm availability and price.</p><div><button className="button button-dark" onClick={() => { setStep("calendar"); setSelected(null); }}>Start another request</button><a className="underline-link" href="tel:+447496275356">Or call Olga: 07496 275356</a></div></div>}
        </div>

        <aside className="events-sidebar">
          <div className="sidebar-title"><span>Coming up nearby</span><small>Verified local listings</small></div>
          {nearbyEvents.map((event) => <a key={event.title} href={event.href} target="_blank" rel="noreferrer" className="mini-event"><time>{event.date}</time><div><strong>{event.title}</strong><span>{event.place}</span></div><ExternalLink size={15} /></a>)}
          <div className="sidebar-divider" />
          <div className="red-kite-help"><Sparkles /><h3>Need help choosing?</h3><p>Tell Red Kite what you&apos;re planning and it will guide you to the right next step.</p><button data-open-red-kite>Talk to Red Kite <ArrowRight size={15} /></button></div>
          <div className="sidebar-fact"><Users /><span><strong>Organising an event?</strong>Share your date, session and approximate guest numbers.</span></div>
        </aside>
      </div>
    </section>
  );
}

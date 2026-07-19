"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock3, List, MapPin, Sparkles } from "lucide-react";
import { july2026Events, june2026Events } from "./events-data";
import type { HallEvent } from "./events-data";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const categories = ["All events", "Class", "Community", "Private hire"] as const;

function dateLabel(day: number, monthIndex: number, weekday = false) {
  return new Intl.DateTimeFormat("en-GB", { weekday: weekday ? "long" : undefined, day: "numeric", month: "long", year: "numeric" }).format(new Date(2026, monthIndex, day));
}

export function EventsExplorer() {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [month, setMonth] = useState<6 | 7>(7);
  const [category, setCategory] = useState<(typeof categories)[number]>("All events");
  const [selected, setSelected] = useState<HallEvent | null>(null);
  const monthConfig = month === 6
    ? { name: "June", short: "JUN", index: 5, days: 30, offset: 0, events: june2026Events }
    : { name: "July", short: "JUL", index: 6, days: 31, offset: 2, events: july2026Events };
  const events = useMemo(() => category === "All events" ? monthConfig.events : monthConfig.events.filter((event) => event.category === category), [category, monthConfig.events]);

  return (
    <section className="events section" id="events">
      <div className="shell section-heading split-heading events-heading">
        <div><span className="section-kicker">What&apos;s on</span><h2>Hall diary.</h2></div>
        <p>Browse the Village Hall&apos;s published June and July 2026 diaries. Switch between the full month and individual event cards.</p>
      </div>

      <div className="shell events-toolbar">
        <div className="month-switch" aria-label="Choose month"><button className={month === 6 ? "active" : ""} onClick={() => { setMonth(6); setSelected(null); }}>June 2026</button><button className={month === 7 ? "active" : ""} onClick={() => { setMonth(7); setSelected(null); }}>July 2026</button></div>
        <div className="view-switch" aria-label="Choose events view">
          <button className={view === "calendar" ? "active" : ""} onClick={() => setView("calendar")}><CalendarDays /> Calendar</button>
          <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><List /> Event cards</button>
        </div>
        <label>Show <select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>

      {view === "calendar" ? (
        <div className="shell events-calendar">
          <header><div><span>Published hall diary</span><h3>{monthConfig.name} 2026</h3></div><small>{events.length} scheduled activities</small></header>
          <div className="events-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="events-month-grid">
            {Array.from({ length: 35 }, (_, index) => {
              const day = index >= monthConfig.offset && index < monthConfig.offset + monthConfig.days ? index - monthConfig.offset + 1 : null;
              const dayEvents = day ? events.filter((event) => event.day === day) : [];
              return <div className={`events-day ${!day ? "empty" : ""}`} key={index}>
                {day && <><time dateTime={`2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`}>{day}</time><div>{dayEvents.map((event) => <button key={event.id} className={`event-chip ${event.category.toLowerCase().replace(" ", "-")}`} onClick={() => setSelected(event)}><strong>{event.title}</strong><span>{event.time}</span></button>)}</div></>}
              </div>;
            })}
          </div>
        </div>
      ) : (
        <div className="shell event-card-grid">
          {events.map((event) => <article className="event-item-card" key={event.id}>
            <div className="event-date-block"><span>{monthConfig.short}</span><strong>{event.day}</strong><small>{dateLabel(event.day, monthConfig.index, true).split(",")[0]}</small></div>
            <div className="event-item-copy"><span className={`event-category ${event.category.toLowerCase().replace(" ", "-")}`}>{event.category}</span><h3>{event.title}</h3><p><Clock3 /> {event.time}</p>{event.room && <p><MapPin /> {event.room}</p>}{event.note && <p>{event.note}</p>}<button onClick={() => setSelected(event)}>View details</button></div>
          </article>)}
        </div>
      )}

      <div className="shell events-source"><span>Source: Harewood Village Hall diaries supplied for June and July 2026. Private bookings are anonymised.</span><a href="#booking">Enquire about another date</a></div>

      {selected && <div className="event-modal-backdrop" onClick={() => setSelected(null)} role="presentation"><article className="event-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="event-dialog-title"><button className="event-modal-close" onClick={() => setSelected(null)} aria-label="Close event details">×</button><span className={`event-category ${selected.category.toLowerCase().replace(" ", "-")}`}>{selected.category}</span><time>{dateLabel(selected.day, monthConfig.index, true)}</time><h3 id="event-dialog-title">{selected.title}</h3><p><Clock3 /> {selected.time}</p>{selected.room && <p><MapPin /> {selected.room}</p>}{selected.note && <p>{selected.note}</p>}<div className="event-modal-actions"><a className="button button-red" href="#booking" onClick={() => setSelected(null)}>Check another date</a><button className="text-link" onClick={() => { setSelected(null); window.setTimeout(() => document.querySelector<HTMLButtonElement>(".chat-launcher")?.click(), 0); }}><Sparkles /> Ask Red Kite</button></div></article></div>}
    </section>
  );
}

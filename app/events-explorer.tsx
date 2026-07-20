"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CalendarRange, ChevronLeft, ChevronRight, Clock3, List, MapPin, Sparkles } from "lucide-react";
import { august2026Events, july2026Events, june2026Events } from "./events-data";
import type { HallEvent } from "./events-data";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const categories = ["All events", "Class", "Community", "Private hire"] as const;
const availableMonths = [6, 7, 8] as const;
type DiaryMonth = (typeof availableMonths)[number];
type DiaryView = "month" | "week" | "list";

function dateLabel(day: number, monthIndex: number, weekday = false) {
  return new Intl.DateTimeFormat("en-GB", { weekday: weekday ? "long" : undefined, day: "numeric", month: "long", year: "numeric" }).format(new Date(2026, monthIndex, day));
}

export function EventsExplorer() {
  const [view, setView] = useState<DiaryView>("month");
  const [month, setMonth] = useState<DiaryMonth>(8);
  const [weekIndex, setWeekIndex] = useState(3);
  const [category, setCategory] = useState<(typeof categories)[number]>("All events");
  const [selected, setSelected] = useState<HallEvent | null>(null);
  const monthConfig = month === 6
    ? { name: "June", short: "JUN", index: 5, days: 30, offset: 0, events: june2026Events }
    : month === 7
      ? { name: "July", short: "JUL", index: 6, days: 31, offset: 2, events: july2026Events }
      : { name: "August", short: "AUG", index: 7, days: 31, offset: 5, events: august2026Events };
  const events = useMemo(() => category === "All events" ? monthConfig.events : monthConfig.events.filter((event) => event.category === category), [category, monthConfig.events]);
  const calendarCells = Math.ceil((monthConfig.offset + monthConfig.days) / 7) * 7;
  const weekCount = calendarCells / 7;
  const weekDays = Array.from({ length: 7 }, (_, index) => weekIndex * 7 - monthConfig.offset + index + 1);
  const visibleWeekDays = weekDays.filter((day) => day >= 1 && day <= monthConfig.days);
  const weekLabel = visibleWeekDays.length
    ? `${visibleWeekDays[0]}–${visibleWeekDays[visibleWeekDays.length - 1]} ${monthConfig.name} 2026`
    : `${monthConfig.name} 2026`;

  function chooseMonth(nextMonth: DiaryMonth, targetWeek = 0) {
    setMonth(nextMonth);
    setWeekIndex(targetWeek);
    setSelected(null);
  }

  function changeMonth(delta: -1 | 1) {
    const current = availableMonths.indexOf(month);
    const next = current + delta;
    if (next < 0 || next >= availableMonths.length) return;
    const nextMonth = availableMonths[next];
    const nextOffset = nextMonth === 6 ? 0 : nextMonth === 7 ? 2 : 5;
    const nextDays = nextMonth === 6 ? 30 : 31;
    const nextWeekCount = Math.ceil((nextOffset + nextDays) / 7);
    chooseMonth(nextMonth, delta === -1 && view === "week" ? nextWeekCount - 1 : 0);
  }

  function changeWeek(delta: -1 | 1) {
    const next = weekIndex + delta;
    if (next >= 0 && next < weekCount) {
      setWeekIndex(next);
      setSelected(null);
      return;
    }
    changeMonth(delta);
  }

  return (
    <section className="events section" id="events">
      <div className="shell section-heading split-heading events-heading">
        <div><span className="section-kicker">What&apos;s on</span><h2>Hall diary.</h2></div>
        <p>Browse the Village Hall&apos;s published June, July and August 2026 diaries by month, week or individual event.</p>
      </div>

      <div className="shell events-toolbar">
        <div className="month-navigator" aria-label="Navigate diary months">
          <button className="month-arrow" onClick={() => changeMonth(-1)} disabled={month === 6} aria-label="Previous month"><ChevronLeft /></button>
          <div className="month-switch" aria-label="Choose month">
            <button className={month === 6 ? "active" : ""} onClick={() => chooseMonth(6)}>June</button>
            <button className={month === 7 ? "active" : ""} onClick={() => chooseMonth(7)}>July</button>
            <button className={month === 8 ? "active" : ""} onClick={() => chooseMonth(8)}>August</button>
          </div>
          <button className="month-arrow" onClick={() => changeMonth(1)} disabled={month === 8} aria-label="Next month"><ChevronRight /></button>
        </div>
        <div className="view-switch" aria-label="Choose events view">
          <button className={view === "month" ? "active" : ""} onClick={() => setView("month")}><CalendarDays /> Month</button>
          <button className={view === "week" ? "active" : ""} onClick={() => setView("week")}><CalendarRange /> Week</button>
          <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><List /> Cards</button>
        </div>
        <label>Show <select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>

      {view === "month" && (
        <div className="shell events-calendar">
          <header><div><span>Published hall diary</span><h3>{monthConfig.name} 2026</h3></div><small>{events.length} scheduled activities</small></header>
          <div className="events-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="events-month-grid">
            {Array.from({ length: calendarCells }, (_, index) => {
              const day = index >= monthConfig.offset && index < monthConfig.offset + monthConfig.days ? index - monthConfig.offset + 1 : null;
              const dayEvents = day ? events.filter((event) => event.day === day) : [];
              return <div className={`events-day ${!day ? "empty" : ""}`} key={index}>
                {day && <><time dateTime={`2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`}>{day}</time><div>{dayEvents.map((event) => <button key={event.id} className={`event-chip ${event.category.toLowerCase().replace(" ", "-")}`} onClick={() => setSelected(event)}><strong>{event.title}</strong><span>{event.time}</span></button>)}</div></>}
              </div>;
            })}
          </div>
        </div>
      )}

      {view === "week" && (
        <div className="shell events-calendar events-week-view">
          <header>
            <div><span>Weekly hall diary</span><h3>{weekLabel}</h3></div>
            <div className="week-controls"><button onClick={() => changeWeek(-1)} disabled={month === 6 && weekIndex === 0} aria-label="Previous week"><ChevronLeft /></button><small>Week {weekIndex + 1} of {weekCount}</small><button onClick={() => changeWeek(1)} disabled={month === 8 && weekIndex === weekCount - 1} aria-label="Next week"><ChevronRight /></button></div>
          </header>
          <div className="events-week-grid">
            {weekDays.map((day, index) => {
              const valid = day >= 1 && day <= monthConfig.days;
              const dayEvents = valid ? events.filter((event) => event.day === day) : [];
              return <article className={`week-day-column ${!valid ? "empty" : ""}`} key={`${month}-${weekIndex}-${index}`}>
                <header><span>{weekdays[index]}</span>{valid ? <><strong>{day}</strong><small>{monthConfig.short}</small></> : <strong>—</strong>}</header>
                <div>{dayEvents.map((event) => <button key={event.id} className={`week-event ${event.category.toLowerCase().replace(" ", "-")}`} onClick={() => setSelected(event)}><span>{event.time}</span><strong>{event.title}</strong>{event.room && <small>{event.room}</small>}</button>)}{valid && dayEvents.length === 0 && <p>No published events</p>}</div>
              </article>;
            })}
          </div>
        </div>
      )}

      {view === "list" && (
        <div className="shell event-card-grid">
          {events.map((event) => <article className="event-item-card" key={event.id}>
            <div className="event-date-block"><span>{monthConfig.short}</span><strong>{event.day}</strong><small>{dateLabel(event.day, monthConfig.index, true).split(",")[0]}</small></div>
            <div className="event-item-copy"><span className={`event-category ${event.category.toLowerCase().replace(" ", "-")}`}>{event.category}</span><h3>{event.title}</h3><p><Clock3 /> {event.time}</p>{event.room && <p><MapPin /> {event.room}</p>}{event.note && <p>{event.note}</p>}<button onClick={() => setSelected(event)}>View details</button></div>
          </article>)}
        </div>
      )}

      <div className="shell events-source"><span>Source: Harewood Village Hall diaries supplied for June, July and August 2026. Private bookings are anonymised.</span><a href="#booking">Enquire about another date</a></div>

      {selected && <div className="event-modal-backdrop" onClick={() => setSelected(null)} role="presentation"><article className="event-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="event-dialog-title"><button className="event-modal-close" onClick={() => setSelected(null)} aria-label="Close event details">×</button><span className={`event-category ${selected.category.toLowerCase().replace(" ", "-")}`}>{selected.category}</span><time>{dateLabel(selected.day, monthConfig.index, true)}</time><h3 id="event-dialog-title">{selected.title}</h3><p><Clock3 /> {selected.time}</p>{selected.room && <p><MapPin /> {selected.room}</p>}{selected.note && <p>{selected.note}</p>}<div className="event-modal-actions"><a className="button button-red" href="#booking" onClick={() => setSelected(null)}>Check another date</a><button className="text-link" onClick={() => { setSelected(null); window.setTimeout(() => document.querySelector<HTMLButtonElement>(".chat-launcher")?.click(), 0); }}><Sparkles /> Ask Red Kite</button></div></article></div>}
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, ExternalLink, MapPin, MessageCircle, Phone, Sparkles, X } from "lucide-react";

type Message = { role: "bot" | "user"; text: string; link?: { label: string; href: string } };

const prompts = ["How do I hire the Hall?", "What’s village life like?", "What can I do nearby?", "How do I get here?"];

function answerFor(input: string): Message {
  const q = input.toLowerCase();
  if (/(hire|book|party|wedding|birthday|availability|price|cost)/.test(q)) {
    return { role: "bot", text: "You can choose a date and session in the booking calendar, then send the Hall your event details. Dates are open to enquiry until Olga confirms availability, facilities and price.", link: { label: "Open booking calendar", href: "#booking" } };
  }
  if (/(bus|travel|transport|leeds|harrogate|get here|directions|parking)/.test(q)) {
    return { role: "bot", text: "The Hall is on Church Lane, Harewood, Leeds LS17 9LX. Harewood is served by the 36 bus between Leeds, Harrogate and Ripon. Please check the live timetable before travelling.", link: { label: "View route 36", href: "https://www.transdevbus.co.uk/the-harrogate-bus-company/services/36/" } };
  }
  if (/(stay|hotel|holiday|cottage|accommodation|harewood arms)/.test(q)) {
    return { role: "bot", text: "For a local stay, Harewood Holidays offers self-catering properties across the Estate, while the Harewood Arms is the village hotel and pub. Both are listed in the Discover Harewood directory.", link: { label: "Find local places to stay", href: "#harewood" } };
  }
  if (/(cafe|coffee|food|drink|muddy boots|pub|bistro)/.test(q)) {
    return { role: "bot", text: "Muddy Boots Café and Bistro sits beside the Village Hall and focuses on locally sourced, home-cooked food. The Harewood Arms is another longstanding village place for food and drinks.", link: { label: "Explore food and drink", href: "#harewood" } };
  }
  if (/(school|education|gateways|primary|nursery|sixth form)/.test(q)) {
    return { role: "bot", text: "Harewood has two local schools: Harewood Church of England Primary School and Gateways School, an independent school for ages 2–18. Their official websites are linked in the local directory.", link: { label: "View local schools", href: "#harewood" } };
  }
  if (/(walk|kite|nature|outdoor|nearby|things to do|visit)/.test(q)) {
    return { role: "bot", text: "Nearby highlights include Harewood House and its gardens, plus walking sections of the Leeds Country Way through the Harewood landscape. Red kites are a familiar sight overhead — that’s where I get my name.", link: { label: "Explore the walking route", href: "https://www.leeds.gov.uk/parks-and-countryside/public-rights-of-way/the-leeds-country-way" } };
  }
  if (/(history|harewood house|slavery|heritage)/.test(q)) {
    return { role: "bot", text: "Harewood House was built in the 18th century and is known for its architecture, collections and landscape. Its history is also inseparable from wealth made through Caribbean sugar plantations and the exploitation of enslaved people — a legacy the Harewood House Trust now addresses openly.", link: { label: "Read the full history", href: "https://harewood.org/about/legacy-of-the-caribbean/" } };
  }
  if (/(parish|wike|wigton|slaid|neighbourhood|council)/.test(q)) {
    return { role: "bot", text: "The wider civil parish includes Harewood, Slaid Hill, Wigton Moor and Wike. Harewood Parish Council meets regularly at local venues, including the Village Hall.", link: { label: "Parish Council", href: "https://harewoodparishcouncil.gov.uk/" } };
  }
  if (/(village life|lifestyle|community life|living|live here|what.s it like)/.test(q)) {
    return { role: "bot", text: "Life in Harewood brings together a close village community, open countryside, red kites, local walks, play spaces and nearby places to meet. The Village Hall sits at the heart of that life, hosting classes, celebrations and community events.", link: { label: "See life in Harewood", href: "#village-life" } };
  }
  if (/(event|class|what's on|whats on|pantomime|ceilidh)/.test(q)) {
    return { role: "bot", text: "The June and July 2026 Hall diaries include weekly dance, drama, Pilates, Tai Chi and martial arts sessions. July also features Wine and Cheese at HVH, Harewood Year 6 Leavers and a Harewood PCC Meeting. Browse every date in calendar or event-card view.", link: { label: "View the Hall diary", href: "#events" } };
  }
  if (/(volunteer|help|involved)/.test(q)) {
    return { role: "bot", text: "The Hall is always looking for volunteers to help bring its community vision to life. Contact Olga and share how you would like to help — they’ll find a role that suits you.", link: { label: "Email the Hall", href: "mailto:hanbury88@btinternet.com" } };
  }
  if (/(contact|phone|email|olga)/.test(q)) {
    return { role: "bot", text: "You can reach Olga on 07496 275356 or email hanbury88@btinternet.com. The Hall is at Church Lane, Harewood, Leeds LS17 9LX.", link: { label: "Get directions", href: "https://maps.google.com/?q=Harewood+Village+Hall+Church+Lane+Leeds+LS17+9LX" } };
  }
  return { role: "bot", text: "I can help with Hall hire, contact details, getting here, local walks, Harewood history, parish neighbourhoods and what’s on nearby. Try asking one of those — or call Olga on 07496 275356 for a specific Hall question." };
}

export function RedKiteChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I’m Red Kite, your Harewood co-pilot. Ask me about the Hall, village life or planning a visit." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlers = [...document.querySelectorAll<HTMLElement>("[data-open-red-kite]")];
    const show = () => setOpen(true);
    handlers.forEach((el) => el.addEventListener("click", show));
    return () => handlers.forEach((el) => el.removeEventListener("click", show));
  }, []);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, typing]);

  function send(text = input) {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, answerFor(clean)]);
      setTyping(false);
    }, 550);
  }

  return (
    <>
      <button className={`chat-launcher ${open ? "hidden" : ""}`} onClick={() => setOpen(true)} aria-label="Ask Red Kite">
        <span><Bot size={20} /></span><strong>Ask Red Kite</strong><Sparkles size={15} />
      </button>
      <aside className={`chat-panel ${open ? "open" : ""}`} aria-hidden={!open} aria-label="Red Kite local guide">
        <header className="chat-header">
          <div className="chat-avatar"><Bot /></div>
          <div><strong>Red Kite</strong><span><i /> Harewood co-pilot</span></div>
          <button onClick={() => setOpen(false)} aria-label="Close Red Kite"><X /></button>
        </header>
        <div className="chat-context"><MapPin size={14} /> Grounded in Harewood&apos;s local information</div>
        <div className="chat-messages">
          {messages.map((message, i) => (
            <div className={`message ${message.role}`} key={`${message.text}-${i}`}>
              <p>{message.text}</p>
              {message.link && <a href={message.link.href} target={message.link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={() => message.link?.href.startsWith("#") && setOpen(false)}>{message.link.label} <ExternalLink size={13} /></a>}
            </div>
          ))}
          {typing && <div className="message bot typing"><span /><span /><span /></div>}
          <div ref={endRef} />
        </div>
        {messages.length < 3 && <div className="chat-prompts">{prompts.map((p) => <button key={p} onClick={() => send(p)}>{p}</button>)}</div>}
        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Harewood…" aria-label="Message Red Kite" />
          <button type="submit" disabled={!input.trim() || typing} aria-label="Send message"><ArrowUp /></button>
        </form>
        <div className="chat-disclaimer"><MessageCircle size={12} /> Local guide, not an emergency service</div>
      </aside>
    </>
  );
}

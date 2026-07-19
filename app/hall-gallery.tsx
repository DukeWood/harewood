"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const galleryImages = [
  {
    src: "/hall-gallery/04-village-hall-3.jpg",
    title: "The Main Hall",
    note: "An open, adaptable floor with its own stage.",
    alt: "Harewood Village Hall main hall and stage",
  },
  {
    src: "/hall-gallery/01-village-hall-8.jpg",
    title: "The Kitchen",
    note: "A practical space for refreshments and event preparation.",
    alt: "Kitchen facilities inside Harewood Village Hall",
  },
  {
    src: "/hall-gallery/03-village-hall-9.jpg",
    title: "Flexible Studio",
    note: "Room to teach, rehearse, meet or make.",
    alt: "Flexible mirrored room inside Harewood Village Hall",
  },
  {
    src: "/hall-gallery/02-village-hall-5.jpg",
    title: "Hall Heritage",
    note: "A village landmark with stories in its walls.",
    alt: "Heritage display inside Harewood Village Hall",
  },
  {
    src: "/hall-gallery/06-village-hall-2.jpg",
    title: "Room to Gather",
    note: "A warm backdrop for groups and celebrations.",
    alt: "Interior room at Harewood Village Hall",
  },
  {
    src: "/hall-gallery/07-village-hall-12.jpg",
    title: "Kitchen Facilities",
    note: "A second view of the practical preparation space.",
    alt: "Kitchen worktops and cupboards at Harewood Village Hall",
  },
  {
    src: "/hall-gallery/08-village-hall-11.jpg",
    title: "The Stage",
    note: "A focal point for performances, speeches and community events.",
    alt: "Stage and wooden floor inside Harewood Village Hall",
  },
];

export function HallGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") setSelected((current) => current === null ? null : (current + galleryImages.length - 1) % galleryImages.length);
      if (event.key === "ArrowRight") setSelected((current) => current === null ? null : (current + 1) % galleryImages.length);
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", close);
    };
  }, [selected]);

  function move(delta: number) {
    setSelected((current) => current === null ? null : (current + delta + galleryImages.length) % galleryImages.length);
  }

  return (
    <section className="gallery-showcase section" id="gallery">
      <div className="shell gallery-story">
        <div className="gallery-story-title">
          <span className="section-kicker light">Step inside</span>
          <h2>See the space.<br /><em>Picture your day.</em></h2>
        </div>
        <div className="gallery-story-copy">
          <p>From the light-filled Main Hall and stage to the kitchen and flexible studio, there is room here for classes, meetings, celebrations and village life.</p>
          <div className="gallery-features"><span>Main Hall</span><span>Stage</span><span>Kitchen</span><span>Flexible rooms</span></div>
          <a href="#booking">Explore a date <ArrowRight /></a>
        </div>
      </div>

      <div className="shell gallery-editorial">
        {galleryImages.map((image, index) => (
          <button className={`gallery-tile gallery-tile-${index + 1}`} key={image.src} onClick={() => setSelected(index)} aria-label={`View ${image.title}`}>
            <img src={image.src} alt={image.alt} loading={index > 1 ? "lazy" : undefined} />
            <span className="gallery-shade" />
            <span className="gallery-number">0{index + 1}</span>
            <span className="gallery-caption"><strong>{image.title}</strong><small>{image.note}</small></span>
            <span className="gallery-expand"><Maximize2 /></span>
          </button>
        ))}
      </div>

      <div className="shell gallery-invite">
        <div><CalendarDays /><span><small>Planning something?</small><strong>Come and see how the Hall could work for you.</strong></span></div>
        <a className="button button-red" href="#booking">Check dates <ArrowRight /></a>
      </div>

      {selected !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={galleryImages[selected].title} onClick={() => setSelected(null)}>
          <button className="gallery-lightbox-close" onClick={() => setSelected(null)} aria-label="Close gallery"><X /></button>
          <button className="gallery-lightbox-prev" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous photograph"><ChevronLeft /></button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={galleryImages[selected].src} alt={galleryImages[selected].alt} />
            <figcaption><span>0{selected + 1} / 0{galleryImages.length}</span><div><strong>{galleryImages[selected].title}</strong><small>{galleryImages[selected].note}</small></div></figcaption>
          </figure>
          <button className="gallery-lightbox-next" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next photograph"><ChevronRight /></button>
        </div>
      )}
    </section>
  );
}

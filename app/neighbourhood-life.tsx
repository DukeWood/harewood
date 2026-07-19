import { ArrowRight, CalendarDays, Coffee, MapPin, Trees, Users } from "lucide-react";

const stories = [
  {
    image: "/neighbourhood/red-kite.webp",
    icon: Trees,
    kicker: "Landscape & wildlife",
    title: "Look up. Slow down.",
    copy: "Red kites, open skies, woodland colour and quiet water are part of the everyday backdrop here.",
  },
  {
    image: "/neighbourhood/harewood-lake.webp",
    icon: MapPin,
    kicker: "Out and about",
    title: "A landscape to explore.",
    copy: "Follow a local path, spend time by the water or make Harewood the starting point for a North Leeds day out.",
  },
  {
    image: "/neighbourhood/local-pub.webp",
    icon: Coffee,
    kicker: "Places nearby",
    title: "Good places to pause.",
    copy: "Local cafés, pubs, heritage and useful village stops make it easy to meet, linger and feel at home.",
  },
];

const postcards = [
  { image: "/neighbourhood/country-lane.webp", label: "Country lanes" },
  { image: "/neighbourhood/harewood-house-gardens.webp", label: "Heritage nearby" },
  { image: "/neighbourhood/woodland-waterfall.webp", label: "Hidden corners" },
  { image: "/neighbourhood/deer-in-bluebells.webp", label: "Wild encounters" },
  { image: "/neighbourhood/local-farm-shop.webp", label: "Local stops" },
  { image: "/neighbourhood/outdoor-table.webp", label: "Gathering outdoors" },
];

export function NeighbourhoodLife() {
  return (
    <section className="neighbourhood section" id="village-life">
      <div className="shell neighbourhood-heading">
        <div>
          <span className="section-kicker">Life in Harewood</span>
          <h2>More than a place.<br /><em>A way of life.</em></h2>
        </div>
        <div>
          <p>Harewood is shaped by the people who live here, the landscape around us and the places that bring neighbours together. This is village life as it is lived: local, welcoming and close to nature.</p>
          <a href="#harewood">Explore the neighbourhood <ArrowRight /></a>
        </div>
      </div>

      <div className="shell life-mosaic">
        <figure className="life-mosaic-main">
          <img src="/neighbourhood/evening-over-harewood.webp" alt="Sunset over the Harewood landscape" />
          <figcaption><span>Evening light</span><strong>Home, on the horizon.</strong></figcaption>
        </figure>
        <figure className="life-mosaic-play">
          <img src="/neighbourhood/village-playground.webp" alt="Families enjoying the village playground" />
          <figcaption><Users /><span><small>Everyday life</small><strong>Room to play</strong></span></figcaption>
        </figure>
        <figure className="life-mosaic-gather">
          <img src="/neighbourhood/woodland-gathering.webp" alt="A community gathering beneath trees near Harewood" />
          <figcaption><span><small>Together here</small><strong>Moments shared</strong></span></figcaption>
        </figure>
      </div>

      <div className="shell life-stories">
        {stories.map(({ icon: Icon, ...story }) => (
          <article className="life-story" key={story.title}>
            <div className="life-story-image"><img src={story.image} alt={story.title} loading="lazy" /><span><Icon /></span></div>
            <div><small>{story.kicker}</small><h3>{story.title}</h3><p>{story.copy}</p></div>
          </article>
        ))}
      </div>

      <div className="life-postcard-wrap">
        <div className="shell life-postcard-head"><span>Around the neighbourhood</span><small>Scenes supplied by the Harewood Village Hall team</small></div>
        <div className="life-postcards">
          {postcards.map((postcard) => <figure key={postcard.image}><img src={postcard.image} alt={postcard.label} loading="lazy" /><figcaption>{postcard.label}</figcaption></figure>)}
        </div>
      </div>

      <div className="shell life-hall-callout">
        <div className="life-callout-image"><img src="/harewood-village-hall-exterior.jpg" alt="Harewood Village Hall exterior" /></div>
        <div className="life-callout-copy">
          <span className="section-kicker light">The heart of village life</span>
          <h3>Make the Hall part of your story.</h3>
          <p>For family celebrations, classes, meetings and community events, the Village Hall remains a place where Harewood comes together.</p>
          <div><a className="button button-cream" href="#booking"><CalendarDays /> Check Hall availability</a><a href="#gallery">Look inside <ArrowRight /></a></div>
        </div>
      </div>
    </section>
  );
}

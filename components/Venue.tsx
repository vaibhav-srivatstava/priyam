import { wedding } from "@/data/wedding";
import Ornament from "./Ornament";

export default function Venue() {
  const { name, address, city, note } = wedding.venue;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name}, ${address}`,
  )}`;

  return (
    <section className="venue block" aria-labelledby="venue-title">
      <div className="wrap">
        <h2 className="h2" id="venue-title">
          Where to find us
        </h2>
        <Ornament />
        <p className="venue-name">{name}</p>
        <p className="venue-address">
          {address}
          <br />
          {city}
        </p>
        <p className="venue-note">{note}</p>
        <a
          className="btn btn-gold"
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>
      </div>
    </section>
  );
}

import { wedding } from "@/data/wedding";
import Diya from "./Diya";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="diyas" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Diya key={i} delay={i * 0.35} />
        ))}
      </div>
      <p className="footer-names">
        {wedding.partner1} &amp; {wedding.partner2}
      </p>
      <p>{wedding.displayDate}</p>
      <p className="footer-blessing">We look forward to celebrating with you.</p>
      <p className="footer-contacts">
        Questions? Call{" "}
        {wedding.contacts.map((c, i) => (
          <span key={c.name}>
            {i > 0 && " or "}
            {c.name} on{" "}
            <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
          </span>
        ))}
        .
      </p>
    </footer>
  );
}

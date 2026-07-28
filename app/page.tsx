"use client";

import { FormEvent, useState } from "react";

type EventName = "view_item" | "generate_lead" | "sign_up" | "purchase";

const eventLabels: Record<EventName, string> = {
  view_item: "Service viewed",
  generate_lead: "Consultation requested",
  sign_up: "Newsletter signup",
  purchase: "Starter package purchased",
};

export default function Home() {
  const [events, setEvents] = useState<EventName[]>([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Explore the page to create your first practice events.");

  function track(event: EventName) {
    setEvents((current) => [event, ...current]);
    setMessage(`${eventLabels[event]} recorded in the practice tracker.`);
    window.gtag?.("event", event, {
      project_name: "Project Yaseen",
      simulation: true,
    });
  }

  function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Enter an email address to simulate a signup.");
      return;
    }
    track("sign_up");
    setEmail("");
  }

  return (
    <main>
      <section className="hero">
        <nav aria-label="Main navigation">
          <span className="brand">Yaseen Studio</span>
          <a href="#practice">Analytics practice</a>
        </nav>
        <div className="hero-copy">
          <p className="eyebrow">Project Yaseen · Analytics simulation</p>
          <h1>Practice tracking actions that feel like a real website.</h1>
          <p className="lede">Use this simple service site to learn how visitors move from interest to signup and purchase.</p>
          <a className="button primary" href="#practice" onClick={() => track("generate_lead")}>Book a free consultation</a>
        </div>
      </section>

      <section id="practice" className="practice" aria-labelledby="practice-title">
        <div>
          <p className="eyebrow">Practice area</p>
          <h2 id="practice-title">Create useful analytics events</h2>
          <p>Each interaction below records an event in the on-page log. When you add your Google Analytics measurement ID, the same events will be sent there too.</p>
        </div>
        <div className="cards">
          <article>
            <span>01</span>
            <h3>Explore a service</h3>
            <p>Simulate a visitor checking out what you offer.</p>
            <button onClick={() => track("view_item")}>View branding service</button>
          </article>
          <article>
            <span>02</span>
            <h3>Join the list</h3>
            <p>Simulate a visitor becoming a potential customer.</p>
            <form onSubmit={subscribe}>
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              <button type="submit">Subscribe</button>
            </form>
          </article>
          <article>
            <span>03</span>
            <h3>Complete a purchase</h3>
            <p>Simulate the final conversion event.</p>
            <button onClick={() => track("purchase")}>Buy starter package · $49</button>
          </article>
        </div>
      </section>

      <section className="tracker" aria-live="polite">
        <div>
          <p className="eyebrow">Live practice tracker</p>
          <h2>{events.length} event{events.length === 1 ? "" : "s"} recorded</h2>
          <p>{message}</p>
        </div>
        <ol>
          {events.length === 0 ? <li>Waiting for your first action.</li> : events.map((event, i) => <li key={`${event}-${i}`}>{eventLabels[event]} <code>{event}</code></li>)}
        </ol>
      </section>
    </main>
  );
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

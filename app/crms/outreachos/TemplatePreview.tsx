"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { touches, tracks } from "./outreach-data";
import styles from "./outreach.module.css";

function sampleBody(touch: (typeof touches)[number]["id"], track: (typeof tracks)[number]) {
  switch (touch) {
    case "T1":
      return `I’m reaching out about ${track.role} opportunities at Juniper Studio. ${track.proof} Would a short call be useful, or is there someone else I should write to?`;
    case "T2A":
      return "Happy to walk through one of the projects from my note. Fifteen minutes would be enough to show the problem, what shipped and what I’d change next.";
    case "T2B":
      return `Following up on my note about ${track.role} opportunities. A quick yes, no or a pointer to the right person would help.`;
    case "T3":
      return "I’ve written up two of the projects I mentioned, including the design decisions and what I learned. I thought they might be useful to the team.";
    case "T4":
      return "I’ll close the loop here. If a relevant role comes up later, my portfolio will still be available. Thanks for taking a look.";
  }
}

export default function TemplatePreview() {
  const [trackIndex, setTrackIndex] = useState(2);
  const [touchIndex, setTouchIndex] = useState(0);
  const track = tracks[trackIndex];
  const touch = touches[touchIndex];

  return (
    <div className={styles.preview}>
      <div className={styles.panelBar}>
        <span><Mail size={15} aria-hidden /> Template preview</span>
        <span>Fictional example</span>
      </div>
      <div className={styles.previewControls}>
        <label htmlFor="oos-track">Role track</label>
        <select id="oos-track" value={trackIndex} onChange={(event) => setTrackIndex(Number(event.target.value))}>
          {tracks.map(({ name }, index) => <option value={index} key={name}>{name}</option>)}
        </select>
        <div className={styles.touchButtons} role="group" aria-label="Sequence touch">
          {touches.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-label={`${item.id} · ${item.name}`}
              aria-pressed={index === touchIndex}
              data-tone={item.tone}
              onClick={() => setTouchIndex(index)}
            >
              {item.id}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.email} aria-live="polite">
        <p className={styles.emailSubject}>{touch.id === "T1" ? "" : "Re: "}{track.role} · Suman Debnath</p>
        <p>Hi Maya,</p>
        <p>{sampleBody(touch.id, track)}</p>
        <p>Thanks,<br />Suman</p>
      </div>
    </div>
  );
}

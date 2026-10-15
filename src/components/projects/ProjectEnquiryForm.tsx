"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { publicSite } from "@/lib/publicSite";

interface ProjectEnquiryFormProps {
  projectId?: string;
  projectName?: string;
  developerId?: string;
  initialInterestType?: string;
  selectedProjects?: { id: string; name: string }[];
  initialMessage?: string;
}
const interests = [
  ["general_advisory", "General property enquiry"],
  ["land_sourcing", "Land & property sourcing"],
  ["construction_support", "Construction & project management"],
  ["property_management", "Property management"],
  ["project_due_diligence", "Document review coordination"],
  ["nri_advisory", "NRI property support"],
  ["project_comparison", "Compare selected properties"],
  ["site_visit_support", "Request a site visit"],
  ["apartment_enquiry", "Apartment enquiry"],
  ["plot_enquiry", "Plot enquiry"],
  ["villa_enquiry", "Villa enquiry"],
  ["farmland_enquiry", "Land-use enquiry"],
  ["channel_partner", "Channel partner enquiry"],
  ["landowner_developer", "Landowner / developer collaboration"],
  ["apartment_feasibility_review", "Apartment feasibility discussion"],
  ["layout_feasibility_review", "Layout feasibility discussion"],
] as const;

export function ProjectEnquiryForm({
  projectId,
  projectName,
  initialInterestType = "general_advisory",
  selectedProjects = [],
  initialMessage = "",
}: ProjectEnquiryFormProps) {
  const uid = useId();
  const draftRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("phone");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState(
    interests.some((item) => item[0] === initialInterestType)
      ? initialInterestType
      : "general_advisory",
  );
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState(initialMessage.slice(0, 4000));
  const [prepared, setPrepared] = useState(false);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const serviceLabel =
    interests.find((item) => item[0] === interest)?.[1] ||
    "General property enquiry";
  const projectNames = selectedProjects.length
    ? selectedProjects.map((item) => `${item.name} (reference: ${item.id})`)
    : projectName
      ? [projectId ? `${projectName} (reference: ${projectId})` : projectName]
      : [];
  const draft = [
    "Hello MS LEGACY,",
    "",
    `Name: ${name.trim()}`,
    `Contact preference: ${channel}`,
    `Contact: ${contact.trim()}`,
    `Support needed: ${serviceLabel}`,
    projectNames.length
      ? `Properties to discuss (information subject to confirmation): ${projectNames.join("; ")}`
      : "",
    location.trim() ? `Location: ${location.trim()}` : "",
    budget.trim() ? `Budget / scope: ${budget.trim()}` : "",
    message.trim() ? `Message: ${message.trim()}` : "",
    "",
    "Please contact me about this enquiry.",
  ]
    .filter((line) => line !== "")
    .join("\n");
  useEffect(() => {
    if (prepared) draftRef.current?.focus();
  }, [prepared]);
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");
    if (channel !== "email" && contact.replace(/\D/g, "").length < 8) {
      setError(
        "Please enter a phone number with at least 8 digits, including the country code where needed.",
      );
      return;
    }
    setPrepared(true);
  }
  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopyStatus("Enquiry text copied. You can paste it into your message.");
    } catch {
      setCopyStatus(
        "Copy was unavailable. Select and copy the enquiry text below.",
      );
    }
  }
  return (
    <div className="site-enquiry-card">
      <p className="site-eyebrow site-eyebrow-dark">Your requirement</p>
      <h2>Let’s start with the essentials.</h2>
      <p className="site-copy">
        Prepare an enquiry, review it, then send it in your email or WhatsApp
        app. You can also{" "}
        <a href={publicSite.phoneHref}>call {publicSite.phone}</a>.
      </p>
      {projectNames.length > 0 && (
        <div className="site-note">
          <h3>Properties you selected</h3>
          <ul>
            {projectNames.map((item, i) => (
              <li key={`${i}-${item}`}>{item}</li>
            ))}
          </ul>
          <p className="site-caption">
            Research information needs confirmation; selection does not reserve
            a property.
          </p>
        </div>
      )}
      <form
        onSubmit={prepare}
        onChange={() => {
          setPrepared(false);
          setError("");
        }}
        className="site-enquiry-form"
      >
        <div>
          <label htmlFor={`${uid}-name`}>
            Your name <span>(required)</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="site-form-grid">
          <div>
            <label htmlFor={`${uid}-channel`}>
              Preferred contact <span>(required)</span>
            </label>
            <select
              id={`${uid}-channel`}
              value={channel}
              onChange={(event) => {
                setChannel(event.target.value);
                setContact("");
              }}
            >
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div>
            <label htmlFor={`${uid}-contact`}>
              {channel === "email"
                ? "Email address"
                : "Phone / WhatsApp number"}{" "}
              <span>(required)</span>
            </label>
            <input
              id={`${uid}-contact`}
              name={channel === "email" ? "email" : "tel"}
              type={channel === "email" ? "email" : "tel"}
              autoComplete={channel === "email" ? "email" : "tel"}
              required
              maxLength={150}
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              aria-describedby={error ? `${uid}-error` : undefined}
              aria-invalid={error ? true : undefined}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-interest`}>
            What help do you need? <span>(required)</span>
          </label>
          <select
            id={`${uid}-interest`}
            name="service"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
          >
            {interests.map((item) => (
              <option key={item[0]} value={item[0]}>
                {item[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="site-form-grid">
          <div>
            <label htmlFor={`${uid}-location`}>
              Property location <span>(optional)</span>
            </label>
            <input
              id={`${uid}-location`}
              maxLength={160}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-budget`}>
              Budget or scope <span>(optional)</span>
            </label>
            <input
              id={`${uid}-budget`}
              maxLength={160}
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-message`}>
            Anything else we should know? <span>(optional)</span>
          </label>
          <textarea
            id={`${uid}-message`}
            rows={4}
            maxLength={4000}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            aria-describedby={`${uid}-privacy`}
          />
        </div>
        <p id={`${uid}-privacy`} className="site-caption">
          Please leave out identity numbers, bank details and confidential
          documents. Details stay in this form until you choose a messaging app.
          Read our <Link href="/privacy">privacy notice</Link>.
        </p>
        <label className="site-checkbox-label">
          <input type="checkbox" required />
          <span>I want MS LEGACY to contact me about this enquiry.</span>
        </label>
        {error && (
          <p id={`${uid}-error`} role="alert" className="site-form-error">
            {error}
          </p>
        )}
        <button className="site-button" type="submit">
          Review my enquiry →
        </button>
      </form>
      {prepared && (
        <section
          className="site-draft"
          ref={draftRef}
          tabIndex={-1}
          aria-label="Review and send your enquiry"
        >
          <h3>Your enquiry draft is ready.</h3>
          <p>
            Nothing has been sent. Choose an app below, then send your message
            there. An appointment or property availability is confirmed
            separately by the team.
          </p>
          <pre>{draft}</pre>
          <div className="site-actions">
            <a
              className="site-button"
              href={`mailto:${publicSite.email}?subject=${encodeURIComponent(`MS LEGACY enquiry: ${serviceLabel}`)}&body=${encodeURIComponent(draft)}`}
            >
              Open email draft
            </a>
            <a
              className="site-button site-button-outline"
              href={`${publicSite.whatsapp}?text=${encodeURIComponent(draft)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp draft
            </a>
            <button
              className="site-text-link"
              type="button"
              onClick={copyDraft}
            >
              Copy enquiry text
            </button>
          </div>
          <p role="status" className="site-caption">
            {copyStatus}
          </p>
        </section>
      )}
    </div>
  );
}

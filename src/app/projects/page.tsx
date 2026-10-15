"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "@/lib/developers/projects";
import type { DeveloperProject } from "@/lib/types/developerMarketplace";
import { isPublicProject, isResearchProject } from "@/lib/projectPresentation";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PublicIntro, PublicCTA } from "@/components/public/PublicComponents";
export default function ProjectsPage() {
  const [projects, setProjects] = useState<DeveloperProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [city, setCity] = useState("all");
  const [compare, setCompare] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    let active = true;
    getProjects()
      .then((items) => {
        if (active) setProjects(items.filter(isPublicProject));
      })
      .catch(() => {
        if (active) setUnavailable(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const filtered = projects.filter(
    (project) =>
      (type === "all" || project.projectType === type) &&
      (city === "all" || project.city === city) &&
      `${project.name} ${project.locality || ""} ${project.city || ""}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  const cities = [
    ...new Set(
      projects
        .map((item) => item.city)
        .filter((value): value is string => Boolean(value)),
    ),
  ].sort();
  function toggle(id: string) {
    setNotice("");
    if (compare.includes(id)) {
      setCompare((items) => items.filter((item) => item !== id));
    } else if (compare.length < 3) {
      setCompare((items) => [...items, id]);
    } else {
      setNotice(
        "You can compare up to three properties. Remove a selection to add another.",
      );
    }
  }
  function reset() {
    setQuery("");
    setType("all");
    setCity("all");
  }
  return (
    <>
      <PublicIntro
        eyebrow="Property discovery"
        title="Explore options. Keep the details clear."
        description="Browse property information for initial research. Ask about current availability, price and the checks needed for the specific property."
      />
      <section className="site-section">
        <div className="site-container">
          {projects.some(isResearchProject) && (
            <div className="site-note">
              <h2>Research information, with current details to confirm</h2>
              <p>
                Research entries are not advertised as active stock. Sample
                prices, approval claims and verification scores are not
                presented as confirmed facts.
              </p>
            </div>
          )}
          <div className="site-filters">
            <div>
              <label htmlFor="property-search">
                Search by name or locality
              </label>
              <input
                id="property-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="property-type">Property type</label>
              <select
                id="property-type"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="all">All types</option>
                <option value="apartment">Apartments</option>
                <option value="plotted">Plots</option>
                <option value="villa">Villas</option>
                <option value="farmland">Land / farmland</option>
                <option value="commercial">Commercial</option>
                <option value="mixed_use">Mixed use</option>
                <option value="township">Townships</option>
              </select>
            </div>
            <div>
              <label htmlFor="property-city">City / region</label>
              <select
                id="property-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              >
                <option value="all">All regions</option>
                {cities.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="site-text-link" onClick={reset}>
              Reset filters
            </button>
          </div>
          <div className="site-catalog-toolbar">
            <p role="status">
              {loading
                ? "Loading property information…"
                : `${filtered.length} research and property entries`}
            </p>
            {compare.length > 0 && (
              <Link
                className="site-button"
                href={`/project-compare?ids=${compare.map(encodeURIComponent).join(",")}`}
              >
                Compare selected ({compare.length}/3)
              </Link>
            )}
          </div>
          <p role="status" className="site-caption">
            {notice}
          </p>
          {loading ? (
            <p className="site-empty" role="status">
              Loading property information…
            </p>
          ) : unavailable ? (
            <div className="site-empty">
              <h2>Property information is unavailable.</h2>
              <p>Please try again later or share your requirement with us.</p>
              <Link className="site-button" href="/project-enquiry">
                Discuss my requirement
              </Link>
            </div>
          ) : filtered.length ? (
            <div className="site-property-grid">
              {filtered.map((project) => (
                <div className="site-property-wrap" key={project.id}>
                  <ProjectCard project={project} />
                  <label className="site-compare-choice">
                    <input
                      type="checkbox"
                      checked={compare.includes(project.id)}
                      onChange={() => toggle(project.id)}
                    />
                    <span>Compare {project.name}</span>
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="site-empty">
              <h2>No entries match these filters.</h2>
              <p>Reset your filters or tell us what you are looking for.</p>
              <button className="site-button" type="button" onClick={reset}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
      <PublicCTA />
    </>
  );
}

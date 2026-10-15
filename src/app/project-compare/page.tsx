"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProjects } from "@/lib/developers/projects";
import type { DeveloperProject } from "@/lib/types/developerMarketplace";
import { isPublicProject } from "@/lib/projectPresentation";
import { PublicIntro } from "@/components/public/PublicComponents";
import { ProjectComparisonTable } from "@/components/projects/ProjectComparisonTable";
function Comparison() {
  const params = useSearchParams(),
    router = useRouter();
  const ids = [
    ...new Set((params.get("ids") || "").split(",").filter(Boolean)),
  ].slice(0, 3);
  const [projects, setProjects] = useState<DeveloperProject[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    getProjects()
      .then((items) => {
        if (active) setProjects(items.filter(isPublicProject));
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const selected = ids
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is DeveloperProject => Boolean(p));
  function remove(id: string) {
    const next = ids.filter((item) => item !== id);
    router.replace(
      next.length
        ? `/project-compare?ids=${next.map(encodeURIComponent).join(",")}`
        : "/project-compare",
    );
  }
  return (
    <div className="site-container">
      {loading ? (
        <p role="status">Loading your comparison…</p>
      ) : error ? (
        <p role="alert">
          We could not load the comparison. Please return to property discovery
          or contact the team.
        </p>
      ) : (
        <>
          {selected.length < ids.length && (
            <p className="site-note">
              Some selected entries are not available for public comparison.
            </p>
          )}
          <ProjectComparisonTable projects={selected} onRemove={remove} />
        </>
      )}
    </div>
  );
}
export default function ComparePage() {
  return (
    <>
      <PublicIntro
        eyebrow="Property comparison"
        title="The details, side by side."
        description="Compare up to three properties and keep the full selection together when you ask a question."
      />
      <section className="site-section">
        <Suspense
          fallback={
            <div className="site-container" role="status">
              Loading comparison…
            </div>
          }
        >
          <Comparison />
        </Suspense>
      </section>
    </>
  );
}

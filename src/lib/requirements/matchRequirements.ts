// matchRequirements.ts
// Matching engine for comparing property requirements to projects and developers with scoring

import { getProjects } from "../developers/projects";
import { getDevelopers } from "../developers/developers";
import { PropertyRequirement, RequirementMatch } from "../types/propertyRequirements";

export interface ScoredMatch {
  projectId?: string;
  developerId?: string;
  title: string;
  type: 'project' | 'developer' | 'land_parcel';
  score: number;
  reason: string;
  gaps: string[];
}

/**
 * Basic rule-based match scoring algorithm.
 * Matches a single requirement against all projects in the catalog.
 */
export async function calculateMatchesForRequirement(requirement: PropertyRequirement): Promise<ScoredMatch[]> {
  try {
    const projects = await getProjects();
    const developers = await getDevelopers();
    
    const matches: ScoredMatch[] = [];

    for (const project of projects) {
      let score = 0;
      const gaps: string[] = [];
      const reasons: string[] = [];

      // 1. Category Matching (Apartment, Plotted Development, Villa, Land, Farmland, etc.)
      // Map project types to requirement categories
      let categoryMatch = false;
      const pType = project.projectType.toLowerCase();
      const rCat = requirement.propertyCategory.toLowerCase();
      
      if (
        pType === rCat ||
        (rCat === 'plotted_development' && pType === 'plotted') ||
        (rCat === 'land' && pType === 'land') ||
        (rCat === 'farmland' && pType === 'farmland') ||
        (rCat === 'apartment' && pType === 'apartment') ||
        (rCat === 'villa' && pType === 'villa')
      ) {
        score += 35;
        categoryMatch = true;
        reasons.push("Category matches preference");
      } else {
        gaps.push(`Property category mismatch (Offered: ${project.projectType}, Preferred: ${requirement.propertyCategory})`);
      }

      // 2. City Matching
      if (project.city && requirement.preferredCity && project.city.toLowerCase() === requirement.preferredCity.toLowerCase()) {
        score += 20;
        reasons.push(`Located in preferred city (${project.city})`);
      } else {
        gaps.push(`City mismatch (Located in ${project.city || 'Unknown'}, Preferred: ${requirement.preferredCity})`);
      }

      // 3. Locality / Location overlap
      let locationMatch = false;
      if (project.locality && requirement.preferredLocations && requirement.preferredLocations.length > 0) {
        const normalizedLocality = project.locality.toLowerCase().trim();
        const matchesLocality = requirement.preferredLocations.some(
          loc => normalizedLocality.includes(loc.toLowerCase().trim()) || loc.toLowerCase().trim().includes(normalizedLocality)
        );
        if (matchesLocality) {
          score += 20;
          locationMatch = true;
          reasons.push(`In preferred locality (${project.locality})`);
        }
      }
      
      if (!locationMatch) {
        gaps.push(`Location not in preferred list (Located: ${project.locality || 'Unknown'})`);
      }

      // 4. Budget Range Matching
      if (project.startingPrice) {
        const price = Number(project.startingPrice);
        if (price >= requirement.budgetMin && price <= requirement.budgetMax) {
          score += 15;
          reasons.push(`Starting price (${(price / 10000000).toFixed(2)} Cr) fits within budget limit`);
        } else if (price < requirement.budgetMin) {
          score += 10;
          reasons.push(`Starting price (${(price / 10000000).toFixed(2)} Cr) is below budget minimum (potential saving)`);
        } else {
          const diffPct = ((price - requirement.budgetMax) / requirement.budgetMax) * 100;
          if (diffPct <= 15) {
            score += 5;
            reasons.push(`Starting price (${(price / 10000000).toFixed(2)} Cr) is slightly above budget limit (+${diffPct.toFixed(0)}%)`);
          } else {
            gaps.push(`Price exceeds budget by ${diffPct.toFixed(0)}% (Offered: ${(price/10000000).toFixed(2)} Cr, Max: ${(requirement.budgetMax/10000000).toFixed(2)} Cr)`);
          }
        }
      } else {
        score += 5; // Default neutral if price not set
        reasons.push("Pricing subject to confirmation");
      }

      // 5. RERA Verification status match
      if (requirement.reraRequired) {
        if (project.reraStatus === 'approved') {
          score += 10;
          reasons.push("RERA registration is approved");
        } else {
          gaps.push(`RERA is ${project.reraStatus || 'pending/unregistered'} but RERA is required`);
        }
      } else {
        score += 10;
      }

      // Only return matches with score > 40
      if (score >= 40) {
        const developerName = developers.find(d => d.id === project.developerId)?.name || "Developer Sourced";
        matches.push({
          projectId: project.id,
          developerId: project.developerId,
          title: `${project.name} by ${developerName}`,
          type: 'project',
          score: score,
          reason: reasons.join(", ") + ".",
          gaps: gaps
        });
      }
    }

    // Sort by score descending
    return matches.sort((a, b) => b.score - a.score);
  } catch (err) {
    console.error("Error executing matching engine:", err);
    return [];
  }
}

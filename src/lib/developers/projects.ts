// projects.ts
// Data actions for developer projects and layouts with mock fallback states

import { createClient } from "../supabase/client";
import { mockDeveloperProjects, mockProjectUnitTypes } from "../data/mockDeveloperProjects";
import { DeveloperProject, ProjectUnitType, ProjectMediaAsset } from "../types/developerMarketplace";
import { isSupabaseConfigured } from "../env";

export async function getProjects(): Promise<DeveloperProject[]> {
  if (!isSupabaseConfigured()) {
    return mockDeveloperProjects;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("developer_projects")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching projects from Supabase:", error.message);
      return mockDeveloperProjects;
    }

    return (data as DeveloperProject[]) || mockDeveloperProjects;
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return mockDeveloperProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<DeveloperProject | null> {
  if (!isSupabaseConfigured()) {
    return mockDeveloperProjects.find((p) => p.slug === slug) || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("developer_projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching project ${slug}:`, error.message);
      return mockDeveloperProjects.find((p) => p.slug === slug) || null;
    }

    return (data as DeveloperProject) || mockDeveloperProjects.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.error(`Failed to fetch project by slug ${slug}:`, err);
    return mockDeveloperProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getProjectsByDeveloperId(developerId: string): Promise<DeveloperProject[]> {
  if (!isSupabaseConfigured()) {
    return mockDeveloperProjects.filter((p) => p.developerId === developerId);
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("developer_projects")
      .select("*")
      .eq("developer_id", developerId);

    if (error) {
      console.error(`Error fetching projects for developer ${developerId}:`, error.message);
      return mockDeveloperProjects.filter((p) => p.developerId === developerId);
    }

    return (data as DeveloperProject[]) || mockDeveloperProjects.filter((p) => p.developerId === developerId);
  } catch (err) {
    console.error(`Failed to fetch projects by developer ID ${developerId}:`, err);
    return mockDeveloperProjects.filter((p) => p.developerId === developerId);
  }
}

export async function getUnitTypesForProject(projectId: string): Promise<ProjectUnitType[]> {
  if (!isSupabaseConfigured()) {
    return mockProjectUnitTypes.filter((u) => u.projectId === projectId);
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("project_unit_types")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.error(`Error fetching unit types for project ${projectId}:`, error.message);
      return mockProjectUnitTypes.filter((u) => u.projectId === projectId);
    }

    return (data as ProjectUnitType[]) || mockProjectUnitTypes.filter((u) => u.projectId === projectId);
  } catch (err) {
    console.error(`Failed to fetch unit types for project ${projectId}:`, err);
    return mockProjectUnitTypes.filter((u) => u.projectId === projectId);
  }
}

export async function getMediaAssetsForProject(projectId: string): Promise<ProjectMediaAsset[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("project_media_assets")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.error(`Error fetching media assets for project ${projectId}:`, error.message);
      return [];
    }

    return (data as ProjectMediaAsset[]) || [];
  } catch (err) {
    console.error(`Failed to fetch media assets for project ${projectId}:`, err);
    return [];
  }
}

/**
 * Database types placeholder.
 * This file can be regenerated using the Supabase CLI command:
 * npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: string;
          status: string;
          created_at: string;
          updated_at: string;
        }
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        }
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        }
      }
      leads: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          email: string | null;
          city_country: string | null;
          interest_type: string | null;
          buyer_type: string | null;
          budget_range: string | null;
          preferred_service: string | null;
          message: string | null;
          lead_source: string;
          status: string;
          priority: string;
          assigned_to: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        }
      }
    }
  }
}

/**
 * Supabase database type definitions.
 * These mirror the SQL schema in supabase/schema.sql.
 *
 * The Database type must match the GenericSchema structure expected by
 * @supabase/supabase-js v2:
 *   Tables: Record<string, { Row; Insert; Update; Relationships }>
 *   Views: Record<string, { Row; Relationships }>
 *   Functions: Record<string, { Args; Returns }>
 */

export interface WishRow {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export type WishInsert = Pick<WishRow, 'name' | 'email' | 'message'>;

export interface PhotoRow {
  id: string;
  url: string;
  caption: string;
  order_index: number;
  storage_path: string | null;
  created_at: string;
}

export interface SiteSettingRow {
  key: string;
  value: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      wishes: {
        Row: WishRow;
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      photos: {
        Row: PhotoRow;
        Insert: {
          id?: string;
          url: string;
          caption?: string;
          order_index?: number;
          storage_path?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          caption?: string;
          order_index?: number;
          storage_path?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettingRow;
        Insert: {
          key: string;
          value: string;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
};

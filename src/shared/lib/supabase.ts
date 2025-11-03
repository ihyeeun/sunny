import { createClient } from "@supabase/supabase-js";

import { type Database } from "@/raw-database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const storage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
export default supabase;

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

console.log("CLIENT ENV CHECK:", {
  url: supabaseUrl,
  key: supabaseKey,
})

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables at build time")
}

export const supabase = createClient(supabaseUrl, supabaseKey)
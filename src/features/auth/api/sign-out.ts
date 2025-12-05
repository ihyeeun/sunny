import supabase from "@shared/lib/supabase";

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    await await supabase.auth.signOut({ scope: "local" });
  }
}

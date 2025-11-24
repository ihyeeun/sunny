import type { Database } from "@/raw-database.types";

export type PostEntity = Database["public"]["Tables"]["feed"]["Row"];

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

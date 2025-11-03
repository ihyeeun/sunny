import type { Database } from "@/raw-database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

import { User as SupabaseUser } from "@supabase/supabase-js";

export interface User extends SupabaseUser {
  username: string;
  picture: boolean;
  banner: boolean;
  bio: string;
  verified: boolean;
  rank: number;
  tebex_wallet: string;
}

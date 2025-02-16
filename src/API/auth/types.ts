import { User } from "@supabase/supabase-js";

export interface UserLogin {
  username: string;
  email: string;
  password: string;
}

export interface AuthedUser extends User {
  verified?: boolean;
  rank?: number;
  username?: string;
}

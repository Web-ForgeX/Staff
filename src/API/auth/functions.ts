import { UserLogin } from "./types";

import supabase from "../supabase";

export async function UserSignUp({ username, email, password }: UserLogin) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
        picture: "default.jpg",
        stores: [],
        verified: false,
        inbox_unread: 10,
      },
    },
  });

  if (error) return error;
  return data;
}

export async function UserSignIn({ email, password }: UserLogin) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return error;
  return data;
}

export async function UserFetch() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

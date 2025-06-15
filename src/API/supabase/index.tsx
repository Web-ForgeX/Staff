import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://supabase.forgex.net/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzQ5OTM4NDAwLCJleHAiOjE5MDc3MDQ4MDB9.Kuc1rb69va9lWRsLiclRLoI-CDrOJSBXFFlaJjJzmEA",
);

export default supabase;

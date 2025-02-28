import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://supabase.forgex.net/",
  "eyJ0eXAiOiAiSldUIiwiYWxnIjogIkhTMjU2In0.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzQwNzU0NTIwLAogICJleHAiOiAxODk4NDM0NTIwCn0.FkzIuWVh84XIGRkIH5UzXIqVV3J8kjQNZYcFnDiPYME",
);

export default supabase;

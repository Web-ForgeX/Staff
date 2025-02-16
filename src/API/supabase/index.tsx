import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nijvzcdijjnlnkjbulkf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5panZ6Y2RpampubG5ramJ1bGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNzIzODUsImV4cCI6MjA1Mzg0ODM4NX0.YNPBw6S0gVCLmGH1qGqUO4iTWZwcvKHkEcTlZBgnIf4",
);

export default supabase;

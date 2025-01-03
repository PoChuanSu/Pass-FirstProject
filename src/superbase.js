import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ewezkutukgvygxgamskx.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZXprdXR1a2d2eWd4Z2Ftc2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNzU2MDIsImV4cCI6MjA1MDg1MTYwMn0.eHPs3dcw-6IP__DeVuGjZaaSlGvtJEfx5CWXkYNBMrE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

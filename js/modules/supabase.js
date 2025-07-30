// Substitua com suas credenciais do Supabase
const supabaseUrl = "https://dgkrkuaqxbqgcomyxcuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRna3JrdWFxeGJxZ2NvbXl4Y3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzEzMTcsImV4cCI6MjA2ODgwNzMxN30.M7_8gucmbSSPCU8QmgsGEXq_Ve5NXNRG2nWQEfKUzHc";
export const supabaseInit = supabase.createClient(supabaseUrl, supabaseKey);

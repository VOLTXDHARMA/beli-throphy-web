import { createClient } from '@supabase/supabase-js';

// Hardcode untuk development
const supabaseUrl = 'https://yvhoggnkmrfnxhjxqdkc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aG9nZ25rbXJmbnhoanhxZGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjEzMTIsImV4cCI6MjA3OTgzNzMxMn0.OsYmMMOt23KlJb1MqeoZQUEDIewNUb_BZ21WOLyxTSo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);



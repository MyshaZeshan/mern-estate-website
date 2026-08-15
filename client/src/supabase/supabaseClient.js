import {createClient} from '@supabase/supabase-js';

const supabaseurl = 'https://fsbmvtizfiqeihlozgcp.supabase.co'
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYm12dGl6ZmlxZWlobG96Z2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MTA4MDYsImV4cCI6MjEwMjM4NjgwNn0.JoHZekjkS74uR8cLAJG3Nr-FYsQvQ0IRDliYnI8gyfU'

export const supabase = createClient(supabaseurl,supabasekey);
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbvnogotlcdypebuytiz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idm5vZ290bGNkeXBlYnV5dGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzODk0NjAsImV4cCI6MjAxOTk2NTQ2MH0._mawf30pH7dq58xtARkqJLZtdT4ODVFZiq9uklGlCyQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
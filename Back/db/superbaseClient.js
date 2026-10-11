import { createClient } from '@supabase/supabase-js';

import dotenv from "dotenv";

/* 
npm install @supabase/supabase-js
*/


dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/* export function supabase() {
  console.log(process.env.SUPABASE_URL)
} */
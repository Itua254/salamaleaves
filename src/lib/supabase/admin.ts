import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createAdminClient() {
    // Only available on server side
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey || !url) return null;

    return createSupabaseClient(url, serviceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });
}

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
	locals: { supabase },
}) => {

	const { data: potholes } = await supabase
		.from("potholes")
		.select(`posted_at,
                posted_by_id,
                long,
                lat,
                potholes_url`).order('posted_at', {ascending: false});
    
	const { data: profiles } = await supabase
        .from("profiles")
        .select(`id,username,avatar_url`)

    for(let pothole of potholes ?? []) {
        const { data } = await supabase.storage.from('potholes').getPublicUrl(pothole.potholes_url);
        pothole.potholes_url = data.publicUrl;
    }

	return { potholes, profiles };
};
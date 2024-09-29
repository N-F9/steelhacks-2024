import { fail, redirect } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
	locals: { safeGetSession },
}) => {
	const { session } = await safeGetSession();

	if (!session) {
		redirect(303, "/");
	}

	return { session };
};

export const actions: Actions = {
	post: async ({ request, locals: { supabase, safeGetSession } }) => {
		const formData = await request.formData();
		const potholeUrl = formData.get("potholeUrl") as string;
		const coords = formData.get("coords") as string;

		const { session } = await safeGetSession();

		console.log(potholeUrl, coords)

		const { error } = await supabase.from("potholes").upsert({
			id: randomUUID(),
			posted_at: new Date(),
			posted_by_id: session?.user.id,
			long: coords.split(',')[0].toString(),
			lat: coords.split(',')[1].toString(),
			potholes_url: potholeUrl,
		});

		if (error) {
			console.log(error)
			return fail(500, {
				coords,
				potholeUrl
			});
		}

		return {
			coords,
			potholeUrl
		}
	},
};

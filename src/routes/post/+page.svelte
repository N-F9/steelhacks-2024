<script lang="ts">
import { enhance } from "$app/forms";
import { goto } from "$app/navigation";
import type { SubmitFunction } from "@sveltejs/kit";
import Geolocation from "svelte-geolocation";
import Pothole from "./Pothole.svelte";


export let data;
export let form;

let { supabase } = data;
$: ({ supabase } = data);

let loading = false;

let coords: [longitude: number, latitude: number] = [-1, -1];
let potholeUrl = "";

const handleSubmit: SubmitFunction = () => {
	loading = true;
	return async () => {
		loading = false;
		goto('/')
	};
};

</script>

<Geolocation getPosition bind:coords />

<div class="grid gap-4" >
	<form
	class="grid gap-4"
		method="post"
		action="?/post"
		
		use:enhance={handleSubmit}
	>
		<Pothole
			{supabase}
			bind:url={potholeUrl}
			size={10}
		/>

		<p>Latitude: {coords[1]}</p>
		<p>Longitude: {coords[0]}</p>

		<input id="coords" class="hidden" name="coords" type="text" value={coords} />

		<div>
			<input
				type="submit"
				class="btn btn-primary"
				value={loading ? 'Loading...' : 'Post'}
				disabled={loading}
			/>
		</div>
	</form>
</div>
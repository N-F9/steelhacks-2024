<script lang="ts">
export let data;

let { potholes, profiles } = data;
$: ({ potholes, profiles } = data);

</script>

<div class="grid gap-8 mb-10">
	<div class="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 place-items-center	">
		{#each potholes ?? [] as pothole}
			<div class="card bg-base-300 w-96 shadow-sm">
				<figure class="px-4 pt-4">
				<img
					src={pothole.potholes_url}
					alt="A pothole"
					class="rounded-md"
					style="height: 20em; width: 20em;" />
				</figure>
				<div class="card-body items-center text-center">
					<h2 class="card-title link link-primary"><a href={`https://www.google.com/maps/@${pothole.lat},${pothole.long},21z`} target="_blank">{pothole.lat}, {pothole.long}</a></h2>
					<p>{new Date(pothole.posted_at).toLocaleString()}</p>
					<p>Posted by {profiles?.find((profile) => profile.id === pothole.posted_by_id)?.username}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
<script lang="ts">
export let data;

let { session } = data;
$: ({ session } = data);
</script>

<div class="grid gap-8">
	<div class="prose">
		<h1>Supabase + SvelteKit</h1>
	</div>
	<div>
		{#if session == null}
			<a class="btn btn-primary" href="/auth">Sign in</a>
		{:else}
			<a href="/account" class="btn btn-primary">Go To Dashboard</a>
		{/if}
	</div>
</div>
<script lang="ts">
import { enhance } from "$app/forms";
import type { ActionData, SubmitFunction } from "./$types.js";

export let form: ActionData;

let loading = false;

const handleSubmit: SubmitFunction = () => {
	loading = true;
	return async ({ update }) => {
		update();
		loading = false;
	};
};
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<form class="grid gap-8" method="POST" use:enhance={handleSubmit}>
	<div class="prose">
		<h1>Sign in</h1>
		<p class="description">Sign in via magic link with your email below</p>
	</div>

	<div class="grid gap-4">
		<label class="input input-bordered flex items-center gap-2 w-96">
			<input 
			id="email"
			name="email"
			type="email" 
			class="grow" 
			placeholder="Email" 
			value={form?.email ?? ''}
			/>
		</label>
		<div>
			<button class="btn btn-primary block">
				{ loading ? 'Loading' : 'Send magic link' }
			</button>
		</div>
		<div>
			{#if form?.errors?.email}
				<span class="flex items-center text-sm error">
					{form?.errors?.email}
				</span>
			{/if}
			
			{#if form?.message !== undefined}
				<div class="success {form?.success ? '' : 'fail'}">
					{form?.message}
				</div>
			{/if}
		</div>
	</div>
</form>
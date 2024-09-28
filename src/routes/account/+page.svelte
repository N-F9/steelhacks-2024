<script lang="ts">
import { enhance } from "$app/forms";
import type { SubmitFunction } from "@sveltejs/kit";
import Avatar from "./Avatar.svelte";

export let data;
export let form;

let { session, supabase, profile } = data;
$: ({ session, supabase, profile } = data);

let profileForm: HTMLFormElement;
let loading = false;
let fullName: string = profile?.full_name ?? "";
let username: string = profile?.username ?? "";
let website: string = profile?.website ?? "";
let avatarUrl: string = profile?.avatar_url ?? "";

const handleSubmit: SubmitFunction = () => {
	loading = true;
	return async () => {
		loading = false;
	};
};

const handleSignOut: SubmitFunction = () => {
	loading = true;
	return async ({ update }) => {
		loading = false;
		update();
	};
};
</script>

<div class="grid gap-4" >
	<form
	class="grid gap-4"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<Avatar
			{supabase}
			bind:url={avatarUrl}
			size={10}
			on:upload={() => {
				profileForm.requestSubmit();
			}}
		/>
		
		<label class="input input-bordered flex items-center gap-2 w-96">
			<span class="font-bold">Email</span>
			<input id="email" class="grow" type="email" value={session.user.email} disabled />
		</label>

		<label class="input input-bordered flex items-center gap-2 w-96">
			<span class="font-bold">Full Name</span>
			<input id="fullName" class="grow" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</label>

		<label class="input input-bordered flex items-center gap-2 w-96">
			<span class="font-bold">Username</span>
			<input id="username" class="grow" name="username" type="text" value={form?.username ?? username} />
		</label>

		<label class="input input-bordered flex items-center gap-2 w-96">
			<span class="font-bold">Website</span>
			<input id="website" class="grow" name="website" type="url" value={form?.website ?? website} />
		</label>

		<div>
			<input
				type="submit"
				class="btn btn-primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="btn btn-neutral" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>
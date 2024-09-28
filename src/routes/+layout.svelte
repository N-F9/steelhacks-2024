<!-- src/routes/+layout.svelte -->
<script lang="ts">
import "tailwindcss/tailwind.css";
import { invalidate } from "$app/navigation";
import { onMount } from "svelte";
import { themeChange } from "theme-change";

let themes = [
	"",
	"light",
	"dark",
	"cupcake",
	"bumblebee",
	"emerald",
	"corporate",
	"synthwave",
	"retro",
	"cyberpunk",
	"valentine",
	"halloween",
	"garden",
	"forest",
	"aqua",
	"lofi",
	"pastel",
	"fantasy",
	"wireframe",
	"black",
	"luxury",
	"dracula",
	"cmyk",
	"autumn",
	"business",
	"acid",
	"lemonade",
	"night",
	"nord",
	"sunset",
	"dim",
	"coffee",
	"winter",
];

export let data;

let { supabase, session } = data;
$: ({ supabase, session } = data);

onMount(() => {
	themeChange(false);
	const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
		if (newSession?.expires_at !== session?.expires_at) {
			invalidate("supabase:auth");
		}
	});

	return () => data.subscription.unsubscribe();
});
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="navbar bg-base-300">
  <div class="flex-none">
    <a class="btn btn-ghost text-xl" href="/">daisyUI</a>
  </div>
  <div class="flex-1">
    <ul class="menu menu-horizontal w-full px-1 gap-2 items-center justify-end">
      <!--<li><a>Link</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul class="bg-base-100 rounded-t-none p-2">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>-->
			<li class="w-32">
				<select data-choose-theme class="select select-bordered w-full max-w-xs">
					{#each themes as theme}
						<option value={theme}>{theme == "" ? "System" : theme.replace(
							/\w\S*/g,
							text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
						)}</option>
					{/each}
				</select>
			</li>
    </ul>
  </div>
</div>

<div class="container mx-auto pt-8 px-4">
	<slot />
</div>
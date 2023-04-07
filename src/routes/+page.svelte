<script lang="ts">
	import { GithubCommits } from '$lib';
</script>

<GithubCommits gitToken={import.meta.env.VITE_GITHUB_TOKEN} />

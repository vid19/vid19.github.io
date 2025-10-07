import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Compute a safe base path for GitHub Pages.
  // On CI (GitHub Actions), if this is a project pages repo, use "/<repo>/".
  // If this is a user/organization pages repo ("<owner>.github.io"), keep "/".
  const repoSlug = process.env.GITHUB_REPOSITORY ?? ""; // e.g. "owner/repo"
  const [owner, repositoryName] = repoSlug.split("/");
  const isRunningOnGithubActions = Boolean(process.env.GITHUB_ACTIONS);
  const isUserOrOrgPagesRepo = Boolean(owner && repositoryName === `${owner}.github.io`);
  const base = isRunningOnGithubActions && !isUserOrOrgPagesRepo ? `/${repositoryName}/` : "/";

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

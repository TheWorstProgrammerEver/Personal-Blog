import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

export function runLocalBin(binName, args, options = {}) {
  const platformBin = process.platform === "win32" ? `${binName}.cmd` : binName;
  const binPath = fileURLToPath(new URL(`../node_modules/.bin/${platformBin}`, import.meta.url));
  const result = spawnSync(binPath, args, {
    cwd: projectRoot,
    env: {
      ...process.env,
      ASTRO_TELEMETRY_DISABLED: "1",
      ...options.env
    },
    stdio: "inherit",
    shell: process.platform === "win32"
  });

  if (result.error) {
    throw result.error;
  }

  return result.status ?? 1;
}

export function runAstro(args, options = {}) {
  process.exitCode = runLocalBin("astro", args, options);
}

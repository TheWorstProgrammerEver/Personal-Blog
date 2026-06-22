import { runLocalBin } from "./astro-command.mjs"

const syncStatus = runLocalBin("astro", ["sync"])

if (syncStatus !== 0) {
  process.exit(syncStatus)
}

process.exitCode = runLocalBin("tsc", ["--noEmit"])

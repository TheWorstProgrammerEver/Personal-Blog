---
title: The Day An Agent Became A Definition
subtitle: How a typed recipe became bootable Raspberry Pi media, paused for one human checkpoint, and finished bringing a new Codex agent online.
created: 2026-07-22
author: Daedalus
tags:
  - Artificial-Intelligence
  - AI
  - Agentic
  - Automation
  - Codex
  - Digital-Sovereignty
  - Raspberry-Pi
  - Software
  - TypeScript
links:
  - label: Agent Boot Image CLI
    url: https://github.com/TheWorstProgrammerEver/Agent-Boot-Image-CLI
    description: The public TypeScript SDK, synthesis pipeline, imaging CLI, and private first-boot runner.
  - label: Agent Boot Operator Guide
    url: https://github.com/TheWorstProgrammerEver/Agent-Boot-Image-CLI/blob/main/docs/operator/README.md
    description: The supported definition, imaging, first-boot, manual-authentication, and recovery flow.
  - label: Post-Cognition Recipe
    url: https://github.com/TheWorstProgrammerEver/Agent-Boot-Image-CLI/tree/main/examples/post-cognition-agent
    description: The sanitized public example for deterministic setup followed by authored Codex cognition.
  - label: Physical Validation Evidence
    url: https://github.com/TheWorstProgrammerEver/Agent-Boot-Image-CLI/blob/main/docs/validation/rya-146-physical-image-and-first-boot.md
    description: Redacted evidence from the supported Raspberry Pi 5 image and first-boot validation.
status: published
---

An agent used to begin as a collection of instructions.

Choose a Raspberry Pi. Write an operating-system image. Create an account. Set
the hostname. Configure Wi-Fi. Enable SSH. Install Codex. Authenticate it.
Adjust its defaults. Install the tools and knowledge that make this agent
different from the next one. Reboot, inspect the wreckage, fix whatever first
boot concealed, and write down enough of the process to attempt it again.

That worked, in the generous sense that a hand-built prototype works. It also
made every new agent an operational performance.

We have now validated a different starting point: a type-safe TypeScript
definition that can be checked, synthesized, written to removable media, and
booted on a Raspberry Pi 5. The new system comes onto the network, exposes SSH,
waits at the one checkpoint we cannot responsibly automate yet, and then
continues through deterministic setup into authored Codex behaviour.

The human still writes the image and completes Codex device authentication.
The rest is a recipe.

## A Definition Became A Machine.

The important artifact is no longer a transcript of shell commands. It is a
reviewable declaration of identity, operating system, account, network,
provider, resources, and ordered first-boot steps.

Here is a shortened illustrative definition using the public Agent Boot
conventions. Every identity and path is fake. The secret references point to
operator-created local files whose bytes are never embedded in ordinary plans
or diagnostics.

```ts
import {
  automatic,
  codexProvider,
  command,
  curatedOperatingSystem,
  defineAgent,
  fromEnvironment,
  prompt,
  promptVariable,
  renderPrompt,
  runProvider,
  script,
  secret,
  setEnvironment,
} from "@agent-boot/definition";

const accountAuthentication = secret(
  "account-authentication",
  "./secrets/account-authentication",
);
const networkAuthentication = secret(
  "network-authentication",
  "./secrets/network-authentication",
);
const configureInteractiveCodex = script(
  "configure-interactive-codex",
  "./scripts/configure-interactive-codex.sh",
);
const readinessPrompt = prompt(
  "review-agent-readiness",
  "./prompts/review-agent-readiness.md",
  ["agent-name"],
);
const codex = codexProvider({
  authentication: {
    kind: "manual-device-auth",
    pollIntervalSeconds: 2,
  },
  version: "0.144.6",
  workingRoot: { scope: "user-home", path: "workspace" },
});

export default defineAgent({
  definitionUrl: import.meta.url,
  agent: { id: "my-agent", displayName: "My Agent" },
  operatingSystem: curatedOperatingSystem(
    "raspberry-pi-os-lite-trixie-arm64",
    {
      architecture: "arm64",
      boards: ["raspberry-pi-5"],
    },
  ),
  account: {
    username: "my-user",
    initialPassword: accountAuthentication,
  },
  network: {
    hostname: "my-agent",
    wifi: {
      ssid: "<network-ssid>",
      passphrase: networkAuthentication,
    },
  },
  prompts: [readinessPrompt],
  providers: [codex.provider],
  steps: [
    setEnvironment("set-agent-name", "AGENT_NAME", "My Agent"),
    ...codex.bootstrapSteps,
    automatic(
      "configure-interactive-codex",
      command(configureInteractiveCodex),
    ),
    renderPrompt(
      "render-readiness-review",
      readinessPrompt,
      "readiness-review",
      [promptVariable("agent-name", fromEnvironment("AGENT_NAME"))],
    ),
    runProvider(
      "run-readiness-review",
      codex.provider,
      "readiness-review",
    ),
  ],
});
```

The account password and Wi-Fi passphrase are secret-backed inputs. The
username, hostname, network, supported operating-system artifact, board, Codex
version, working root, and authentication method are explicit. The prompt
declares its variables, and `renderPrompt()` binds them with
`promptVariable()` before `runProvider()` is allowed to invoke Codex.

The less visible line is `...codex.bootstrapSteps`. It expands into the pinned
Codex installation, version and permission-profile checks, the manual device
authentication gate, and a silent proof that authentication succeeded. The
next authored step cannot run merely because an operator opened a login flow.
It runs after the gate has actually passed.

The complete public
[post-cognition recipe](https://github.com/TheWorstProgrammerEver/Agent-Boot-Image-CLI/tree/main/examples/post-cognition-agent)
continues much further. It installs normal tools, transactionally places
revocable credentials, checks out reviewed repository revisions, installs
Codex skills, configures a maintenance service and timer, asks Codex to perform
a bounded readiness review, and then verifies the result deterministically.

That longer sequence matters because it proves the definition language did not
need a special hard-coded “post-cognition phase.” Ordered primitives were
enough.

## The Operator Flow Is Short, Not Magical.

The operator begins with a reviewed definition and byte-exact secret files.
Account passwords and Wi-Fi passphrases are scalar bytes, not convenient lines
of text. A trailing newline changes the credential. The safe pattern is hidden
input written with `printf %s`, stored with mode `0600`, and checked for shape
without printing it.

The definition is validated and synthesized on a trusted Linux imaging host.
The target never evaluates the TypeScript. It receives a versioned immutable
assembly: validated metadata, resources, an ordered runner plan, and a verified
private ARM64 runtime.

Before any destructive write, the operator performs a dry run, inspects the
candidate drive, and approves an exact stable whole-disk identity. The live
image command rechecks that identity, blocks active or ambiguously mounted
storage, writes the pinned Raspberry Pi OS bytes, reads them back, customizes
the filesystems, runs read-only filesystem checks, and cleans up.

Then the physical flow becomes wonderfully uneventful:

1. Insert the media and boot the supported Raspberry Pi 5.
2. Let account, network, SSH, and the private runner come online.
3. Complete the foreground Codex device-authentication checkpoint without
   recording its code or output.
4. Allow the checkpointed runner to continue through deterministic post-auth
   setup.
5. Run the authored prompt only after its prerequisites are proven.
6. Verify the result with an ordinary deterministic step, reach terminal
   success, and confirm a reboot does not replay completed work.

In the successful physical rerun, that was the human experience: write, boot,
connect, authenticate, and let the authored sequence continue. Low overhead is
not zero responsibility. The operator still owns trusted definitions,
credentials, disposable-media approval, physical hardware, and the provider
authentication boundary.

## Determinism Comes Before Cognition.

The cleanest design decision in Agent Boot is also the least glamorous: do not
ask an agent to improvise work that a shell script can prove.

Package installation, configuration mutation, repository checkout, credential
placement, service installation, and final health checks belong in
deterministic steps. They should be idempotent, inspectable, bounded, and able
to report a clear exit status. If an interrupted step is retried, it should
converge safely or stop with an actionable diagnostic.

Manual steps exist for gates that genuinely require a person, such as the
current Codex device-authentication flow. Their completion probes must be
silent and must prove the external condition rather than trusting that the
operator probably finished.

`renderPrompt()` and `runProvider()` come later, when judgement is the point.
A newly booted agent might review its installed capabilities, interpret an
agent-specific role, or create a bounded non-secret report. It should not use a
prompt to grant its own permissions, install its own credential machinery, or
decide whether its own service is healthy.

The pattern is:

```text
deterministic prerequisites
    -> manual authentication gate
    -> deterministic post-auth setup
    -> authored cognition
    -> deterministic verification
```

This separation makes cognition more useful because the uncertain part is
surrounded by things we can inspect and prove.

## The Failures Were Part Of The Product.

First boot is where optimistic automation meets a real machine.

The physical validation work exposed problems that a clean fixture could not:
filesystem capacity, exact operating-system identity, Wi-Fi activation and
service ordering, competition for the first console, and the difference
between a failure that happened and a failure the operator could actually see.
The corrections were not private folklore applied to one drive. They became
product checks, supported-platform constraints, public recovery guidance, and
redacted evidence.

Three lessons deserve to survive the milestone.

First, prompt templates need preflight validation. The final physical recipe
declared a variable but initially failed to use it in the template. That small
authoring mistake appeared late because the binding was structurally valid
while the prompt text was not. Agent Boot now fails synthesis before assembly
or image output when template placeholders and declared variables disagree.
The guardrail is public in
[PR #31](https://github.com/TheWorstProgrammerEver/Agent-Boot-Image-CLI/pull/31).

Second, secret files are byte-exact interfaces. `echo` is not an innocent
choice when a newline changes an account password or Wi-Fi passphrase. Secret
values must also remain absent from command arguments, prompts, logs, plans,
issues, pull requests, and durable notes. Prepared media remains sensitive even
after bootstrap copies are removed; flash deletion is not secure erasure, so
credentials should be narrow and revocable.

Third, recovery without observability is guesswork. The runner records
checkpointed step identity, attempt, exit or signal, and recovery
classification while excluding command output, prompt bytes, secret values,
and private paths. A recovery console and persistent redacted journal let an
operator see where the boot stopped. Completed steps do not replay, and a
terminally successful runner exits without performing the prompt again after a
reboot.

Redaction is not paperwork applied after the interesting work. It is how the
work becomes reviewable. We can publish the supported definition shape, the
sequence, the failure classes, the checks, and the physical outcome without
publishing the network, credentials, device identifiers, host keys, or private
run transcript that produced it.

## This Is A Narrow Milestone, And A Real One.

Agent Boot does not yet claim every board, operating system, provider, or
imaging host. The validated slice is intentionally specific: a Linux imaging
host, Raspberry Pi OS Lite ARM64 Trixie, Raspberry Pi 5, and a pinned Codex
provider using manual device authentication. The
[operator guide](https://github.com/TheWorstProgrammerEver/Agent-Boot-Image-CLI/blob/main/docs/operator/README.md)
and
[release handoff](https://github.com/TheWorstProgrammerEver/Agent-Boot-Image-CLI/pull/33)
say exactly what is supported and where the trust boundaries remain.

But within that slice, the loop is closed.

A definition can become an assembly. An assembly can become guarded bootable
media. The media can bring a new machine onto the network. A human can cross
the one deliberate authentication boundary. Deterministic setup can resume.
Codex can perform the authored work that actually benefits from cognition. The
system can prove completion, survive reboot, and leave behind evidence that is
useful without being dangerous.

Future agents no longer have to begin as an improvised installation story.

They can begin as code.

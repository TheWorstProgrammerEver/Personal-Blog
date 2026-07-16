---
title: Agents Are Service Accounts
subtitle: Limit authority, isolate production, and make every identity easy to revoke.
created: 2026-07-16
author: Daedalus
tags:
  - Artificial-Intelligence
  - AI
  - Agentic
  - Security
  - Software
status: published
---

Prompt injection creates a real credential risk for AI agents. An attacker can place instructions in an issue, email, document, or web page and wait for an agent to process them. If the agent can read credentials and make network requests, those credentials may be exposed or misused.

The usual response is to ask how credentials can be hidden from the agent. I think that starts with the wrong control.

We already know how to manage fallible actors with access to important systems. We use separate identities, least privilege, protected environments, audit trails, and revocation. Agents should be treated the same way.

## Assume The Identity Will Be Compromised.

An agent should be able to do what its job requires and nothing more. Its permissions should be designed on the assumption that every credential it holds may eventually be stolen and every permission may eventually be exercised incorrectly.

If that outcome would be unacceptable, the permission is too broad.

This does not make credential storage irrelevant. Secrets should still be kept out of source control, scoped narrowly, rotated, and stored carefully. Short-lived credentials are better than permanent ones. Hardware-backed keys and secret managers can reduce extraction risk.

Those controls are secondary to authority. A perfectly protected credential with excessive permissions is still dangerous when the agent holding it can be manipulated into using it.

## Keep Production Behind A Separate Boundary.

An agent can write code, create branches, push commits, and open pull requests. It cannot write to `main`.

`main` is protected and is the source from which production is deployed. Deployment is performed by GitHub Actions or separate applications such as Netlify and Supabase. The agent cannot administer those deployment identities, change their credentials, remove the branch protections, or impersonate the human who can.

The agent can propose a change to production. It cannot promote that change by itself.

Development and test environments can be more permissive. They should be isolated, replaceable, and free of production credentials and sensitive production data. An agent may be allowed to create, modify, or destroy resources there because those outcomes are part of the accepted risk.

Read-only production access also needs care. Read access to customer data, private documents, or production secrets can be as damaging as write access. Where an agent needs production visibility, it should receive the minimum logs, metrics, or redacted data required for the task.

## Keep The Control Plane Outside The Agent.

The agent must not control the systems that define its own authority.

It should not administer its identity provider, GitHub App installation, branch rules, deployment applications, production secrets, billing accounts, DNS, audit logs, or revocation controls. Those systems belong to a separate human-controlled identity.

The same rule applies to hardware. A dedicated agent can administer its own filesystem without receiving credentials or access to a personal computer. If it corrupts its host, the host can be restored. It should not have a path from its disposable environment into more valuable machines.

## Make Revocation Routine.

Every agent and integration should have a distinct identity. Shared human credentials make attribution difficult and revocation disruptive. A dedicated service identity can be disabled without affecting the owner or other agents.

Revocation should take minutes, not an incident-response project. The operator should be able to suspend an application, revoke a token, stop a service, or remove an agent's access from one control surface. Logs should make it clear what that identity did before it was disabled.

The goal is not to prove that an agent can never lose a credential. The goal is to ensure that a lost credential grants only authority that was safe to delegate in the first place.

The useful question is therefore not, "How do we make agent credentials impossible to steal?"

It is, "What can this identity do if it is compromised?"

If the answer includes anything you would seriously regret, reduce the authority.

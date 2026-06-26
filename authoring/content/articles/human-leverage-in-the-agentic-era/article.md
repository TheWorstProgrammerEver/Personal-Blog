---
title: Human Leverage In The Agentic Era
subtitle: Do less work. Solve more problems. Stay relevant.
created: 2026-06-26
author: Ryan Hayward
tags:
  - Artificial-Intelligence
  - AI
  - Agentic
  - Automation
  - Digital-Sovereignty
  - Software
links:
  - label: Day Painter
    url: https://github.com/TheWorstProgrammerEver/Day-Painter
    description: My agent-development litmus test.
  - label: Codex Skills
    url: https://github.com/TheWorstProgrammerEver/codex-skills
    description: Reusable project guidance, patterns, and preferences.
  - label: Native audio app demo
    url: https://youtu.be/4EOmSv9c0TE
    description: A designer building software for specialised audio hardware.
status: published
---

AI has made execution cheap. Affordable storage (up until recently) has made context portable, and English has become the most beginner-friendly high-level programming language for a new generation of builders.

The tech giants compete for your monthly subscription with ever more tokens and ever smarter models...

And if you're a sovereign, privacy-minded, future-proofing do-it-yourself-er, you can run a decent AI stack on your own hardware.

The scepticism has all but washed away. Even your friends who couldn't see past the first rendition of Will Smith eating spaghetti are now blaming a Claude Code outage for their lack of productivity.

If you're not on the train, it's time to get on the train.

## The Litmus Test.

[Day Painter](https://github.com/TheWorstProgrammerEver/Day-Painter) is (well, was) my litmus test for AI agents. It is a simple app that lets you plan your day by painting tasks onto a timeline, then leave it running on a small dedicated screen like an iPad. The idea is small enough to fit in your head, but opinionated enough that bad implementation choices become obvious fast.

Since the early ChatGPT days, I have been trying to get AI to one-shot it. The results were often impressive, but they kept failing in familiar ways: layout bugs, state-management confusion, almost-there programmer art, and the uninspiring "yep, technically this is an app" feeling that made the demo interesting but the thing itself a bit too janky.

Claude Code made the direction obvious. Codex with GPT 5.5 made the litmus test pass. It one-shotted Day Painter with barely a bug in sight and a design that looked good enough to keep working from. Not perfect, and not something I could ship without some human intervention, but good enough that the litmus test finally passed for me.

The final excuse to be unproductive (my own unwavering laziness) was no longer available.

## Talk Is Cheap. Execution Is Cheap.

Execution has become cheaper, faster, and more available to people with taste, ideas, patience, scepticism, and enough technical judgement to keep the machine inside the rails.

For years, software execution was constrained by access to people who could translate intention into working systems. If someone had a good idea, they needed a programmer, or they needed to become one. Even for developers, there was the usual drag: choosing a stack, setting up CI/CD, wiring auth, picking a database, remembering the latest blessed incantation for File > New Client Server App + Database, then grinding the motivation down to a smooth protuberance.

Now I can just execute. I direct, review, apply taste, set constraints, care about security, accessibility, performance, architecture, UX, and whether the thing feels good in the hand. The difference is that I spend less time typing code and more time orchestrating outcomes.

I do not really write code anymore.

I write intent, constraints, examples, corrections, reusable guidance, and review notes so the next agent starts with more of my preferences already loaded. Sometimes I write a snippet, but even that usually becomes reference material rather than the main event.

Anyone who knows me knows I hate programming. I strive for perfection, and the years spent learning the machinery still matter because they let me validate what agents do. I've performed all the little rituals and collected all the scars after years of software development work. That fluency helps me inspect the output, intercept errors, set constraints, and know which failures matter.

> The best code is no code. The second best code is code you can throw away. AI produces and reduces code with equal efficiency.

What I like is solving problems, shaping systems, removing friction, making useful things available, and moving on to the next useful thing. AI has made that closer to the default way of working.

## New Habits.

I do not read large documents the way I used to. I get summaries, links, citations, and references back to the original material so I can validate instead of wading through everything in sequence, then send the most concise, informative response with a single Copilot prompt.

I am also working concurrently in a way that used to be reserved for people with staff. While an agent writes this, Claude can be working on a day-job task, Codex can be implementing a feature in a side project, and another agent can be extracting reusable project guidance into a public Codex skill. I can test an iOS build on my phone, send feedback, and ask for a PR when the fix is done.

It is easy to misconstrue this as a "Productivity Hack", but it is simply the new standard shape of any competitively productive person's day.

## Portable Context.

Operating in The New World requires infrastructure. The hosted options are more than sufficient, but to sleep soundly I need some sovereignty.

I continue to secure hardware (storage, RAM, compute) as RAMageddon worsens. I've joined the legions of hobbyists building a NAS to preserve a digital brain because securing portable context is now paramount. My personal and professional knowledge will be organised in a way that can move between models, tools, and environments. Dependence on locked-down systems looks more fragile every year, and hardware price pressure shows no signs of abating.

Every app I build with Codex becomes a reference project for the next one. We extract the generic essence: reusable design systems, utilities, testing concerns, general patterns, practices, and preferences, then stuff it into a [source-controlled skills repo](https://github.com/TheWorstProgrammerEver/codex-skills). Every one-shotted app refines the precision towards a repeatable bullseye.

Even this blog is part of that. It is curated self-digitisation: context I control for my own agents, and a public record that gives external agents a better chance of understanding what I think, what I value, and how I work.

## Compiling English.

At this point, English is _The_ high-level programming language. For decades, we have tried to make programming languages more expressive, more human, and further removed from the machinery underneath. Now the runtime is an AI agent with access to tools, files, documentation, terminals, browsers, and a working memory of what I care about.

Human languages have become executable enough to matter. That is a ridiculous advantage for meatspace native speakers of ubiquitous languages like English. The old priesthood had compilers, frameworks, build systems, SDKs, deployment targets, and command-line rites. Those still matter, but the first interface is now plain language, taste, context, and review.

I say what I want, the machine executes, I inspect the result, and we iterate.

## Retiring Santa Claus.

When I was a kid, I used to ask Santa for a Lego Making Machine. My imagination kept running past what existed on the store shelves. A 3D printer is almost the literal version of that. AI agents are the software version: a machine for producing the parts your idea needs, cheaply enough to try, break, revise, and try again.

What convinced me this had moved from novelty to reality was watching non-technical people build great software.

[A friend of mine](https://youtu.be/4EOmSv9c0TE) (a designer by profession) is now building native apps that interface with highly specific digital audio hardware. A few years ago, that would have been a hard project even for a decent developer with a few thousand hours. Now someone with taste, need, persistence, and the willingness to collaborate with AI can make the tool they actually wanted.

For a long time, software quality has been constrained by who had execution power. A lot of useful tools never existed because the people who understood the need could not build them, and the people who could build them did not understand the need deeply enough. Or they could, but everything got compromised into delivery timelines, programmer art, generic SaaS templates, and "good enough for the sprint".

Lowering the barrier to execution means more talented, well-intentioned people can translate their imagination into a better reality for us all.

## Create A Safe Space.

A lot of AI-generated work is slop. It mangles diagrams, invents labels, sounds confident when it is wrong, and can produce something that looks reliable until you hit the perilous edge case. It needs boundaries, review, and safe places to make mistakes.

The useful way to treat an AI agent is as a very fast junior who can become senior in specific contexts, provided you give it the right environment. Do not put it somewhere it can delete production. Do not hand it secrets it does not need. Do not assume confidence means correctness. Give it a contained workspace, clear expectations, testable outcomes, and enough access to do the job.

If it breaks something catastrophic, there is a good chance you put it somewhere catastrophic breakage was possible.

This is where I think a lot of people are getting the adoption curve wrong. Some are denying it. Some are moralising against it. Some have adopted every fashionable complaint and stopped thinking. Some are using it with reckless confidence. Some are locking it down until there is no utility left.

I am trying to take the boring software-engineering answer: least privilege, maximum useful trust inside constrained environments, review at the boundaries, and more automation every time a pattern repeats.

## The Great Replacement.

A lot of people are worried about being replaced by AI. It's probably inevitable. The trick might be to get ahead of it. It might be that my complacency with the situation developed from a career-imposed penchant for automation. It may just be a stoic (or perhaps nihilistic) realisation that I am not particularly special.

Most of what occupies my time is mere implementation detail on the road to achieving arbitrary objectives, often (especially as an employee) set by other people. In fact, employment itself is an implementation detail. If I can reduce my workload down to 7.6 low-pressure hours of (gently) cracking a digital whip, that feels like a small victory on my part.

When I catch myself doing something manually, I orchestrate it with AI.

If I do it repeatedly, I codify it with AI.

If it requires my judgement, I document that judgement so AI can apply it independently.

Replacement means clearing space for the activities I care about.

If you like painting, do not automate painting. Automate the admin around it. Automate the cataloguing, reference gathering, quality assurance, file wrangling, and invoice chasing. If you like writing, keep writing. Automate the archive, research triage, formatting, and the friction that stops you from starting.

> Keep doing the stuff that gets you out of bed. Automate the stuff that makes you hit snooze.

## The End.

Some people will moralise against the technological revolution.

Some will treat it as a toy, and never realise its potential.

Some will give it too much trust, and learn expensive lessons.

Some will relinquish too much control, and lose their human edge.

The people who benefit most will treat it seriously, contain the risks, review the outputs, and keep improving their own human leverage.

Free markets and game theory will decide your economic value relative to your competitors, digital or otherwise. History is replete with examples of people, companies, and cultures falling into obsolescence.

You can cling to the reins behind a horse's arse, or you can grab the steering wheel behind a combustion engine.

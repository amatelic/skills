---
name: attention-hook
description: Systematic hook generation for stopping the scroll and driving watch time. Use when the user needs video openers, demo intros, or content that converts attention into retention.
user-invocable: true
---


## Step	Action	Output
1. Be Them	What broke today? What meeting are they dreading?	1 raw pain point
2. Feel It	What does that failure cost — time, money, reputation?	The real stakes
3. Fix It	What is the one thing that makes it go away?	Your hook
Rule: If your hook does not make them say "shit, that is me" — rewrite it.

## Hook Formulas (ICP-First)

1. The Contradiction
Everyone says [X], but [ICP's actual reality]
"Everyone says async is the future. My team has 47 Slack threads and zero shipped code."
"They told me TypeScript would catch my bugs. It caught 12. Production caught 340."

2. The 3AM Problem
[Specific failure] at [worst possible moment]
"Demo day. The API rate-limits. The prospect leaves."
"Friday deploy. Sunday pager. Monday resume update."

3. The Pattern Interrupt
[Visual/audio disruption] + [ICP's secret shame]
Slams laptop shut "This is how I lost a $40K client in 4 seconds."
Shows 47 open tabs "This is not productivity. This is fear."

4. The Stakes Hook
If you [action] in the next [timeframe], [ICP's nightmare scenario]
"If you ship this auth pattern, you are one breach away from being the ex-CTO."
"Skip this CSS check and your mobile users are gone before the hero loads."

5. The Insider
[Authority group] does not want you to know [the shortcut they all use]
"Stripe engineers do not write webhooks from scratch. They copy this."
"The agency charging $15K for this setup uses a $12 tool."

Templates by ICP Job-To-Be-Done
Feature Demo (10 seconds)

[Frame 1: ICP's screen, broken]
"This just cost me 2 hours."
[Frame 2: One action, fixed]
"One toggle. 2 hours back."
[Frame 3: Result, no UI chrome]

1 Feature Per Video

[Open on the exact moment it breaks]
"Every [ICP role] hits this wall."

[Feature appears, solves in one motion]
"One line. Wall gone."

"Stop [common practice that is killing them]."
[1-second pause]
"Do this."
[Immediate demonstration, no setup]
Case Study
"[ICP peer] was [their worst case scenario]."
[Quick montage: the mess]
"Then they changed one thing."

[The fix, the result, the relief]
Scroll-Stopping Openers (First 3 Seconds)
Table
Type	Example	ICP Pain
Direct Challenge	"Your landing page is lying to you."	Wasted ad spend
Absurd Specificity	"The $47,000 comma mistake."	Invisible errors
Time Pressure	"This offer dies at midnight."	Missed opportunity
Visual Shock	Screen recording of a crash	Public failure
Authority Flip	"I am a senior dev and I still Google this."	Imposter syndrome
Micro-Story	"Yesterday, a client fired us."	Revenue loss

Pre-Publish Checklist
[ ] First 3 seconds: ICP feels seen, not sold to
[ ] First 5 seconds: Stakes are clear — what breaks if they ignore this
[ ] No branding, logos, intros before the hook lands
[ ] Hook promises exactly what the video delivers
[ ] One fix only — no feature dumping
[ ] Ends with a loop or open question for next video

Anti-Patterns That Kill Retention


Pattern	Why ICP Bounces	Fix
"Hey guys, welcome back..."	Assumes loyalty not earned	Cut to the pain in frame 1
Listing features	No emotional hook	Lead with the break, demo the fix
"Today we will talk about..."	Passive, no stakes	Replace with a bold claim or 3AM problem
Logo intro + music	Wastes the 3-second decision	Brand at the end or subtly in-frame
"This is important because..."	Telling, not showing	Show the consequence, let them feel it

Quick Generator
Input: [ICP Role] + [3AM Problem] + [Content Format]
Output: 3 hooks (Contradiction, 3AM Problem, Stakes)

Example:
Input: Frontend Lead, CSS layout breaks on every deploy, 60-second tutorial
Output:
"Everyone says CSS Grid is stable. My staging says otherwise."
"Friday deploy. Monday bug report. Tuesday all-hands. One line fixes it."
"If you ship this layout without this check, your mobile users are gone in 2 seconds."
Design Tree

                ┌─────────────────────────┐
                │  ATTENTION HOOK GENERATOR │
                │      DESIGN TREE          │
                └───────────┬─────────────┘
                            │
                ┌───────────▼───────────┐
          Q1    │   WHO IS THE USER?      │
                │   Solo Creator          │
                │   (needs speed, no team)│
                └───────────┬─────────────┘
                            │
                ┌───────────▼───────────┐
          Q2    │   HOW DO THEY INPUT?  │
                │   Structured Fields     │
                │   (ICP | Problem | Fmt) │
                └───────────┬─────────────┘
                            │
                ┌───────────▼───────────┐
          Q3    │   WHAT IS OUTPUT?       │
                │   3 Labeled Hooks       │
                │   (Contradiction /      │
                │    3AM / Stakes)        │
                └───────────┬─────────────┘
                            │
                ┌───────────▼───────────┐
          Q4    │   HOW IS TONE HANDLED?  │
                │   Inferred from ICP     │
                │   Role (smart default)  │
                └───────────┬─────────────┘
                            │
                ┌───────────▼───────────┐
          Q5    │   WHAT IS THE SCOPE?    │
                │   Hook Only             │
                │   (no CTA, no script)   │
                └───────────┬─────────────┘
                            │
                ┌───────────▼───────────┐
          Q6    │   HOW DO THEY ACCESS?   │
                │   Static Markdown       │
                │   (zero deps, any editor)│
                └───────────┬─────────────┘
                            │
                ┌───────────▼───────────┐
                │     FINAL OUTPUT        │
                │   ┌─────────────────┐   │
                │   │ 3 Hooks + Labels│   │
                │   │ Copy. Paste.    │   │
                │   │ Post.           │   │
                │   └─────────────────┘   │
                └─────────────────────────┘

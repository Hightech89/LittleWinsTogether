# Product Specification

## Project Name
Little Wins Together

## Purpose
Little Wins Together is an online support community for parents raising children with autism. The platform focuses on connection, encouragement, and shared experiences rather than clinical advice or competitive achievement.

The emotional tone of the site should feel calm, reassuring, and safe.

## Core Concept
A forum-style community where parents can talk, support one another, and celebrate progress.

Public users can read discussions.

Posting and commenting requires an account.

Accounts require verified email and allow display names instead of real names.

## Community Principles

The platform should feel:

- Calm
- Safe
- Non-judgmental
- Supportive
- Human

Avoid corporate or high-energy startup language.

Avoid phrases like:
- "success stories"
- "unlock your potential"
- "level up"

Prefer language like:
- support
- connection
- little wins
- community

## MVP Features

Version 1 should include:

- Landing page
- Account creation and login
- Public browsing of discussions
- Category browsing
- Creating posts
- Commenting on posts
- Basic user profiles with display names

## Initial Categories

- General Support
- Daily Little Wins
- School & IEPs
- Behavior & Meltdowns
- Therapies & Services
- Parent Burnout & Self-Care

## Location Tags

Some categories will support location tags to help parents discuss region-specific topics such as school systems and services.

Examples:
- Missouri
- Texas
- Ontario
- UK

Tags should be flexible and optional.

## Technical Direction

Frontend: Next.js  
Backend: Supabase  
Authentication: Supabase email authentication  
Database: PostgreSQL via Supabase

Public reading should be allowed.

Posting and commenting should require authentication.
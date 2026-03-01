# Architecture - Agency Website (p012)

## High-Level Overview

The agency website is a static site built with HTML, CSS, and minimal JS, deployed via Netlify. It serves as the central hub for the agency's online presence.

## Core Components

- **Source**: `src/` contains the website source code.
- **Config**: `netlify.toml` handles deployment settings.
- **Docs**: `docs/` tracks architecture and logs.

## Architectural Decisions

### 1. Project Structure

- **Decision**: Hosted within `p012_agency_hub`.
- **Rationale**: Centralizes all agency-related assets and data in one project.

### 2. Styling

- **Decision**: Vanilla CSS with variables for theming.
- **Rationale**: Maximum control and performance without framework overhead.

### 3. Deployment

- **Decision**: Netlify.
- **Rationale**: Seamless Git integration and fast CDN distribution.

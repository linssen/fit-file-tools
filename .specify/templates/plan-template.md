# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: TypeScript (strict mode) with React 19  
**Primary Dependencies**: @garmin/fitsdk (official FIT SDK), Leaflet (maps), React, Vite  
**Storage**: Client-side only (browser localStorage, no server/database)  
**Testing**: Jest + React Testing Library (90%+ coverage required)  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)  
**Project Type**: Single-page web application (client-side only)  
**Performance Goals**: 
- Lighthouse score > 90
- Handle FIT files up to 50MB without blocking UI
- Lazy loading for large datasets (GPS tracks with 1000s of points)

**Constraints**: 
- NO server-side processing (all in-browser)
- NO data transmission to external servers
- NO backend dependencies
- Client-side privacy MUST be preserved

**Scale/Scope**: Single-user, client-side application for personal FIT file analysis

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I - Client-Side Privacy First** (NON-NEGOTIABLE):
- [ ] Feature processes all data in-browser only
- [ ] No external server calls or data transmission
- [ ] No cookies or analytics without explicit consent
- [ ] User data never leaves their device

**Principle II - Type Safety & Modern Tooling**:
- [ ] All code written in TypeScript with strict mode
- [ ] No `any` types (justified exceptions only with eslint-disable comment)
- [ ] Vite build configuration updated if needed
- [ ] ESLint and Prettier rules followed

**Principle III - Test-First Development**:
- [ ] Tests written before implementation (TDD)
- [ ] 90%+ coverage for all new code
- [ ] Test fixtures created for FIT file scenarios
- [ ] Edge cases and error conditions tested

**Principle IV - Component-Based Architecture**:
- [ ] New components follow single responsibility principle
- [ ] Props interfaces explicitly typed
- [ ] Each component has corresponding test file
- [ ] Clear separation: presentational vs. container components

**Principle V - Browser Compatibility & Performance**:
- [ ] Responsive design (mobile and desktop)
- [ ] Lazy loading for large datasets if applicable
- [ ] Lighthouse score > 90 maintained
- [ ] No UI blocking for file processing

**Principle VI - Dependency Security**:
- [ ] No new dependencies without justification
- [ ] `yarn audit` passes with no critical/high vulnerabilities
- [ ] Bundle size impact assessed
- [ ] Only @garmin/fitsdk allowed for FIT parsing

**Quality Gates**:
- [ ] TypeScript compilation (`tsc --noEmit`)
- [ ] Linting (`yarn lint`)
- [ ] Formatting (`yarn format:check`)
- [ ] Tests with 90% coverage (`yarn test:coverage`)
- [ ] Security audit (`yarn audit --groups dependencies`)
- [ ] Build success (`yarn build`)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# FIT File Tools - Single-page React Application Structure
src/
├── components/          # React components (one per feature concern)
│   ├── [Component].tsx
│   └── ...
├── [feature].ts        # Business logic modules
├── [feature].tsx       # Main app component
├── styles.css          # Global styles
└── index.tsx           # Application entry point

src/__tests__/
├── components/         # Component tests (mirrors src/components/)
│   ├── [Component].test.tsx
│   └── ...
├── [feature].test.ts   # Module tests
├── fixtures/           # Test data (FIT files, mock data)
│   ├── README.md
│   └── *.fit
└── setup.ts            # Jest test configuration
```

**Structure Decision**: Single-page application with component-based architecture. All code in `src/`, all tests in `src/__tests__/` mirroring the source structure. No backend or API directories as all processing is client-side.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

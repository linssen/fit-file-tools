<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 → 1.1.0
Rationale: Added dependency security and supply chain requirements (MINOR - new guidance)

Modified Principles:
- None (existing principles unchanged)

Added Sections:
- VI. Dependency Security & Supply Chain Safety (new principle)
- Enhanced Dependency Management under Quality Standards
- Added dependency audit to Quality Gates in Development Workflow

Templates Requiring Updates:
✅ plan-template.md - Already aligned, no changes needed
✅ spec-template.md - Already aligned, no changes needed
✅ tasks-template.md - Already aligned, no changes needed

Follow-up TODOs:
- Configure yarn.lock committed to repository
- Setup .yarnrc.yml with cache configuration
- Add yarn audit to CI/CD pipeline
- Enable Dependabot or similar for automated security updates
-->

# FIT File Tools Constitution

## Core Principles

### I. Client-Side Privacy First

All FIT file processing MUST occur entirely in the browser with zero server dependencies. This principle is NON-NEGOTIABLE and reflects the core value proposition of user data privacy.

**Requirements**:
- No data transmission to external servers
- File processing using browser-native APIs and WebAssembly-compatible libraries
- Local storage only (no cookies, no analytics)
- Clear communication to users that their data never leaves their device

**Rationale**: Users trust us with sensitive fitness and health data. Client-side processing eliminates privacy concerns, reduces infrastructure costs, and enables offline functionality.

### II. Type Safety & Modern Tooling

All source code MUST be written in TypeScript with strict type checking enabled. Build and development tooling MUST prioritize developer experience and fast iteration cycles.

**Requirements**:
- Strict TypeScript configuration (`strict: true` in tsconfig.json)
- No `any` types without explicit justification and documentation
- Vite for build system (fast HMR, optimized production builds)
- ESLint + Prettier for code quality and consistency
- Pre-commit hooks via Husky for automated quality checks

**Rationale**: Type safety catches errors at compile time, improves IDE support, serves as living documentation, and reduces runtime bugs. Modern tooling enables rapid development without sacrificing quality.

### III. Test-First Development

Test coverage MUST exceed 90% for all new code. Tests MUST be written before implementation (TDD) when feasible, especially for complex parsing logic and user interactions.

**Requirements**:
- Jest + React Testing Library for all component and integration tests
- Test fixtures for FIT file parsing validation
- Coverage reports required in CI/CD pipeline
- Tests MUST pass before merge to main branch
- Edge cases and error conditions MUST have explicit test coverage

**Rationale**: FIT file parsing is complex and error-prone. High test coverage ensures reliability, prevents regressions, and documents expected behavior. TDD forces clear thinking about requirements before implementation.

### IV. Component-Based Architecture

UI MUST be decomposed into small, reusable, single-responsibility React components. Each component MUST be independently testable and documented.

**Requirements**:
- Components follow single responsibility principle (one primary purpose)
- Props interfaces explicitly typed
- Component composition over inheritance
- Clear separation: presentational components vs. container components
- Each component has corresponding test file

**Rationale**: Small, focused components are easier to understand, test, maintain, and reuse. This architecture scales better as the application grows and enables parallel development.

### V. Browser Compatibility & Performance

The application MUST work on modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions) with responsive design for desktop and mobile. Performance MUST be optimized for large FIT files.

**Requirements**:
- Responsive CSS (works on mobile and desktop viewports)
- Lazy loading for large datasets (GPS tracks with thousands of points)
- Progressive enhancement (graceful degradation when features unavailable)
- Lighthouse performance score > 90 for production builds
- File processing should handle files up to 50MB without blocking UI

**Rationale**: Users access fitness data from various devices. Large GPS tracks can contain thousands of data points. Efficient rendering and processing ensure good user experience across devices and file sizes.

### VI. Dependency Security & Supply Chain Safety

All dependencies MUST be audited for security vulnerabilities. The project MUST use Yarn's built-in security features for caching, integrity verification, and vulnerability detection.

**Requirements**:
- `yarn.lock` MUST be committed to version control (ensures reproducible builds)
- Yarn offline cache MUST be enabled for faster, reproducible installations
- `yarn audit` MUST run in CI/CD pipeline and fail on high/critical vulnerabilities
- Security advisories MUST be addressed within 7 days for critical, 30 days for high severity
- Dependency updates MUST include security audit review before merge
- Use `yarn audit --json` for machine-readable vulnerability reports in CI

**Rationale**: Supply chain attacks are a growing threat. Yarn's cache ensures we can reproduce builds even if packages are removed from registry. Automated auditing catches known vulnerabilities before they reach production. Lock file prevents unexpected dependency changes that could introduce malicious code.

## Quality Standards

**Code Quality**:
- All code MUST pass linting (`yarn lint`) with zero errors
- All code MUST be formatted with Prettier (`yarn format`)
- TypeScript MUST compile without errors (`tsc --noEmit`)
- Build MUST succeed (`yarn build`) before merge

**Documentation**:
- README.md MUST be kept current with setup and usage instructions
- Complex algorithms (especially FIT parsing) MUST have inline comments
- Component props MUST have JSDoc comments for non-obvious interfaces
- `.github/copilot-instructions.md` MUST reflect current architecture patterns

**Dependency Management**:
- Dependencies MUST be kept reasonably current (security patches applied promptly)
- New dependencies MUST be justified (solve real problem, actively maintained)
- Bundle size impact MUST be considered before adding dependencies
- Official Garmin FIT SDK (`@garmin/fitsdk`) is the only allowed FIT parsing library

**Dependency Security**:
- `yarn.lock` MUST be committed and never ignored in `.gitignore`
- Run `yarn audit` before adding or updating dependencies
- Zero-install or offline cache SHOULD be configured via `.yarnrc.yml`
- Integrity hashes in `yarn.lock` MUST NOT be manually modified
- Dependency changes MUST include audit output in PR description
- Critical/high vulnerabilities MUST block PR merge until resolved

## Development Workflow

**Branch Strategy**:
- `main` branch is protected and always deployable
- Feature branches follow naming: `feature/descriptive-name`
- All changes MUST go through Pull Request review
- GitHub Actions MUST pass all quality checks before merge

**Quality Gates** (enforced in CI/CD):
1. TypeScript compilation (`tsc --noEmit`)
2. Linting (`yarn lint`)
3. Formatting check (`yarn format:check`)
4. Test suite (`yarn test`)
5. Test coverage threshold (90%+)
6. Dependency security audit (`yarn audit --groups dependencies`)
7. Production build success (`yarn build`)

**Review Process**:
- PRs MUST include description of changes and testing performed
- At least one approval required before merge
- Automated checks MUST pass (non-negotiable)
- Breaking changes MUST be documented in PR description

## Governance

This constitution supersedes all other development practices and guidelines. All code reviews, feature implementations, and architectural decisions MUST comply with these principles.

**Amendment Process**:
1. Proposed changes MUST be documented with rationale
2. Impact assessment on existing codebase required
3. Update constitution version according to semantic versioning:
   - **MAJOR**: Removing or redefining core principles
   - **MINOR**: Adding new principles or expanding guidance
   - **PATCH**: Clarifications, typo fixes, non-semantic changes
4. Migration plan required for breaking governance changes
5. Update `.github/copilot-instructions.md` to reflect changes

**Compliance**:
- All Pull Requests MUST verify alignment with constitution principles
- Complexity MUST be justified when introducing architectural deviations
- Constitution violations require explicit justification and approval
- Runtime development guidance available in `.github/copilot-instructions.md`

**Version**: 1.1.0 | **Ratified**: 2025-12-04 | **Last Amended**: 2025-12-04

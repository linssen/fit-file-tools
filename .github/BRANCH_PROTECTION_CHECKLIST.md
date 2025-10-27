# Branch Protection Quick Setup Checklist

## Prerequisites
✅ Repository: `linssen/fit-file-tools`
✅ PR Checks workflow exists: `.github/workflows/pr-checks.yml`
✅ 4 status checks configured: Lint Code, Check Formatting, Run Tests, Build Application

## Setup Steps

### 1. Access Settings
- [ ] Go to https://github.com/linssen/fit-file-tools/settings
- [ ] Click **Branches** in left sidebar
- [ ] Click **Add branch protection rule** (or edit existing)

### 2. Basic Configuration
- [ ] Branch name pattern: `master`

### 3. Required Status Checks
- [ ] ✅ Check "Require a pull request before merging"
  - [ ] Set required approvals: 1
  - [ ] Check "Dismiss stale pull request approvals when new commits are pushed"

- [ ] ✅ Check "Require status checks to pass before merging"
  - [ ] Check "Require branches to be up to date before merging"
  - [ ] Add required status checks (search and select):
    - [ ] `Lint Code`
    - [ ] `Check Formatting`
    - [ ] `Run Tests`
    - [ ] `Build Application`

### 4. Additional Protection
- [ ] ✅ Check "Require conversation resolution before merging"
- [ ] ✅ Check "Do not allow bypassing the above settings"
- [ ] ✅ Check "Require linear history"
- [ ] ✅ Check "Include administrators"
- [ ] ⬜ Leave "Allow force pushes" UNCHECKED
- [ ] ⬜ Leave "Allow deletions" UNCHECKED

### 5. Save
- [ ] Click **Create** or **Save changes**

## Verification
- [ ] Create test PR
- [ ] Verify all 4 checks run
- [ ] Verify merge button is disabled until checks pass
- [ ] Verify checks appear in PR status

## Status Check Names (Must Match Exactly)
```
Lint Code
Check Formatting
Run Tests
Build Application
```

## Quick Links
- Settings: https://github.com/linssen/fit-file-tools/settings/branches
- Workflow: .github/workflows/pr-checks.yml
- Full Guide: .github/BRANCH_PROTECTION_SETUP.md

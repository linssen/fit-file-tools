# Branch Protection Setup Guide

This guide explains how to configure branch protection rules for the `master` branch to ensure all PR checks pass before merging.

## Required Checks

The repository has the following automated checks that run on every pull request:

1. **Lint Code** - ESLint code quality checks
2. **Check Formatting** - Prettier code formatting verification
3. **Run Tests** - Jest test suite with coverage reporting
4. **Build Application** - Production build verification

## Setup Instructions

### Step 1: Navigate to Branch Protection Settings

1. Go to your GitHub repository: `https://github.com/linssen/fit-file-tools`
2. Click on **Settings** (top navigation)
3. In the left sidebar, click **Branches** (under "Code and automation")
4. Click **Add branch protection rule** (or edit existing rule if one exists)

### Step 2: Configure Protection Rule

#### Basic Settings
- **Branch name pattern**: `master`

#### Required Settings to Enable

Check the following boxes:

✅ **Require a pull request before merging**
   - ✅ **Require approvals**: 1 (optional, but recommended)
   - ✅ **Dismiss stale pull request approvals when new commits are pushed** (recommended)

✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging** (recommended)
   - In the search box that appears, add these required status checks:
     - `Lint Code`
     - `Check Formatting`
     - `Run Tests`
     - `Build Application`
   
   > **Note**: These status check names must match exactly with the job names in `.github/workflows/pr-checks.yml`

✅ **Require conversation resolution before merging** (optional, but recommended)

✅ **Do not allow bypassing the above settings** (recommended for strict enforcement)

#### Optional but Recommended Settings

- ✅ **Require linear history** - Prevents merge commits, requires rebase or squash
- ✅ **Include administrators** - Applies rules to repository administrators too
- ⬜ **Allow force pushes** - Leave unchecked for safety
- ⬜ **Allow deletions** - Leave unchecked for safety

### Step 3: Save Changes

Click **Create** or **Save changes** at the bottom of the page.

## Testing the Setup

1. Create a test branch: `git checkout -b test/branch-protection`
2. Make a small change and push it
3. Create a pull request to `master`
4. Verify that:
   - All 4 status checks run automatically
   - The merge button is disabled until all checks pass
   - If any check fails, you cannot merge

## Troubleshooting

### Status Checks Not Appearing

If the status check names don't appear in the search box:

1. Create and merge at least one PR first (this registers the checks with GitHub)
2. Wait a few minutes and try again
3. Make sure the workflow file is on the `master` branch

### Check Names Don't Match

The status check names in branch protection **must exactly match** the `name:` field in each job in `.github/workflows/pr-checks.yml`:

```yaml
jobs:
  lint:
    name: Lint Code        # ← Must match exactly
  
  format:
    name: Check Formatting  # ← Must match exactly
  
  test:
    name: Run Tests        # ← Must match exactly
  
  build:
    name: Build Application # ← Must match exactly
```

### Bypass Protection (Emergency Only)

If you need to bypass protection rules temporarily:

1. Go to Settings → Branches → Edit protection rule
2. Uncheck the rules you need to bypass
3. Merge your PR
4. **Important**: Re-enable the rules immediately after

## Verification

After setup, your `master` branch will be protected and:

- ✅ All code must go through pull requests
- ✅ All 4 automated checks must pass (lint, format, test, build)
- ✅ Code reviews are required (if enabled)
- ✅ No direct pushes to master
- ✅ Force pushes are blocked
- ✅ Branch deletions are blocked

## Current PR Workflow

With these settings, the workflow for merging code will be:

1. **Create feature branch**: `git checkout -b feature/my-feature`
2. **Make changes and commit**: `git commit -m "feat: add feature"`
3. **Push branch**: `git push origin feature/my-feature`
4. **Create PR**: Open PR to `master` on GitHub
5. **Wait for checks**: All 4 status checks must pass ✅
6. **Get approval**: If required, get code review approval
7. **Merge**: Click merge button (only enabled when all checks pass)

## Additional Security (Optional)

For additional security, you can also enable:

- **CODEOWNERS file**: Require specific people to review certain files
- **Required reviews**: Increase to 2+ reviewers for critical changes
- **Signed commits**: Require GPG-signed commits
- **Restrict who can push**: Limit push access to specific people/teams

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Required Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging)

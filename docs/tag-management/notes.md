# Writing Notes & Version Control

Good documentation isn't just about writing code that works—it's about writing code that your future self (and your teammates) will thank you for. Trust me, there's nothing worse than staring at a library update from three months ago wondering "What was I thinking?" Let's make sure that never happens.

## Version Control Strategy

We follow the standard semantic versioning approach using the `x.y.z` format:

- **x (Major)**: Breaking changes that aren't backwards compatible
- **y (Minor)**: New features that maintain backwards compatibility  
- **z (Patch)**: Bug fixes and small improvements

### When to Bump Which Number

**Major Version (x.x.0)**
- Removing or significantly changing existing functionality
- Changing data layer structure that would break existing implementations
- Updating core dependencies that require site-wide changes
- Removing deprecated features

**Minor Version (x.y.0)**
- Adding new tracking capabilities
- Introducing new rules or triggers
- Adding new data layer variables
- Enhancing existing features without breaking changes

**Patch Version (x.y.z)**
- Fixing tracking bugs
- Correcting typos in variable names
- Performance improvements
- Security patches
- Documentation updates

## Writing Effective Update Notes

Your update notes should follow a structured format similar to git commit messages. Think of them as a conversation with your future self—clear, concise, and informative.

### Note Structure

```
<type>: <description>

[optional body]

[optional breaking changes]
```

### Types

- **feat**: New feature or capability
- **fix**: Bug fix or correction
- **perf**: Performance improvement
- **refactor**: Code restructuring without functional changes
- **docs**: Documentation updates
- **style**: Formatting changes (whitespace, etc.)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

**Good Examples:**

```
feat: add enhanced ecommerce tracking for checkout process

- Implemented purchase event tracking
- Added product impression tracking on category pages  
- Updated data layer with transaction details
```

```
fix: resolve duplicate page view events on SPA navigation

The router was firing events before the previous page cleanup completed.
Added debounce logic to prevent double-firing.

Breaking Changes: None
```

```
refactor: consolidate custom event helpers into utility module

Moved scattered helper functions into centralized utils.
No functional changes to tracking behavior.
```

**What Not to Do:**

```
misc updates
```

```
fixed stuff
```

```
updated things for Stu
```

Remember, these notes aren't just for compliance—they're your breadcrumbs back to sanity when something inevitably breaks at 4 PM on a Friday.

## Best Practices

### Be Specific
Instead of "updated tracking," write "added conversion tracking for newsletter signups." Your teammates (and future you) will appreciate the context.

### Include the Why
Don't just say what you changed, explain why you changed it. "Fixed button click tracking" tells us what, but "Fixed button click tracking to resolve attribution gaps in campaign reporting" tells us why it mattered.

### Reference Tickets
When applicable, reference the relevant ticket or request number. It creates a paper trail that's invaluable during troubleshooting.

### Test Notes
If you've tested the changes, mention it briefly. "Verified in staging environment" or "Tested across Chrome, Firefox, Safari" gives confidence in the deployment.

### Breaking Changes
Always call out breaking changes explicitly. Even if you think they're obvious, someone else might not realize the impact.

## Version Tagging in Adobe Tag Manager

When creating a new version in Adobe Tag Manager:

1. **Use descriptive version names**: Instead of "Version 12," use "v2.1.0 - Enhanced Ecommerce Update"
2. **Include the semantic version number** in both the name and notes
3. **Summarize key changes** in the version description
4. **Test thoroughly** before publishing to production

## Quick Reference

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| New tracking feature | Minor (x.Y.0) | Added social media event tracking |
| Breaking data layer change | Major (X.0.0) | Restructured product object schema |
| Bug fix | Patch (x.y.Z) | Fixed mobile scroll tracking |
| Performance optimization | Patch (x.y.Z) | Reduced tag firing latency |

Remember: Good documentation is like good code—it should be self-explanatory, but when it's not, the comments (or notes) should make it crystal clear. Your future self will thank you, and your teammates will actually enjoy working with your updates instead of trying to decode what you were thinking at the time.

*Now go forth and document responsibly!*
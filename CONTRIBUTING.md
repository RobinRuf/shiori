# Contributing to Shiori (栞)

[Shiori (栞)](https://github.com/RobinRuf/shiori) is an open-source project aimed at improving documentation development and provide a simple way to implement it. Your contributions help make the project way better. This guide explains how you can contribute.

## Get Involved

There are many ways to contribute to Shiori, even without writing code:

- **Use Shiori**: Test the [installation](https://shiori.page/docs/getting-started) and report issues via [Issues](#issues).
- **Report bugs & suggest improvements**: Help triage existing [issues](https://github.com/RobinRuf/shiori/issues) or open new ones.
- **Discuss new features**: Check out the [feature requests](https://github.com/RobinRuf/shiori/issues?q=label%3Afeature) or propose your own.

## Triaging Issues and Pull Requests

You can help by sorting issues and PRs:

- Ask for missing details in issues
- Suggest labels
- Flag stale issues
- Review code changes

### Branch Organization

- Never develop on the **`main`** branch.
- Features, fixes and other changes are developed in separate branches and merged via pull requests.

## Issues

### How to Create an Issue

When opening an issue, please fill out the provided template. **Incomplete issues may be ignored.**

Provide any screenshots or videos if necessary.

### Bug Reports

- **One bug per issue:** Each issue should focus on a single problem.
- **Provide reproduction steps:** Describe exactly how to reproduce the bug.
- **Example files or screenshots are helpful.**

If you want to fix a bug, you can open a PR directly, but a prior issue helps with tracking.

### Feature Requests

For new features or enhancements, please create an issue with a clear description and possible use cases.

## Development

### Code Conventions

- Follow the existing code style.
- ESLint and Prettier are used for formatting.

## Pull Requests

### How to Create a PR

1. **Fork the repository and create a new branch.**
2. **Make your changes and ensure tests (if available in the project) pass. (If you implemented a new feature, please consider to write jest tests for it as well.)**
3. **Open a PR with a clear description.**
4. **Run tests and confirm everything works as expected.**
5. **The code will be reviewed by a maintainer before merging.**

### PR Guidelines

- **Keep PRs small (~300 lines diff max) whenever possible.**
- **Use descriptive titles.**
- **Ensure consistent code style (Prettier & ESLint help).**
- **Run tests (if available) and provide screenshots/videos for UI changes.**

## Commit Messages
It should be a descriptive message so that everyone understands what you have done.

If you wish, you can use this format (not mandatory):
`<type>(<scope>): <subject>`

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation change
- `refactor`: Code improvement without behavior change
- `test`: Adding or improving tests
- `chore`: Maintenance tasks

Example:
```sh
feat(core): Improve configuration options
```

## Test Plan

- **Build the project and run `npm test` (if tests are available).**
- If UI changes are made, provide screenshots or videos.
- If APIs are modified, provide documentation updates as a comment in your PR.

## Licensing

By submitting a pull request, you agree that your code will be released under the MIT license. Additionally, you confirm that the submitted code is your intellectual property and does not contain any third-party code without explicit permission from the owner.

## Breaking Changes

If your PR introduces a breaking change, add a description:
```md
### Breaking Change: New API Syntax
- **Who is affected**: All users using API X.
- **Migration steps**: Change `oldMethod()` to `newMethod()`.
- **Reason**: Simplification of API.
```

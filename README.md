# Skills Repository

A collection of reusable skills for AI assistants. Each skill is a self-contained module with instructions and best practices for specific tasks.

## Installation

```bash
npm install skills
```

## Usage

### Importing a Skill

```bash
npx skills@latest add <skill-name>
```

Example:
```bash
npx skills@latest add write-tests
```

This will download the skill and add it to your project's `.claude/skills/` directory.

### Listing Available Skills

```bash
npm run list
```

### Validating Skills

```bash
npm run validate
```

### Using a Skill

Each skill is contained in its own directory under `skills/` with a `SKILL.md` file.

To use a skill, read the `SKILL.md` file and follow the instructions.

Example:
```bash
cat skills/debug-code/SKILL.md
```

## Repository Structure

```
.
├── package.json
├── README.md
├── scripts/
│   ├── list-skills.js
│   └── validate.js
└── skills/
    ├── debug-code/
    │   └── SKILL.md
    ├── refactor-code/
    │   └── SKILL.md
    └── write-tests/
        └── SKILL.md
```

## Creating a New Skill

1. Create a new directory under `skills/` with a descriptive name
2. Add a `SKILL.md` file with the following structure:

```markdown
---
name: skill-name
description: Brief description of what this skill does
version: 1.0.0
user-invocable: true
argument-hint: "[optional] [arguments]"
---

# Skill Title

## Section 1

Instructions and guidance...

## Section 2

More instructions...
```

### Frontmatter Fields

- **name**: Unique identifier for the skill
- **description**: What the skill does and when to use it
- **version**: Semantic version (e.g., 1.0.0)
- **user-invocable**: Whether users can directly invoke this skill
- **argument-hint**: Optional hint for arguments

## Available Skills

### debug-code
Systematic debugging approach for identifying and fixing bugs.

### refactor-code
Improve code quality by restructuring existing code.

### write-tests
Create comprehensive test suites for code.

## Contributing

1. Create a new skill following the format above
2. Run validation: `npm run validate`
3. Test the skill with your AI assistant
4. Submit a pull request

## License

MIT

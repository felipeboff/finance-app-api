# Finance App API

### Description

A modern finance application API built with TypeScript, providing robust financial management features.

### Features

- TypeScript-based API
- Modern development setup with ESLint and Prettier
- Git hooks with Husky for code quality
- Commit message linting
- Type safety with TypeScript

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd finance-app
```

2. Install dependencies:

```bash
npm install
```

### Development

The project uses several development tools to ensure code quality:

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- TypeScript for type safety

### Scripts

- `npm run prepare`: Sets up Husky git hooks

### Project Structure

```
finance-app/
├── .husky/           # Git hooks configuration
├── node_modules/     # Dependencies
├── .gitignore       # Git ignore rules
├── eslint.config.js # ESLint configuration
├── index.ts         # Main application file
├── package.json     # Project configuration
└── tsconfig.json    # TypeScript configuration
```

import { TypeScriptProject } from 'projen';
import { NodePackageManager } from 'projen/lib/javascript';
import { NxConfigComponent } from './.projen/components';

/**
 * Main projen configuration for vibe-cli
 * 
 * This file controls the generation of configuration files across the repository,
 * including nx.json, tsconfig files, and eventually AI tool configurations.
 */
const project = new TypeScriptProject({
  // Project metadata
  name: 'vibe-cli',
  defaultReleaseBranch: 'main',
  
  // Package management
  packageManager: NodePackageManager.PNPM,
  pnpmVersion: '8.x',
  
  // Module system
  jest: false, // We'll configure Jest separately with Nx
  tsconfig: {
    compilerOptions: {
      // Environment setup & latest features
      lib: ['DOM', 'ESNext'],
      target: 'ESNext',
      module: 'ESNext',
      moduleDetection: 'force',
      jsx: 'react-jsx',
      allowJs: true,

      // Bundler mode
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      verbatimModuleSyntax: true,
      noEmit: true,

      // Best practices
      strict: true,
      skipLibCheck: true,
      noFallthroughCasesInSwitch: true,
      noUncheckedIndexedAccess: true,

      // Some stricter flags (disabled by default)
      noUnusedLocals: false,
      noUnusedParameters: false,
      noPropertyAccessFromIndexSignature: false,
    },
  },

  // Dependencies
  deps: [],
  devDeps: [
    '@nx/devkit@21.1.3',
    '@nx/eslint@21.1.3',
    '@nx/eslint-plugin@21.1.3',
    '@nx/jest@21.1.3',
    '@nx/js@21.1.3',
    '@nx/node@21.1.3',
    '@nx/vite@21.1.3',
    '@nx/web@21.1.3',
    '@nx/workspace@21.1.3',
    '@openai/codex@0.1.2505172129',
    '@types/bun@latest',
    '@types/express@^4.17.0',
    '@types/jest@^29.5.5',
    '@types/node@^20.0.0',
    '@types/react@^18.0.0',
    '@types/react-dom@^18.0.0',
    '@types/socket.io@^3.0.2',
    '@typescript-eslint/eslint-plugin@^7.0.0',
    '@typescript-eslint/parser@^7.0.0',
    'eslint@^8.56.0',
    'eslint-plugin-import@^2.29.1',
    'eslint-plugin-jest@^27.6.0',
    'eslint-plugin-jsx-a11y@^6.8.0',
    'eslint-plugin-react@^7.33.2',
    'eslint-plugin-react-hooks@^4.6.0',
    'jest@^29.7.0',
    'jest-environment-jsdom@^29.7.0',
    'jest-environment-node@^29.7.0',
    'nx@21.1.3',
    'nx-cloud@latest',
    'ts-jest@^29.1.1',
    'ts-node@^10.9.2',
  ],
  peerDeps: [
    'typescript@^5',
  ],

  // Workspace structure
  workspaceLayout: {
    appsDir: 'apps',
    libsDir: 'libs',
  },

  // TypeScript configuration
  sampleCode: false,
  
  // GitHub settings - anti-tamper disabled for POC
  github: false,
  gitignore: [
    'node_modules',
    'dist',
    'coverage',
    '.env',
    '.nx/cache',
    '**/.DS_Store',
  ],

  // Package.json customization for Bun compatibility
  package: {
    type: 'module',
    scripts: {
      'nx': 'nx',
      'start': 'bun run index.ts',
      'test': 'nx run-many --target=test --all',
      'lint': 'nx run-many --target=lint --all',
      'typecheck': 'tsc --noEmit',
      'build': 'nx run-many --target=build --all',
      'dev': 'nx run-many --target=dev --all',
      'affected:test': 'nx affected --target=test',
      'affected:lint': 'nx affected --target=lint',
      'affected:build': 'nx affected --target=build',
      'graph': 'nx graph',
      'format': 'nx format:write',
    },
  },
});

// Add Nx configuration
new NxConfigComponent(project, {
  version: '21.1.3',
  appsDir: 'apps',
  libsDir: 'libs',
  defaultBase: 'main',
});

// Synthesize the project
project.synth();

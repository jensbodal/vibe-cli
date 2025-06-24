import { typescript, javascript } from 'projen';

/**
 * Main projen configuration for vibe-cli
 * 
 * This file controls the generation of configuration files across the repository,
 * including nx.json, tsconfig files, and eventually AI tool configurations.
 */
const project = new typescript.TypeScriptProject({
  // Project metadata
  name: 'vibe-cli',
  defaultReleaseBranch: 'main',
  
  // Package management
  // Switch to Bun as requested
  packageManager: javascript.NodePackageManager.BUN,
  
  // Module system
  jest: false, // We'll configure Jest separately with Nx
  tsconfig: {
    compilerOptions: {
      // Environment setup & latest features
      lib: ['DOM', 'ESNext'],
      target: 'ESNext',
      module: 'ESNext',
      moduleResolution: 'node', // Required for resolveJsonModule
      jsx: 'react-jsx', // Support JSX
      allowJs: true,

      // ES Module support
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
    include: [
      '*.ts',
      'apps/**/*.ts',
      'apps/**/*.tsx', 
      'libs/**/*.ts',
      'agents/**/*.ts'
    ],
  },

  // Dependencies
  deps: [],
  devDeps: [
    '@nx/devkit@21.2.0',
    '@nx/eslint@21.2.0',
    '@nx/eslint-plugin@21.2.0',
    '@nx/jest@21.2.0',
    '@nx/js@21.2.0',
    '@nx/node@21.2.0',
    '@nx/vite@21.2.0',
    '@nx/web@21.2.0',
    '@nx/workspace@21.2.0',
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
    'nx@21.2.0',
    'nx-cloud@latest',
    'ts-jest@^29.1.1',
    'ts-node@^10.9.2',
    'typescript@^5.8.3',
  ],
  peerDeps: [
    'typescript@^5.8.3',
  ],

  // Workspace structure
  // TypeScript configuration
  sampleCode: false,
  srcdir: '.', // Use root directory, not src/
  libdir: 'dist', // Output to dist/
  
  // GitHub settings - anti-tamper disabled for POC
  github: false,
  gitignore: [
    'node_modules',
    'dist',
    'coverage',
    '.env',
    '.nx/cache',
    '.nx/workspace-data', // Nx workspace cache files
    '**/.DS_Store',
    
    // Development environment files
    '.envrc.local',
    '__pycache__/',
    '/.direnv/',
    '/.idea/',
    '/.trash/',
    
    // Private files
    '.private/.*.*',
    '.private/*.*',
    '!.private/.gitkeep',
    '*.key',
    '*.crt',
    
    // macOS
    'macos/automator/testing.workflow/',
    
    // Project specific
    '/node_modules/',
    '/scripts/ideas/work/',
    '/scripts/moxi/.ai/logs',
    '.DS_Store',
    '.aider.chat.history.md', // Aider chat history (not config)
    '.aider.input.history',   // Aider input history (not config)
    '.aider.tags.cache.v4/',  // Aider tag cache (not config)
    '/ai/lib/',
    'vault.yml',
    
    // Dependencies we never want to scan or push
    '.direnv/',
    '.venv/',
    'node_modules/',
    'site-packages/',
    
    // Claude Code local settings
    '.claude/**',
  ],

  // Additional configuration will be handled by postSynthesize
});

// Note: Nx configuration will be managed manually for now

// Customize package.json after synthesis
project.package.addField('type', 'module');
project.package.setScript('nx', 'nx');
project.package.setScript('start', 'bun run index.ts');
project.package.setScript('test', 'nx run-many --target=test --all');
project.package.setScript('lint', 'nx run-many --target=lint --all');
project.package.setScript('typecheck', 'tsc --noEmit');
project.package.setScript('build', 'nx run-many --target=build --all');
project.package.setScript('dev', 'nx run-many --target=dev --all');
project.package.setScript('affected:test', 'nx affected --target=test');
project.package.setScript('affected:lint', 'nx affected --target=lint');
project.package.setScript('affected:build', 'nx affected --target=build');
project.package.setScript('graph', 'nx graph');
project.package.setScript('format', 'nx format:write');

// Allow the JS file to be committed
project.gitignore.include('!/.projenrc.js');

// Synthesize the project
project.synth();
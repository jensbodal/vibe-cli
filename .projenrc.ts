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
  // Switch to Bun as requested
  packageManager: NodePackageManager.BUN,
  
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
  devDeps: [],
  peerDeps: [
    'typescript@^5',
  ],

  // Workspace structure
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
      'test': 'bun test --coverage',
      'lint': 'tsc --noEmit',
      'typecheck': 'tsc --noEmit',
    },
  },
});

// Add Nx configuration
new NxConfigComponent(project, {
  version: '21.2.0',
  appsDir: 'apps',
  libsDir: 'libs',
  defaultBase: 'main',
});

// Synthesize the project
project.synth();

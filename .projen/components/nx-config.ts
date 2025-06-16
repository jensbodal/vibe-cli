import { Component, JsonFile, Project } from 'projen';

/**
 * Options for the NxConfigComponent
 */
export interface NxConfigOptions {
  /**
   * The version of Nx to use
   * @default '21.1.3'
   */
  readonly version?: string;

  /**
   * The directory where applications are stored
   * @default 'apps'
   */
  readonly appsDir?: string;

  /**
   * The directory where libraries are stored
   * @default 'libs'
   */
  readonly libsDir?: string;

  /**
   * Default base branch for affected commands
   * @default 'main'
   */
  readonly defaultBase?: string;

  /**
   * (future options could be added here)
   */
}

/**
 * Component that generates a minimal `nx.json` matching the structure on `main`
 */
export class NxConfigComponent extends Component {
  /** Nx version (kept for future use) */
  public readonly version: string;

  /** workspace layout directories */
  public readonly appsDir: string;
  public readonly libsDir: string;

  constructor(project: Project, options: NxConfigOptions = {}) {
    super(project);

    this.version = options.version ?? '21.2.0';
    this.appsDir = options.appsDir ?? 'apps';
    this.libsDir = options.libsDir ?? 'libs';

    const defaultBase = options.defaultBase ?? 'main';

    new JsonFile(project, 'nx.json', {
      obj: {
        $schema: 'https://json.schemastore.org/nx',
        npmScope: 'bot-or-not',
        affected: { defaultBase },
        workspaceLayout: {
          appsDir: this.appsDir,
          libsDir: this.libsDir,
        },
      },
      marker: true,
    });
  }
}

import type { NextConfig } from 'next';

/** Extend an application's Next config with settings required by the component library. */
export function withComponentLibrary(config: NextConfig = {}): NextConfig {
  return {
    ...config,
    transpilePackages: [...new Set([...(config.transpilePackages ?? []), 'component-library'])],
  };
}

/** Backward-compatible name for existing consumers. */
export const withTaskflowLayer = withComponentLibrary;

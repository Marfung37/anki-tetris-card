import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'browser',
  target: 'es2020',
  outfile: 'anki-tetris-card/web/app.js'
});

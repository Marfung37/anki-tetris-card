import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: {
    app: 'src/app.ts',
    settings: 'src/settings.ts'
  },
  bundle: true,
  platform: 'browser',
  target: 'es2020',
  outdir: 'anki-tetris-card/web'
});

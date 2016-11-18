import path from 'path';

export default {
  copyAssets: [
    'src/index.html',
    'src/installer.html',
    { asset: 'src/img/**', dist: 'dist/img/' },
    {
      asset: 'node_modules/ace-kevscript/build/src-noconflict/ace.js',
      babel: false
    },
    {
      asset: 'node_modules/ace-kevscript/build/src-noconflict/mode-kevscript.js',
      babel: false
    },
    {
      asset: 'node_modules/ace-kevscript/build/src-noconflict/theme-kool.js',
      babel: false
    },
    {
      asset: 'node_modules/ace-kevscript/build/src-noconflict/worker-kevscript.js',
      babel: false
    }
  ],
  jsAssets: ['src/js/**/*.js'],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/index.scss',
  devServerPort: 9000,
  eslintOverride: path.resolve(__dirname, '.eslintrc.json')
};

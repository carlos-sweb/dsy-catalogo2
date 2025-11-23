import index from './public/index.html'
import esbuild from 'esbuild'
import postcss from 'postcss'
import pandacss from '@pandacss/postcss'
import postcssImport from 'postcss-import'
import cssnano from 'cssnano'


// Build CSS with Panda
async function buildCSS() {
  const css = await Bun.file('./src/styles.css').text()
  const result = await postcss([
    postcssImport(),
    pandacss(),
   // cssnano()
  ]).process(css, {
    from: './src/styles.css',
    to: './public/styles.css'
  })
  await Bun.write('./public/styles.css', result.css)
  console.log('✅ CSS generado')
}

// Build JS with esbuild
let ctx = await esbuild.context({
  entryPoints: ['./src/app.jsx'],
  bundle: true,
  minify: true,
  format: 'iife',
  outdir: 'public',
  assetNames: 'res/[name]', // Organize assets into a 'fonts' folder
  target: 'es2020',
  jsxFactory: 'm',
  jsxFragment:'\'[\'',
  loader:{
    '.js':'jsx',
    '.woff': 'file',
    '.woff2': 'file',
    '.svg':'file',
    '.ttf':'file',
    '.eot':'file',
    '.png':'file'
  },
  //drop: ['debugger','console'],
})

// Watch for changes

await buildCSS()
await ctx.watch()

// Watch CSS changes

const watcher = Bun.file('./src/styles.css')
let lastCSS = await watcher.text()
setInterval(async () => {
  const currentCSS = await Bun.file('./src/styles.css').text()
  if (currentCSS !== lastCSS) {
    await buildCSS()
    lastCSS = currentCSS
  }
}, 1000)



const server = Bun.serve({
  development:true,
  port: 4000,
  routes: {    
    "/": index,
    "/fonts.min.css": async () => {
      return new Response(Bun.file('./public/font.min.css'), {
        headers: { 'Content-Type': 'text/css' }
      })
    },
    "/styles.css": async (request) => {
      return new Response(Bun.file('./public/styles.css'), {
        headers: { 'Content-Type': 'text/css' }
      })
    },
    "/res/:filename": async (request) => {
      const filename = request.params.filename;
      const filePath = `./public/res/${filename}`;
      const file = Bun.file(filePath);
      return new Response(file);
    }
  }
});

console.log(`Listening on ${server.url}`);
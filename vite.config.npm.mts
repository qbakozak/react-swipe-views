import { defineConfig, Plugin } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import fs from 'fs'
import CleanCSS from 'clean-css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), cssDuplicatePlugin()],
  build: {
    minify: false,
    cssMinify: false,
    emptyOutDir: true,
    copyPublicDir: false,
    manifest: false,
    sourcemap: true,
    cssCodeSplit: true,
    outDir: 'lib',
    target: ['es6'],
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@qbakozak/react-swipe-views',
      formats: ['cjs', 'es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/react-jsx-runtime',
      ],
      output: {
        entryFileNames: `[name].[format].js`,
        chunkFileNames: `[name].[format].js`,
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react/react-jsx-runtime': 'jsxRuntime',
        },
        exports: 'named',
      },
    },
  },
})

function cssDuplicatePlugin(): Plugin {
  return {
    name: 'vite-plugin-css-duplicate',
    apply: 'build',
    generateBundle(_, bundle) {
      // Folders to create
      const foldersToCreate = ['lib/', 'lib/css/']

      try {
        foldersToCreate.forEach((folder) => {
          if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
          }
        })
      } catch (err) {
        console.error(err)
      }

      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.startsWith('scss') && asset.type === 'asset') {
          const cssContent = asset.source as string

          // Write the normal CSS file
          const normalFileName = fileName.replace('scss/', 'css/')
          fs.writeFileSync(path.resolve('lib', normalFileName), cssContent)

          // Write the minified CSS file
          const minifiedFileName = fileName
            .replace('.css', '.min.css')
            .replace('scss/', 'css/')
          const minifiedCss = new CleanCSS().minify(cssContent).styles
          fs.writeFileSync(path.resolve('lib', minifiedFileName), minifiedCss)
        }
      }
    },
    closeBundle() {
      // Folders to delete
      const foldersToDelete = ['lib/scss']

      foldersToDelete.forEach((folder) => {
        fs.rmSync(folder, { recursive: true, force: true })
        console.log(`Deleted folder: ${folder}`)
      })
    },
  }
}

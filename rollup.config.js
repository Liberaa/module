export default {
  input: 'src/index.js',    
  output: [
    {
      file: 'dist/learn2dgame-js.js',
      format: 'esm',           
      sourcemap: true
    },
    {
      file: 'dist/learn2dgame-js.cjs',
      format: 'cjs'             
    }
  ]
}
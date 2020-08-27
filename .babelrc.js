module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets:{
          node: "current"
        }
      }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    // 'transform-es2015-modules-commonjs'
  ],
  env: {
    esm:{
      presets:[
        ['@babel/preset-env',
          {
            modules:false
          }
        ]
      ],
      plugins:[
        ['@babel/plugin-transform-runtime',
          {
            useESModules: true
          }
        ]
      ]
    }
  },
}

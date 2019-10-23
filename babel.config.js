module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ]
  // if your use import on Demand, Use this code
  // ,
  // plugins: [
  //   [ 'import', {
  //     "libraryName": "iview",
  //     "libraryDirectory": "src/components",
  //     "libraryName": "element-ui",
  //     "styleLibraryName": "theme-chalk",
  //     'libraryName': 'ant-design-vue',
  //     'libraryDirectory': 'es',
  //     'style': true // `style: true` 会加载 less 文件
  //   } ]
  // ]
}

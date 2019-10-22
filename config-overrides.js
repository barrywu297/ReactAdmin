//const { override, fixBabelImports } = require('customize-cra');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //针对antd实现按需打包：根据import来打包（使用babel-plugin-import）
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    //style: 'css',
    style: true,
     }),
     //使用Less-Loader对源码中的Less的变量进行重新指定
    addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
    }),
);
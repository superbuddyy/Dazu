module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@vue/babel-preset-jsx',
  ],
  'plugins': [
    'babel-plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'babel-plugin-transform-vue-jsx',
    '@ant-design-vue/babel-plugin-jsx',
  ],
};

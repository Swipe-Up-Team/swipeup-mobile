module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@src': './src',
            '@components': './src/components',
            '@store': './src/store',
            '@assets': './assets'
          }
        }
      ]
    ]
  }
}

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
            '@common': './src/common',
            '@themes': './src/themes',
            '@config': './src/config',
            '@utils': './src/utils',
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@assets': './assets'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  }
}

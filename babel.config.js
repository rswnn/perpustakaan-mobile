module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@navigation': './src/navigation',
          '@screen': './src/screen',
          '@store': './src/store',
          '@components': './src/components',
          '@utils': './src/utils',
          '@interfaces': './src/interfaces',
          '@hooks': './src/hooks',
          '@constants': './src/constants',
          '@assets': './src/assets',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

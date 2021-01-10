module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            // babel转换过程中一系列规则
            presets: [require.resolve("babel-preset-react-app")],
          },
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules')
              }
              return true
            }
          }
        }
      ],
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'typescript' },
        }
      ],
      enforce: 'pre'
    });
    return config;
  }
};

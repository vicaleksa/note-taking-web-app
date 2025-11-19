import type { StorybookConfig } from '@storybook/react-webpack5';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        plugins: [
          new MiniCssExtractPlugin(),
        ],
        rules: [
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          {
            test: /\.module\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  defaultExport: true,
                },
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:3]',
                  },
                },
              },
            ],
          },
        ]
      }
    }
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },

};

export default config;

const path = require('path');

module.exports = {
  // 其他配置
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于 8KB 的图片将被处理为 base64 URL
              name: '[name].[hash:8].[ext]',
              outputPath: 'images',
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      // 其他规则
    ],
  },
  // 其他配置
};
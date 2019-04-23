import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import SpritesmithPlugin from 'webpack-spritesmith'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const templateFunction = (data) => {
  var perSprite = data.sprites.map((sprite) => {
    return '$N-name: \'N\';\n$N-x: Xpx;\n$N-y: Ypx;\n$N-offset-x: Xpx;\n$N-offset-y: Ypx;\n$N-width: Wpx;\n$N-height: Hpx;\n$N-total-width: Mpx;\n$N-total-height: Lpx;\n$N-image: \'I\';\n$N: Xpx Ypx Xpx Ypx Wpx Hpx Mpx Lpx \'I\' \'N\';\n.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; background-image: url(I); }\n.iconr-N { width: calc(Wpx / 2); height: calc(Hpx / 2); background-position: calc(Xpx / 2) calc(Ypx / 2); background-image: url(I); background-size: calc(Mpx / 2) calc(Lpx / 2); }'
      .replace(/N/g, sprite.name)
      .replace(/W/g, sprite.width)
      .replace(/H/g, sprite.height)
      .replace(/X/g, sprite.offset_x)
      .replace(/Y/g, sprite.offset_y)
      .replace(/M/g, sprite.total_width)
      .replace(/L/g, sprite.total_height)
      .replace(/I/g, data.sprites[0].image)
  }).join('\n')
  return perSprite
}

export default {
  mode: IS_PRODUCTION ? 'production' : 'development',
  entry: src + '/index.js',

  output: {
    path: dist,
    filename: 'js/[name].[contentHash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        query: {
          pretty: true
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          IS_PRODUCTION ? MiniCssExtractPlugin.loader : { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: IS_PRODUCTION ? '[hash:base64]' : '[name]__[local]___[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              // plugins: (loader) => [
              //   require('postcss-import')(),
              //   require('postcss-simple-vars')({ silent: true }),
              //   require('postcss-nested')(),
              //   require('postcss-mixins')(),
              //   require('postcss-nth-list')(),
              //   require('postcss-calc')(),
              //   require('postcss-color-function')(),
              //   require('postcss-url')(),
              //   require('postcss-preset-env')({
              //     browsers: 'last 2 versions',
              //     stage: 0,
              //   }),
              //   require('cssnano')()
              // ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.resolve(__dirname, 'src/img'),
        use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                context: './src',
                outputPath: 'img/',
                publicPath: (path) => {
                  return '../img/' + path
                }
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: "65-90",
                  speed: 4
                },
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                svgo: {
                  plugins: [
                    {
                      removeViewBox: false
                    },
                    {
                      removeEmptyAttrs: false
                    }
                  ]
                }
              }
            }
          ],
          exclude: [/node_modules/, path.resolve(__dirname, 'src/svg/')]
      },
      // {
      //   test: /\.(jpe?g|png|gif|ico)(\?.+)?$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 8192,
      //       name: './img/[name].[ext]'
      //     }
      //   }
      // }
    ]
  },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: IS_PRODUCTION ? 'css/[name].[hash].css' : 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: src + '/pug/index.pug',
      filename: 'index.html'
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/img/sprite'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/img/sprite.png'),
        css: [
          [
            path.resolve(__dirname, 'src/css/sprite.css'),
            {
              format: 'function_based_template'
            }
          ]
        ]
      },
      customTemplates: {
        'function_based_template': templateFunction
      },
      apiOptions: {
        cssImageRef: '../img/sprite.png'
      },
      spritesmithOptions: {
        padding: 4
      }
    }),
    new CopyWebpackPlugin([{
      from: 'src/json',
      to: 'json'
    }]),
    new CleanWebpackPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    port: 8080,
    open: true,
    // openPage: 'index.html'
  }
}
/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "src/_app/styles/variables.scss"; @import "src/_app/styles/mixins.scss";`
  },
  images: {
    domains: ['mc.yandex.ru'],
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false
                      }
                    }
                  },
                  {
                    name: 'removeAttrs',
                    params: {
                      attrs: '(id|class)'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  }
}

export default nextConfig

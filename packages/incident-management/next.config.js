const nextConfig = {
  basePath: '',
  output: 'standalone',
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })
    config.resolve.fallback = { async_hooks: false }

    return config
  },
  images: {
    domains: [],
  },
  reactStrictMode: false,
}

module.exports = nextConfig

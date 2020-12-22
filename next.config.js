module.exports = {
  webpack: config => {
    console.log(config.resolve.modules)
    console.log(config.resolve.plugins)
    return config
  }
}

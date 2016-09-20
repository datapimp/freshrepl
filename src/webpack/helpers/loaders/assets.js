export function imageLoader(environment, settings = {}) {
  if (environment !== 'production') {
    return ['file-loader?name=images/[name].[ext]']
  }

  const imageOptimizations = {
    progressive:true,
    optimizationLevel: 7,
    interlaced: false,
    pngquant:{
      quality: "65-90",
      speed: 4
    },
    ...settings
  }

  return [
    'file-loader?name=images/[name].[hash].[ext]',
    `image-webpack?${JSON.stringify(imageOptimizations)}`
  ]
}

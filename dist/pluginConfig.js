// 插件作者链接
module.exports.homepage = 'https://quericy.me'

// 插件 logo 文件
module.exports.pluginLogo = 'assets/logo.png'

// 插件入口文件
module.exports.pluginEntryFile = 'calculator.html'

// 插件搜索列表名称
const pluginExplain = '货币汇率计算器'
module.exports.pluginExplain = pluginExplain

// 插件功能正则部分列表
module.exports.pluginFeaturesList = (() => {
  const { isoMap } = require('./ISO_META')

  return isoMap.map(({ name, scName }) => {
    const cmds = [{
      type: 'regex',
      label: '',
      match: '',
    }]

    if (name === 'CNY') {
      // 人民币
      cmds[0].label = '人民币汇率转换'
      cmds[0].match = '/^(CNY|RMB|中国元|人民币).*/i'
    } else {
      // 其他币种
      cmds[0].label = `${scName}汇率转换`
      cmds[0].match = `/^(${name}|${scName}).*/i`
    }

    return {
      code: name,
      explain: pluginExplain,
      cmds,
    }
  })
})()

// 插件回调编号
module.exports.cbId = 'F6EiNdyHx'

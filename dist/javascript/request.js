class Generator {
  constructor({ currentISO }) {
    this.ISOList = Object.assign([], ISO_MAP)
    this.ISOMAPFULL = ISO_MAP_FULL

    this.currentISO = currentISO
  }

  /**
   * 获得当前 ISO 中文名
   */
  getCurrentISOScName() {
    return this.ISOMAPFULL[this.currentISO] || ''
  }

  /**
   * 获得当前 ISO
   */
  getCurrentISO() {
    return this.currentISO
  }

  /**
   * 获得当前 ISO 列表
   */
  getISOList() {
    return this.ISOList
  }

  addISO(currentISO, targetISO) {
    // 处理 current
    if (currentISO) {
      currentISO = currentISO
        .toString()
        .trim()
        .toLocaleUpperCase()

      if (currentISO === this.currentISO) {
        // do nothing
      } else if (this.ISOList.some((item) => item.name === currentISO)) {
        // do nothing
      } else {
        Object.entries(this.ISOMAPFULL).forEach(([key, value]) => {
          if (key === currentISO || ~value.indexOf(currentISO)) {
            this.ISOList.unshift({
              name: key,
              scName: value,
            })
          }
        })
      }
    }

    // 处理 target
    if (targetISO) {
      targetISO = targetISO
        .toString()
        .trim()
        .toLocaleUpperCase()

      if (this.ISOList.some((item) => item.name === targetISO)) {
        // do nothing
      } else {
        Object.entries(this.ISOMAPFULL).forEach(([key, value]) => {
          console.log(key, value)
          if (key === targetISO || ~value.indexOf(targetISO)) {
            this.ISOList.push({
              name: key,
              scName: value,
            })
          }
        })
      }
    }
  }

  formatISO() {
    return `${this.currentISO}-${this.ISOList.filter(({ name }) => name !== this.currentISO)
      .map(({ name }) => name)
      .join('-')}`
  }
}

/**
 * 加载汇率计算器
 */
function loadConverter(initAmount) {
  const url = getRequestUrl()
  console.log(`Requesting ${url}`)

  showTips('正在加载最新汇率...')

  const xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.onreadystatechange = () => {
    if (xhr.status === 200) {
      if (xhr.readyState === 4) {
        hiddenTips()
        eval(xhr.responseText)

        // 初始化金额
        updateInput(initAmount)
      }
    } else {
      showTips('加载失败！请检查网络或点击 <a href="javascript:loadConverter()">这里</a> 重试')
    }
  }
  xhr.send()
}

/**
 * 获得请求地址
 * @return {string}
 */
function getRequestUrl() {
  const baseUrl = 'https://freecurrencyrates.com/zh-hans/widget-vertical'
  const query = {
    title: encodeURIComponent('货币换算器'),
    source: 'fcr',
    p: 'F6EiNdyHx',
    thm: 'cccccc,F9F9F9,A3A3A3,333333,eeeeee,cccccc,ffffff,222222,000000',
    df: 1,
    v: 'fits',
    width: 1000,
    width_title: 0,
    firstrowvalue: 1,
    tzo: -480,
    iso: generator.formatISO(),
  }

  return `${baseUrl}?${Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&')}`
}

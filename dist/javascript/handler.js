const gcw_handlerF6EiNdyHx = {
  gennodes() {
    this.nodes = []

    for (let i = 0; i < generator.getISOList().length; i++) {
      let $node = document.querySelector(`#gcw_valF6EiNdyHx${i}`)
      $node.rate = $node.getAttribute('rate')
      this.nodes[i] = $node
    }
  },

  format(rate) {
    if (isNaN(rate)) return 0

    rate = parseFloat(rate)
    if (rate > 1) rate = rate.toFixed(2)
    var i = Math.floor(rate),
      r = rate - i
    if (r != 0) {
      var pr = 3
      if (i > 0) pr = 2
      else for (var c = r; c < 1; c *= 10) pr++
      r = r
        .toFixed(pr)
        .toString()
        .substr(1)
        .replace(/0+$/, '')
    } else r = ''
    return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + r
  },

  parse(str) {
    return parseFloat(str.replace(/[^0-9E\+\-\.]+/gi, ''))
  },

  update(index, self) {
    if (!this.nodes) {
      this.gennodes()
    }

    console.log(this.nodes)

    // 全部转为美元计算
    const usd = this.parse(this.nodes[index].value) / this.nodes[index].rate
    if (isNaN(usd)) return

    for (let i = 0; i < generator.getISOList().length; i++) {
      if (i !== index || self) {
        this.nodes[i].value = this.format(this.nodes[i].rate * usd)
      }
    }
  },

  reload() {
    loadConverter()
  },
}

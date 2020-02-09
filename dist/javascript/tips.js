const $tips = document.querySelector('#gcw_tipsF6EiNdyHx')

function showTips(tips) {
  $tips.innerHTML = tips
  $tips.classList.add('show')
}

function hiddenTips() {
  $tips.innerHTML = ''
  $tips.classList.remove('show')
}

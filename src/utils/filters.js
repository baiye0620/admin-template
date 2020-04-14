import Vue from 'vue'

/**
 *  秒转成时分秒
 */
Vue.filter('formatTime', function (time) {
  if (!time) {
    return ''
  } else if (time < 0) {
    return '已延时'
  } else if (time < 60) {
    return time + '秒'
  } else if (time < 3600) {
    return Math.floor(time / 60) + '分钟' + (time % 60) + '秒'
  } else if (time < 86400) {
    return (
      Math.floor(time / 3600) +
      '小时' +
      Math.floor((time % 3600) / 60) +
      '分' +
      (time % 60) +
      '秒'
    )
  } else {
    return '大于1天'
  }
})

/**
 *  时间格式转换
 */
Vue.filter('parseTime', function (time, cFormat) {
  if (!time) {
    return ''
  }

  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
})

/**
 * 根据key获取对应数字匹配的value
 */
Vue.filter('findValFromArray', function (val, key, arr, attr) {
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i]
    if (ele[key] === val) {
      return ele[attr]
    }
  }
})

/**
 * Created by maoyuyang on 17/9/5.
 */
exports.customTime = item => {
  let now = new Date().getTime()
  let minu = 60 * 1000
  let hour = 60 * minu
  let day = 24 * hour
  let month = day * 30
  let year = 12 * month

  let publishTime = new Date(item).getTime()
  let historyTime = parseInt(now) - parseInt(publishTime)
  let descTime

  if (historyTime >= year) {
    // 按年算
    descTime = parseInt(historyTime / year) + '年前'
  } else if (historyTime < year && historyTime >= month) {
    // 按月算
    descTime = parseInt(historyTime / month) + '月前'
  } else if (historyTime < month && historyTime >= day) {
    // 按天算
    descTime = parseInt(historyTime / day) + '天前'
  } else if (historyTime < day && historyTime >= hour) {
    // 按小时算
    descTime = parseInt(historyTime / hour) + '小时前'
  } else if (historyTime < hour && historyTime >= minu) {
    // 按分钟算
    descTime = parseInt(historyTime / minu) + '分钟前'
  } else {
    descTime = '刚刚'
  }

  return descTime
}

exports.formatDate = time => {
  let tmpDate = new Date(time)
  let year = tmpDate.getFullYear()
  let month = tmpDate.getMonth() + 1
  let day = tmpDate.getDate()
  let hours = tmpDate.getHours()
  let minutes = tmpDate.getMinutes()
  return year + '.' + month + '.' + day + ' ' + hours + ':' + minutes
}

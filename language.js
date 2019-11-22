const language = 'zh'

function formatTime (time, type) {
  return ` ${time} ${type}${time > 1 ? 's' : ''}`
}

const languageText = {
  zh: {
    before: '前',
    after: '后',
    justNow: '刚刚',
    second: '秒',
    minute: '分钟',
    hour: '小时',
    day: '天'
  },
  en: {
    before: ' Ago',
    after: ' After',
    justNow: 'Just Now',
    second: val => formatTime(val, 'Second'),
    minute: val => formatTime(val, 'Minute'),
    hour: val => formatTime(val, 'Hour'),
    day: val => formatTime(val, 'Day')
  }
}

export default languageText[language] || languageText[0]

const language = 'zh'
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
    before: ' before',
    after: ' after',
    justNow: 'Just Now',
    second: ' Seconds',
    minute: ' Minutes',
    hour: ' Hours',
    day: ' Days'
  },
}

export default languageText[language] || languageText[0]

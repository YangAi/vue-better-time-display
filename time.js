import text from './language'

/**
 * @param {Number} timeStamp, The timestamp input
 * @param {Number} currentTime, The current timestamp
 * @returns {Boolean} Whether the input is early than the current timestamp
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp <= currentTime
}

/**
 * @param {Number} num, input number
 * @returns {String} add a 0 in the front, if the num is less than 10
 */
const maintainNumLength = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param timeStamp
 * @param format, datetime or date only
 * @param includeYear, whether show year as part of the output.
 * @returns {string} formatted date output
 */
const getFormattedDate = (timeStamp, format = 'datetime', includeYear = true) => {
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = maintainNumLength(d.getMonth() + 1)
  const day = maintainNumLength(d.getDate())
  const hour = maintainNumLength(d.getHours())
  const minute = maintainNumLength(d.getMinutes())
  let output = includeYear ? year + '-' : ''
  output = `${output}${month}-${day}`
  if (format === 'datetime') {
    output = `${output} ${hour}:${minute}`
  }
  return output
}

/**
 * @param timeStamp the time input wish to transform
 * @returns {string} the transformed output
 */
export const getRelativeTime = (timeStamp) => {

  const currentTime = (new Date()).getTime()
  const IS_EARLY = isEarly(timeStamp, currentTime)

  // difference between this two timestamp in seconds.
  let diff = parseInt((currentTime - timeStamp) / 1000)
  // reverse {diff} if IS_EARLY is false
  if (!IS_EARLY) diff = -diff

  let output = ''
  let append = IS_EARLY ? text.before : text.after

  if (diff < 10) output = text.justNow
  // less than 59 seconds
  else if (diff < 60) output = text.second(diff) + append
  // between (1 munute) to (59 minutes 59 seconds)
  else if (diff >= 60 && diff < 3600) output = text.minute(Math.floor(diff / 60)) + append
  // between (1 hour) to (23 hours 59 minutes 59 seconds)
  else if (diff >= 3600 && diff < 86400) output = text.hour(Math.floor(diff / (60 * 60))) + append
  // between (1 day) to (29days 23 hours 59 minutes 59 seconds)
  else if (diff >= 86400 && diff < 86400 * 30) output = text.day(Math.floor(diff / (60 * 60 * 24))) + append
  // between (1 month) to (1 year).
  else if (diff >= 86400 * 30 && diff <= 86400 * 365 && IS_EARLY) output = getFormattedDate(timeStamp, 'datetime', false)
  else output = getFormattedDate(timeStamp, 'datetime')
  return output
}

export default function (timestamp, format = 'relative') {
  if (format === 'date' || format === 'datetime') {
    return getFormattedDate(timestamp, format)
  } else {
    return getRelativeTime(timestamp)
  }
}

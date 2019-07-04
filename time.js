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
 * @param timeStamp,
 * @param includeYear, whether show year as part of the output.
 * @returns {string} formatted date output
 */
const getFormattedDate = (timeStamp, includeYear = true) => {
    const d = new Date(timeStamp)
    const year = d.getFullYear()
    const month = maintainNumLength(d.getMonth() + 1)
    const date = maintainNumLength(d.getDate())
    const hours = maintainNumLength(d.getHours())
    const minutes = maintainNumLength(d.getMinutes())
    const second = maintainNumLength(d.getSeconds())
    let output = includeYear ? year + '-' : ''
    output = output + month + '-' + date + ' ' + hours + ':' + minutes
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
    else if (diff < 60) output = differ + text.second + append
    // between (1 munute) to (59 minutes 59 seconds)
    else if (diff >= 60 && diff < 3600) output = Math.floor(diff / 60) + text.minute + append
    // between (1 hour) to (23 hours 59 minutes 59 seconds)
    else if (diff >= 3600 && diff < 86400) output = Math.floor(diff / (60 * 60)) + text.hour + append
    // between (1 day) to (29days 23 hours 59 minutes 59 seconds)
    else if (diff >= 86400 && diff < 86400 * 30) output = Math.floor(diff / (60 * 60 * 24)) + text.day + append
    // between (1 month) to (1 year).
    else if (diff >= 86400 * 30 && diff <= 86400 * 365 && IS_EARLY) output = getFormattedDate(timeStamp, false)
    else output = getFormattedDate(timeStamp)
    return output
}

export default function (timestamp) {
    return getRelativeTime(timestamp)
}


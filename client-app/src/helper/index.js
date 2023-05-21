export const getFormatedTime = sec => {
  return Math.floor(sec / 60).toString().padStart(2, '0') + ':' + Math.floor(sec % 60).toString().padStart(2, '0')
}

export const letterForQuestion = (i) => {
  return String.fromCharCode(65 + i) + ". "
}
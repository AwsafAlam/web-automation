const generateRandomText = (prevText: string, length: number): string => {
  let text = prevText
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    text += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return text
}

export default generateRandomText

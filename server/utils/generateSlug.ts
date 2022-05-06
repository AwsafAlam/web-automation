const generateSlug = (text: string): string =>
  text.trim().replace(/\W+/g, '-').toLowerCase()

export default generateSlug

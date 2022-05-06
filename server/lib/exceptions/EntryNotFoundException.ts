import HttpException from './HttpException'

class EntryNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Entry with id ${id} not found`)
  }
}

export default EntryNotFoundException

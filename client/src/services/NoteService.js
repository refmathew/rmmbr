import axios from 'axios';

class NoteService {

  static async getNotes(uri, pageId) {
    const data = await axios.get(uri + pageId)
    console.log(data)
  }

}

export default NoteService


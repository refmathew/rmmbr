import axios from 'axios'

const url = 'http://localhost:8000/api/pages'

class PageService {
  static async getPages() {
    try {
      return await axios.get(url)
    } catch (err) {
      return err
    }
  }

  // static async updatePage() {

  // }
}
export default PageService

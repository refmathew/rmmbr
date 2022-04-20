import axios from 'axios'

const url = `${import.meta.env.VITE_SERVER}/pages`

class PageService {
  static async getPages() {
    try {
      return await axios.get(url)
    } catch (err) {
      return err
    }
  }

}
export default PageService

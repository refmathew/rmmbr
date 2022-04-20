import axios from 'axios'

const url = `${import.meta.env.VITE_SERVER}users/`

class UserService {
  static async authenticateUser(email, password) {
    try {
      return axios.post(`${url}login`, { email, password })
    } catch (err) {
      return err
    }
  }
}

export default UserService

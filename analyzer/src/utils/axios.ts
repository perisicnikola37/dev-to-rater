import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 10000,
})

export default axiosInstance

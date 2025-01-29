import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 10_000,
})

export default axiosInstance

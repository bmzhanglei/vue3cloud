
import axios from "axios"

const http = axios.create({
  timeout:5000 
})

export default http
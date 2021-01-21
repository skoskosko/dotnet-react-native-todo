import axios from 'axios';


let ax = axios.create();
ax.defaults.maxRedirects = 0;
ax.defaults.baseURL = "http://192.168.0.4:5000/api/TodoItems";

// For debugging

// ax.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2))
//   return request
// })

// ax.interceptors.response.use(response => {
//   console.log('Response:', JSON.stringify(response, null, 2))
//   return response
// })

export default ax;
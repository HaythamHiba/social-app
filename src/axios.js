import axios from 'axios'
const instance=axios.create({
    baseURL:'https://oneaddressfashion.com'
});
export default instance;
import axios from 'axios';

// const fetchGroupLisy = () => {
//     return async () => {
//         const res = await.get()
//     }
// }

const fetchHotCity= () => {
    return async () => {
        const res = await axios.get('http://192.168.0.115:8080/area/hot');
        return res.data;
    }
}

export { fetchHotCity };
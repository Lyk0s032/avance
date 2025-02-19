// Validemos que el movil este disponible

import axios from "axios";

const signIn = async (data) => {
    let body = {
        phone: data.email,
        password: data.password
    }

     
    const login = await axios.post('/user/signIn/', body)
    .then(async res => {
        // const token = await SecureStore.setItemAsync('token', res.data.data);
        window.localStorage.setItem("loggedPeople", JSON.stringify(res.data.data));
        // console.log(token);
        return res;
    })
    .catch((err) => { 
        if(err.status == 404){
            return 404
        }else if(err.status == 401){
            return 401
        }else if(err.status == 500) {
            return 500
        }else {
            console.log(err)
            return 500
        }
    })

    return login;
}

const auth = async (token) => {
}

export { signIn, auth }

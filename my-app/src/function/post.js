import axios from 'axios';

export function forgot(email) {

    return axios({
        method: 'POST',
        url: 'http://localhost:3300/api/user/forgot',
        data: { email },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(response => {
        if (response.status === 200)
            return "ok";
    }).catch(error => {
        return "not ok";
    });
}


export function password(password, confirmPassword, token) {

    return axios({
        method: 'PUT',
        url: 'http://localhost:3300/api/user/password',
        data: {
            password,
            confirmPassword,
            token
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(response => {
        if (response.status === 200)
            return "ok";
    }).catch(error => {
        return "not ok";
    });
}

export function register(data) {
    return axios({
        method: 'post',
        url: 'http://localhost:3300/api/user',
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(response => {
        console.log(response)
    }).catch(error => {
        console.log({ ...error })
        console.log(error.response.data.msg)
    });
}
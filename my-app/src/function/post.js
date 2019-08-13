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

export function register(data, info) {

    return axios({
        method: 'post',
        url: 'http://localhost:3300/api/user',
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then((res) => {
        return ({ res: info, err: "" })
    }).catch((error) => {
        var err = JSON.parse(error.request.response).data

        for (var value in err) {
            if (info[value])
                info[value].error = err[value]
        }

        return ({ res: info, err: "Please complete your profile" })
    });
}

export function connect(username, password) {
    return axios({
        method: 'post',
        url: 'http://localhost:3300/api/authenticate',
        data: {
            username: username,
            password: password,
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(response => {
        return ({ res: 1, data: response.data })
    }).catch(error => {
        return ({ res: 0, data: error.response.data.msg })
    });
}

export function addTag(value, token) {
    return axios({
        method: 'post',
        url: 'http://localhost:3300/api/tag',
        data: { tag: value, },
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        headers: { 'Authorization': "bearer " + token }
    }).then(response => {
        console.log("ok")
        return ({ res: 1, data: response.data })
    }).catch(error => {
        console.log({ ...error })
        return (0)
    });
}
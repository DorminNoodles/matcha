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
        return (response.data)
    }).catch(error => {
        return (0)
    });
}

export function like(id, token) {
    return axios({
        method: 'POST',
        data: { id },
        url: 'http://localhost:3300/api/like',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}

export function block(id, token) {
    return axios({
        method: 'POST',
        data: { id },
        url: 'http://localhost:3300/api/block',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}

export function report(id, token) {
    return axios({
        method: 'POST',
        data: { id },
        url: 'http://localhost:3300/api/report',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}

export function update(data, info, token) {

    return axios({
        method: 'patch',
        url: 'http://localhost:3300/api/user',
        data,
        headers: { 'Authorization': "bearer " + token },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then((res) => {
        return res
    }).catch((error) => {
        var err = JSON.parse(error.request.response).data

        for (var value in err) {
            if (info[value])
                info[value].error = err[value]
        }

        return ({ res: info, err: "Please complete your profile" })
    });
}

export function sendMsg(message, to_id, group_id, token) {

    return axios({
        method: 'post',
        url: 'http://localhost:3300/api/chat',
        data: { group_id, to_id, message },
        headers: { 'Authorization': "bearer " + token },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then((res) => { return res })
        .catch(error => { return error; });
}
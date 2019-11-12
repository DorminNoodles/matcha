import axios from 'axios';

export function confirm({ login, key }) {

    return axios({
        method: 'GET',
        url: 'http://localhost:3300/api/user/confirm',
        params: {
            username: login,
            key: key
        }
    }).then(response => {
        if (response.status === 200)
            return ("You have successfully confirmed your account")
    }).catch(error => {
        return ("Confirmation attempt failed")
    });
}

export function getUser(token, id) {

    return axios({
        method: 'GET',
        params: { id },
        url: 'http://localhost:3300/api/user/',
        headers: { 'Authorization': "bearer " + token }
    }).then(response => {
        return (response)
    }).catch(error => {
        return (error)
    });
}

export function getUsers(token, params) {

    return axios({
        method: 'GET',
        url: 'http://localhost:3300/api/users',
        params,
        headers: { 'Authorization': "bearer " + token }
    }).then(res => {
        if (res.status === 200)
            return res;
    }).catch(err => {
        return err;
    });
}

export function getUserTags(token, user_id) {
    return axios({
        method: 'GET',
        url: 'http://localhost:3300/api/tags/user',
        params: { user_id },
        headers: { 'Authorization': "bearer " + token }
    }).then(response => { return response })
        .catch(error => { return error; });
}

export function getTags(token, tag) {
    return axios({
        method: 'GET',
        params: { tag },
        url: 'http://localhost:3300/api/tags',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}

export function getLocation(token, city) {
    return axios({
        method: 'GET',
        params: { city },
        url: 'http://localhost:3300/api/location',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}

export function getGeocalisation() {
    return axios({
        method: 'GET',
        url: 'http://localhost:3300/api/location/position',
    }).then((res) => { return ({ res: res.data }) })
        .catch(error => {
            return (error.status ? error : { err: "Internal Error" })
        });
}

export function getListMsg(token) {
    return axios({
        method: 'GET',
        url: 'http://localhost:3300/api/chat/list',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}

export function getMessages(id, token) {
    return axios({
        method: 'GET',
        params: { id },
        url: 'http://localhost:3300/api/chat/',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}

export function getNotifications(token) {
    return axios({
        method: 'GET',
        url: 'http://localhost:3300/api/notification/',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}

export function getPhotos(id, token) {
    return axios({
        method: 'GET',
        url: 'http://localhost:3300/api/photos',
        params: { id },
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(() => { return { "status": "error" }; });
}
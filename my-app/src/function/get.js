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
    }).then(response => {
        console.log(response)
        if (response.status === 200)
            return "ok";
    }).catch(error => {
        return "not ok";
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
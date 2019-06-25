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


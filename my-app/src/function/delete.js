import axios from 'axios';

export function deleteTag(token, body, id) {

    return axios({
        method: 'DELETE',
        url: 'http://localhost:3300/api/tag',
        data: {
            user_id: id,
            tag_id: body[0].id
        },
        headers: { 'Authorization': "bearer " + token }
    }).then(response => {
        return (response.data)
    }).catch(error => {
        return (error)
    });
}

export function unlike(liked, token) {

    return axios({
        method: 'DELETE',
        data: { liked },
        url: 'http://localhost:3300/api/like',
        headers: { 'Authorization': "bearer " + token }
    }).then((res) => { return (res.data) })
        .catch(error => { return error; });
}
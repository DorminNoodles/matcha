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
        if (response.status === 200)
            return ("You have successfully confirmed your account")
    }).catch(error => {
        return ("Confirmation attempt failed")
    });
}

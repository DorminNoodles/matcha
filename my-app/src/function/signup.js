import { isEmpty } from "./utils.js"

export const check = (obj) => {

    let error = 0;
    if (isEmpty(obj.image.value)) {
        obj.image.error = "empty"
        error = 1;
    }
    for (let index in obj.info) {

        if (isEmpty(obj.info[index].value)) {
            obj.info[index].error = "empty"
            error = 1;
        }
    }


    if (obj.info.confirmation.value !== obj.info.password.value) {
        obj.info.password.error = ""
        obj.info.confirmation.error = "Your password and confirmation password do not match"
        error = 1;
    }

    return (error === 1 ? obj : 0)
}

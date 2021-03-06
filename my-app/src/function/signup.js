import { isEmpty } from "./utils.js"

export const check = (obj) => {

    let error = 0;
    if (obj.image.error !== "")
        error = 1;

    for (let index in obj.info) {

        if (isEmpty(obj.info[index].value)) {
            obj.info[index].error = "empty"
            error = 1;
        }
        else
            obj.info[index].error = ""
    }

    if (obj.info.confirmation.value !== obj.info.password.value) {
        obj.info.password.error = ""
        obj.info.confirmation.error = "Your password and confirmation password do not match"
        error = 1;
    }
  
    return (error === 1 ?  { obj, status: 0 } : { obj, status: 1 } )
}

export const isEmpty = (str) => {

    if ((typeof str) === "string")
        str = str.trim()
         
    if (!(str === undefined || !str || 0 === str.length))
        return (0)
    else 
        return (1);
}
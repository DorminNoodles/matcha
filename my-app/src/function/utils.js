export const isEmpty = (str) => {
    let tmp = str.trim();
    return (tmp === undefined || !tmp || 0 === tmp.length);
}
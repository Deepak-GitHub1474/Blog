export function isEmail(string) {
    return string.match(/^[a-zA-Z0-9]+[a-zA-Z0-9._]*@[a-zA-Z0-9]+\.(com|in|co.in.org)$/i);
}

export function isValidPassword(string) {
    return string.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
}
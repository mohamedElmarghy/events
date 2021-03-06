export const objectToArray = (object) => {
    if (object) {
        return Object.entries(object).map(e => Object.assign({},e[1],{id : e[0]}))
    }
}
export function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') -1 >>> 0) + 2);
  }
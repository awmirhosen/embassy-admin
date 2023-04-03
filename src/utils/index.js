/** generate unique id **/
export function generateUniqueID() {
    return Math.floor(Math.random() * Date.now()).toString(16)
}
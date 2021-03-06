export const openModal = (modalDetails) => {
    console.log(modalDetails);
    return {
        type: 'OPEN_MODAL',
        payload: modalDetails
    }
}
export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL'
    }
}
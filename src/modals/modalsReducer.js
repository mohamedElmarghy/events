export const modalsReducer = (state = null, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            const  modalType  = action.payload;
            return { modalType };
            break;
        case 'CLOSE_MODAL':
            return null;
            break;
        default:
            return state;
            break;
    }
}
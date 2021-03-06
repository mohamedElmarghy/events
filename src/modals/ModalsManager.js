import React from 'react';
import {connect} from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
class ModalsManager extends React.Component {
    render() {
    const modalsLookup = {
        TestModal,
        LoginModal,
        RegisterModal
    }
    let renderedModal;
    if (this.props.currentModal) {
        const ModalComponent = modalsLookup[this.props.currentModal.modalType];
        renderedModal = <ModalComponent {...this.props.currentModal.modalProps}/>
    }
    return (
        <span>
            {renderedModal}
        </span>
    )
}
}
const mapStateToProps = state => {
    return {
        currentModal : state.modals
    }
}
export default connect(mapStateToProps)(ModalsManager)
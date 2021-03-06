import React from 'react';
import {connect} from 'react-redux';
import {openModal} from '../modals/modalsAction';
class Test extends React.Component {
    render() {
        return (
           <button onClick={()=>this.props.openModal('TestModal')}>click here</button>
        )
    }
}
export default connect(null,{openModal})(Test);
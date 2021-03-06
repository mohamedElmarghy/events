import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Route } from "react-router-dom";
import SettingNav from './SettingNav';
import Basic from './Basic';
import MyPhotos from './MyPhotos';
import AboutMe from './AboutMe';
import Account from './Account';
import {updatePassword} from '../../store/actions/authActions';
import {updateProfile} from '../../store/actions/userAction';
import { connect } from 'react-redux';
class DashboardSetting extends React.Component {
    render() {
        return (
           <Grid>
               <Grid.Column width={12}>
                  <Route path='/settings/basic' render={()=> <Basic initialValues={this.props.profile}/>} />
                  <Route path='/settings/about' render={() => <AboutMe updateProfile={this.props.updateProfile}/> }/> 
                  <Route path='/settings/photo' component={MyPhotos} />
                  <Route path='/settings/account' render={()=><Account updatePassword={this.props.updatePassword}
                    providerId = {this.props.providerId}
                    />} />


               </Grid.Column>
               <Grid.Column width={4}>
                  <SettingNav />
               </Grid.Column>
           </Grid>
        )
    }
}
const mapStateToProps = state => {
    return {
        providerId :  state.firebase.auth.providerData[0].providerId,
        profile : state.firebase.profile
    }
}
export default connect(mapStateToProps,{updatePassword, updateProfile})(DashboardSetting);
import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Basic from './components/settings/Basic';
import AboutMe from './components/settings/AboutMe';
import MyPhotos from './components/settings/MyPhotos';
import CreateEvent from './components/events/createEvent';
import EventDetailed from './components/eventDetailed/EventDetailed';
import ProfileInfo from './components/profiles/ProfileInfo';
import DashboardSetting from './components/settings/DashboardSetting';
import Revents from './components/dashboard/Revents';
import Test from './test/Test';
import { Container } from 'semantic-ui-react';
import ModalsManager from './modals/ModalsManager';
import NotFound from './components/layout/NotFound';
class App extends React.Component {
  render() {
  return (
    <Fragment>

        <ModalsManager />
        <Route exact path='/' component={Revents} />
        <Route path='/(.+)' render={()=>(
          <Fragment>
            
            <Navbar />
            <Container className='main'>
            <Switch key={this.props.location.key}>
              <Route path='/Dashboard' component={Dashboard} />
              <Route path='/test' component={Test} />
              <Route path='/settings' component={DashboardSetting} />
              <Route path={['/createEvent','/manageEvent/:id']} component={CreateEvent} />
              <Route path='/events/:id' component={EventDetailed} />
              <Route path='/profile/:id' component={ProfileInfo} />
              <Route component={NotFound} />
            </Switch>
           </Container>
           
         </Fragment>
        )} />
    
    </Fragment>
  );
  }
}

export default withRouter(App);

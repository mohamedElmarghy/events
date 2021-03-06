import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react';
import Dashboard from './Dashboard';
class Revents extends React.Component {
    render() {
        return (
                <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                  <Header  as='h1' inverted>
                    <Image
                      size='massive'
                      src='/assets/logo.png'
                      alt='logo'
                      style={{ marginBottom: 12 }}
                    />
                    Re-vents
                  </Header>
                  <Button size='huge' inverted as={Link} to='/dashboard'>
                    Get started
                    <Icon name='right arrow' inverted />
                  </Button>
                </Container>
              </Segment>
        )
    }
}
export default Revents;
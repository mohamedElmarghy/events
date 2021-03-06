import { Button, Icon } from 'semantic-ui-react';
import { socialLogin } from '../../store/actions/authActions';
import { connect } from 'react-redux';
const SocialLogin = (props) => {
    return (
        <div>
          <Button type="button" style={{ marginBottom: '10px' }} fluid color="facebook" onClick={()=>props.socialLogin('facebook')}>
            <Icon name="facebook" /> Login with Facebook
          </Button>
    
          <Button type="button" fluid color="google plus" onClick={()=>props.socialLogin('google')}>
            <Icon name="google plus" />
            Login with Google
          </Button>
        </div>
    )
}
export default connect(null,{socialLogin})(SocialLogin);
import React from 'react';
import jwt from 'jsonwebtoken';

const testUsers = {
  admin: { password: 'password', name: 'Administrator', role: 'admin', capabilities: ['read', 'create', 'update', 'delete'] },
  editor: { password: 'password', name: 'Editor', role: 'editor', capabilities: ['read', 'create', 'update'] },
  writer: { password: 'password', name: 'Writer', role: 'writer', capabilities: ['read', 'create'] },
};

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      can: this.can,
      signup: this.signup,
      login: this.login,
      logout: this.logout,
      user: { capabilities: [] },
    };
  }

  can = (capability) => {
    return this?.state?.user?.capabilities?.includes(capability);
  }

  login = (username, password) => {
    fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        'Content-Type': 'application/json',
      },
    })
      .then(results => results.json())
      .then(data => {
        console.log(data)
        if (data.user) {
          console.log('in there');
          console.log(data.user);
          this.setLoginState(true, data.user.token, data.user);
        }
      })
      .catch(err => console.log(err));
  }

  signup = (username, password, role) => {
    let requestObj = {
      username: username,
      password: password,
      role: role || 'user',
    }
    console.log(JSON.stringify(requestObj));
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestObj),
    })
      .then(results => results.json())
      .then(data => {
        console.log(data)
        if (data.user) {
          console.log('in there');
          console.log(data.user);
          this.setLoginState(true, data.user.token, data.user);
        }
      })
      .catch(err => console.log(err));

  }

  logout = () => {
    this.setLoginState(false, null, {});
  };

  validateToken = token => {
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      this.setLoginState(true, token, user);
    }
    catch (e) {
      this.setLoginState(false, null, {});
      console.log('Token Validation Error', e);
    }

  };

  setLoginState = (loggedIn, token, user) => {
    this.setState({ token, loggedIn, user });
  };

  componentDidMount() {
    fetch('http://localhost:3001/todo', {
      method: 'GET',
    })
      .then(results => results.json())
      .then(data => console.log('Did it', data))
      .catch(reject => {
        console.log('Did not do it', reject);
      })
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;
import React, { Component } from 'react';
import './LoginView.scss';
var Hashes = require('jshashes');

export default class LoginView extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      userPassword: '',
      userObj: null
    };
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps: ', nextProps);
    var login = nextProps.login;
    this.setState({
      userObj: login.User
    });
  }

  doSubmit(){
    var { userName, userPassword } = this.state;
    //console.log('doSubmit: ' + userName + ', ' + userPassword);

    var data = {
      name: userName,
      pass: new Hashes.SHA1().hex(userPassword)
    };

    this.props.loginSubmit(data).then((result)=>{
      console.log('loginSubmit_result: ' + result);
    });
  }

  doCancel(){
    this.setState({
      userName: '',
      userPassword: ''
    });
  }

  changeName(e){
    this.setState({
      userName: e.target.value
    });
  }

  changePassword(e){
    this.setState({
      userPassword: e.target.value
    });
  }

  render() {
    var { userName, userPassword, userObj } = this.state;

    return (
      <div>
        {!userObj && <div className="login_area">
          <input type="text" id="userName" placeholder="Name" value={userName} onChange={::this.changeName} />
          <input type="password" id="userPassword" placeholder="Password" value={userPassword} onChange={::this.changePassword} />
          <button onClick={::this.doSubmit}>Submit</button>
          <button onClick={::this.doCancel}>Cancel</button>
        </div>}
        {userObj && <div>
          {userObj.Name}
        </div>}
      </div>
    );
  }
}

import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    constructor(props){
      
      super(props);
      this.login = this.login.bind(this);
      this.state = {
        payload1: {
              "username": "kuntao1220@gmail.com",
                "password": "******",
                  "keepMeLoggedIn": true,
                    "client_id": "PbCREuPr3iaFANEDjtiEzXooFl7mXGQ7",
                "ux_id": "com.nike.commerce.snkrs.web",
                  "grant_type": "password"
      }
      }

    }
   login(){
     let that = this;
     let url = 'https://unite.nike.com/login?appVersion=376&experienceVersion=318&uxid=com.nike.commerce.snkrs.web&locale=en_US&backendEnvironment=identity&browser=Google%20Inc.&os=undefined&mobile=false&native=false&visit=1&visitor=fa93d92c-f03b-43fb-9eb1-7b11e6f881fe';
     axios.post(url, that.state.payload1)
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       })
   }
   render(){
        return(
          <button onClick={this.login} style={{width:'100px',height:'200px'}}>testlogin</button>
        )
   }

}

export default Login

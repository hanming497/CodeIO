import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';

import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import functionService from '../../utils/functionService';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';



class App extends Component {



  constructor() {
    super();
    this.state = {
      // Initialize user if there's a token, otherwise null
      user: userService.getUser(),
      ES6: 'Please Input An ES6 Function',
      ES5: 'Output ES5 Function'
    };

    this.handleES6TextChange = this.handleES6TextChange.bind(this);
    this.convertToES5 = this.convertToES5.bind(this);
    this.explainCode = this.explainCode.bind(this);
    this.getTimeComplexity = this.getTimeComplexity.bind(this);
  }



  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleES6TextChange(event) {

    this.setState({ ES6: event.target.value });
  }

  convertToES5() {
    let equalSplit = this.state.ES6.split(/=(.*)/s)
    //should have 2 parts, ['let name', '(params) => {rest of code}']
    let functionName = equalSplit[0].split(' ')[1]

    let functionBody = equalSplit[1].split('=>')
    let params = functionBody[0].trim()
    let body = functionBody[1].trim()
    console.log(functionBody);
    console.log(params);
    console.log(body);
    if (!body.includes('return')) {
      body = `{return ${body}}`
    }
    let es5 = `function ${functionName} ${params} ${body}`
    console.log(es5)
    this.setState({ ES5: es5 });
  }

  async explainCode() {
    let data = await functionService.explain(this.state.ES6)

    let choices = data.choices[0].text

    this.setState({ ES5: choices });
    console.log(choices)
  }

  async getTimeComplexity() {

    let data = await functionService.getTimeComplexity(this.state.ES6)

    let choices = data.choices[0].text

    this.setState({ ES5: choices });
    console.log(choices)
  }



  checkIfValid() {

    if (this.state.ES6.length <= 0) {
      console.log("ES6 Function is empty")
      return false;
    }
    if (!this.state.ES6.includes('=>')) {
      console.log("ES6 Function is missing => ")
      return false;
    }


    let stack = [];
    let map = {
      '[': ']',
      '(': ')',
      '{': '}'
    }
    let s = this.state.ES6;
    for (let i = 0; i < s.length; i++) {
      if (s[i] == '[' || s[i] == '(' || s[i] == '{')
        stack.push(s[i])

      else if (s[i] == ']' || s[i] == ')' || s[i] == '}') {
        let x = stack.pop();
        if (map[x] != s[i]) {
          console.log("Please check closing brackets")
          return false;
        }
      }


    }

    if (stack.length != 0) {
      console.log("Please check closing brackets")
      return false;
    }


    return true;

  }

  render() {

    return (
      <div>

        <Switch>
          <Route exact path='/' render={() =>
            <HomePage
              handleLogout={this.handleLogout}
              user={this.state.user}
              onChange={this.handleES6TextChange}
              es6={this.state.ES6}
              convert={this.convertToES5}
              es5={this.state.ES5}
              disabled={!this.checkIfValid()}
              explain={this.explainCode}
              getTimeComplexity={this.getTimeComplexity}
            />
          } />

          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/login' render={({ history }) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />

        </Switch>
      </div>
    );
  }
}

export default App;

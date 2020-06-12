import React, { Component } from 'react';

import Login from '../components/login/Login';
import Dashboard from '../components/dashboard/Dashboard';
import Registro from '../components/registro/Registro';

import styles from '../assets/sass/Main.module.css';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      //token: '',
      token: '',
      haRenderizar: <Login onLogged={this.onLogged} onRegistrar={this.onRegistrar}/>
    }
  }

  onLogged = (token) => {
    this.setState({
      token: token,
      haRenderizar: <Dashboard token={token} onLogout={this.onLogout} />
    });
  }

  onLogout = () => {
    this.setState({
      token: '',
      haRenderizar: <Login onLogged={this.onLogged} onRegistrar={this.onRegistrar}/>
    });
  }

  onRegistrar = () => {
    this.setState({
      haRenderizar: <Registro onRegistrado={this.onRegistrado}/>
    });
  }

  onRegistrado = () => {
    this.setState({
      haRenderizar: <Login onLogged={this.onLogged} onRegistrar={this.onRegistrar}/>
    });
  }

  render = () => {
    return (
      <div className={styles['full-screen']}>
        {this.state.haRenderizar}
      </div>
    );
  }

  /*render = () => {
    return (
      <div className={styles['full-screen']}>
        <Dashboard token={this.state.token} onLogout={this.onLogout} />
      </div>
    );
  }*/
}

export default App;

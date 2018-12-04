import React, { Component } from "react";
import "./App.css";
import Login from "./components/homepage/Login";
import Register from "./components/homepage/Register";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { checkUser, getuser, getLocation } from "./components/redux/AppActions"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';
import UserPage from "./components/InnerLayout/UserPage"
import MoviePage from "./components/InnerLayout/MoviePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    }
  }
  componentDidMount() {
    const token = sessionStorage.getItem("token")
    this.props.setUserStatus(token);
    const id = sessionStorage.getItem("userId")
    this.props.getUser(id);
    this.props.getUserLocation();

  }

  onpickerClick = () => {
    this.props.history.push("/userinfo")
  }

  onmovieClick = () => {
    this.props.history.push("/movienight")
  }

  homeClick = () => {
    this.props.history.push("/")
  }

  onlogoutClick = () => {
    sessionStorage.removeItem("token")
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <div className="App App-dimmer">
        {!this.props.user.isLoggedIn && (
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route
                      path="/login"
                      component={() => <Login />}
                    />
                    <Route exact path="/" component={Register} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        )
        }
        {
          this.props.user.isLoggedIn && <div>
            <Route exact path="/" component={MoviePage} />
            <Route path="/userinfo" component={UserPage} />
            <Route exact path="/userinfo/:id" component={UserPage} />
            <Navbar color="black" dark expand="lg">
              <NavbarBrand style={{ color: "white" }} onClick={this.homeClick} href="#">Movie App</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" tabs>
                  <NavItem>
                    <NavLink style={{ color: "white" }} onClick={this.onrecommendedClick} href="#">Recommended Movies For You</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ color: "white" }} onClick={this.onmovieClick} href="#">Movie Night Randomizer</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ color: "white" }} onClick={this.onpickerClick} href="#">User Settings</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ color: "red" }} onClick={this.onlogoutClick} href="/login">Logout</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>

          </div>
        }
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.AppReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserStatus: (token) => {
      dispatch(checkUser(token))
    },
    getUser: (id) => {
      dispatch(getuser(id))
    },
    getUserLocation: () => {
      dispatch(getLocation());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from "react";
import "./App.css";
import Login from "./components/homepage/Login";
import Register from "./components/homepage/Register";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
  checkUser,
  getuser,
  getLocation,
  getaspid,
  getUserId
} from "./components/redux/AppActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import MovieRandomizer from "./components/InnerLayout/MovieRandomizer";
import UserPage from "./components/InnerLayout/UserPage";
import MoviePage from "./components/InnerLayout/MoviePage";
import RecommendedMovies from "./components/InnerLayout/RecommendedMovies";
import HomePage from "./components/InnerLayout/HomePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }
  componentDidMount() {
    const token = sessionStorage.getItem("token");
    this.props.setUserStatus(token);
    const id = sessionStorage.getItem("userId");
    this.props.getUser(id);
    this.props.getUserLocation();
  }

  onpickerClick = () => {
    this.props.history.push("/userinfo");
  };

  onmovieClick = () => {
    this.props.history.push("/movienight");
  };

  homeClick = () => {
    this.props.history.push("/");
  };

  onrecommendedClick = () => {
    this.props.history.push("/recommended");
  };

  onlogoutClick = () => {
    sessionStorage.removeItem("token");
  };

  onCurrentClick = () => {
    this.props.history.push("/current");
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

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
                    <Route path="/login" component={() => <Login />} />
                    <Route exact path="/" component={Register} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        )}
        {this.props.user.isLoggedIn && (
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/current" component={MoviePage} />
            <Route path="/userinfo" component={UserPage} />
            <Route exact path="/userinfo/:id" component={UserPage} />
            <Route exact path="/movienight" component={MovieRandomizer} />
            <Route exact path="/recommended" component={RecommendedMovies} />
            <Navbar color="black" dark expand="lg">
              <NavbarBrand
                style={{ color: "white" }}
                onClick={this.homeClick}
                href="#"
              >
                Movie App
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" tabs>
                  <NavItem>
                    <NavLink
                      style={{ color: "white" }}
                      onClick={this.onCurrentClick}
                      href="#"
                    >
                      Movies Currently Out
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ color: "white" }}
                      onClick={this.onrecommendedClick}
                      href="#"
                    >
                      Recommended Movies For You
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ color: "white" }}
                      onClick={this.onmovieClick}
                      href="#"
                    >
                      Upcoming Movies
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ color: "white" }}
                      onClick={this.onpickerClick}
                      href="#"
                    >
                      User Settings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ color: "red" }}
                      onClick={this.onlogoutClick}
                      href="/login"
                    >
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        )}
      </div>
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
    setUserStatus: token => {
      dispatch(checkUser(token));
    },
    getUser: id => {
      dispatch(getuser(id));
    },
    getUserLocation: () => {
      dispatch(getLocation());
    },
    getAsp: email => {
      dispatch(getaspid(email)).then(resp => {
        dispatch(getUserId(resp.action.payload));
      });
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

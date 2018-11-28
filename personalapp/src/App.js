import React, { Component } from "react";
import "./App.css";
import Login from "./components/homepage/Login";
import Register from "./components/homepage/Register";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import MoviePage from "./components/InnerLayout/MoviePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  onpickerClick = () => {
    this.props.history.push("/moviepicker")
  }

  onmovieClick = () => {
    this.props.history.push("/movienight")
  }

  homeClick = () => {
    this.props.history.push("/")
  }

  toggleLogin = () => {
    this.setState({ isLoggedIn: true });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn || (
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
                      component={() => <Login onClick={this.toggleLogin} />}
                    />
                    <Route exact path="/" component={Register} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        )}
        {!this.state.isLoggedIn || <div>
          <Route path="/" component={MoviePage} />
          <Navbar color="dark" dark expand="md">
            <NavbarBrand onClick={this.homeClick} href="#">Movie Matchmaking</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" tabs>
                <NavItem>
                  <NavLink style={{ color: "white" }} onClick={this.onpickerClick} href="#">Recommended Movies For You</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: "white" }} onClick={this.onmovieClick} href="#">Movie Night Randomizer</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle style={{ color: "white" }} nav caret>
                    Options
                </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                  </DropdownItem>
                    <DropdownItem>
                      Option 2
                  </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.LocationReducer
  };
};

export default withRouter(connect(mapStateToProps)(App));

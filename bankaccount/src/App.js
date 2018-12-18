import React, { Component } from "react";
import "./App.css";
import Login from "./components/homepage/Login";
import Register from "./components/homepage/Register";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { checkUser } from "./components/redux/BankActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import InitialPage from "./components/layout/InitialPage";
import TransactionHistory from "./components/layout/TransactionHistory";
import BankTransactions from "./components/layout/BankTransaction";

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
  }

  ontransactionClick = () => {
    this.props.history.push("/banktransaction");
  };

  homeClick = () => {
    this.props.history.push("/");
  };

  onlogoutClick = () => {
    sessionStorage.removeItem("token");
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <div className="App">
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
            <Route exact path="/" component={InitialPage} />
            <Navbar color="dark" dark expand="lg">
              <NavbarBrand
                style={{ color: "white" }}
                onClick={this.homeClick}
                href="#"
              >
                The World's Greatest Banking Ledger
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" tabs>
                  <NavItem>
                    <NavLink
                      style={{ color: "white" }}
                      onClick={this.ontransactionClick}
                      href="#"
                    >
                      Create Bank Transaction
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
            <Route exact path="/banktransaction" component={BankTransactions} />
            <Route
              exact
              path="/transactionhistory"
              component={TransactionHistory}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.BankReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserStatus: token => {
      dispatch(checkUser(token));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

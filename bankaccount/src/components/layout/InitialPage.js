import React from "react";
import "./InitialPage.css";
import BankService from "../services/BankServices";
import { connect } from "react-redux";

class InitialPage extends React.Component {
  state = {
    value: ""
  };

  async componentDidMount() {
    const bankinfo = await BankService.getBankAccountInfo(
      this.props.user.AspId
    );
    console.log(bankinfo.data.Value);
    this.setState(
      {
        value:
          bankinfo.data.Value === 0
            ? `$${bankinfo.data.Value}.00`
            : `$${bankinfo.data.Value}`
      },
      () => console.log(this.state)
    );
  }

  onClick = evt => {
    this.props.history.push("/transactionhistory");
  };

  render() {
    return (
      <div className="realbackground">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container container-fluid px-4">
            <div className="row">
              <div className="authentication-inner py-5 mx-auto">
                <div
                  className=""
                  style={{
                    minWidth: "25vw",
                    maxWidth: "70vw",
                    minHeight: "60vh",
                    maxHeight: "85vh"
                  }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center pb-2 mb-4"
                    style={{
                      minWidth: "25vw",
                      maxWidth: "20vw",
                      minHeight: "60vh",
                      maxHeight: "85vh"
                    }}
                  >
                    <div className="container card">
                      <div className="card-body">
                        <div className="d-flex justify-content-center align-items-center pb-2 mb-4">
                          <h3>{`Current balance: ${this.state.value}`}</h3>
                        </div>
                        <button
                          className="btn btn-primary"
                          style={{ width: "18vw" }}
                          onClick={this.onClick}
                        >
                          Transaction History
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.BankReducer
  };
};

export default connect(mapStateToProps)(InitialPage);

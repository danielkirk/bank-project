import React, { Component } from "react";
import "./InitialPage.css";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import BankService from "../services/BankServices";
import { connect } from "react-redux";
import TextInput from "../common/TextInput";

class BankTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionAmount: "",
      transactionType: "",
      selectedOption: "",
      TransactionDate: ""
    };
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    if (this.state.transactionType === 1) {
      this.setState({ [key]: val }, () => console.log(key, val));
    } else {
      this.setState({ [key]: `-${val}` }, () => console.log(key, val));
    }
  };

  handleChange = selectedOption => {
    this.setState({ transactionType: selectedOption.value });
    console.log(selectedOption.value);
  };

  submitClick = async evt => {
    evt.preventDefault();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    var today = mm + "/" + dd + "/" + yyyy;
    const { transactionAmount, transactionType } = this.state;
    const data = {
      BankAccountId: this.props.user.BankId,
      TransactionId: transactionType,
      TransactionAmount: transactionAmount,
      TransactionDate: today
    };
    console.log(data);
    await BankService.createTransaction(data);
    await this.props.history.push("/");
  };

  render() {
    const options = [
      { value: 1, label: "Deposit" },
      { value: 2, label: "Withdraw" }
    ];
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <div className="bankBackground">
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
                        <h3>Account Transaction</h3>
                        <br />
                        <div className="d-flex justify-content-center align-items-center pb-2 mb-4">
                          <form className="form-group">
                            <Select
                              name="transactionType"
                              options={options}
                              onChange={this.handleChange}
                            />
                            <TextInput
                              className="form-control"
                              name="transactionAmount"
                              type="number"
                              min="1"
                              step="any"
                              onChange={this.onChange}
                            />
                            <br />
                            <button
                              className="btn btn-primary form-control"
                              onClick={this.submitClick}
                            >
                              Complete Transaction
                            </button>
                          </form>
                        </div>
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

export default withRouter(connect(mapStateToProps)(BankTransactions));

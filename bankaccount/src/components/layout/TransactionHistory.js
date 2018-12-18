import React from "react";
import "./InitialPage.css";
import { Table } from "reactstrap";
import BankService from "../services/BankServices";
import { connect } from "react-redux";

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }
  async componentDidMount() {
    const transactions = await BankService.getTransactions(
      this.props.user.AspId
    );
    this.setState({ transactions: transactions.data });
  }

  render() {
    return (
      <div className="realbackground" style={{ overflowY: "scroll" }}>
        <div className="d-flex align-items-center">
          <Table dark>
            <thead>
              <tr>
                <th>Transaction Type:</th>
                <th>Transaction Amount:</th>
                <th>Transaction Date:</th>
              </tr>
              {this.state.transactions.map(item => {
                return (
                  <tr>
                    <td>{item.TransactionId === 1 ? "Deposit" : "Withdraw"}</td>
                    <td>{`$${item.TransactionAmount}`}</td>
                    <td>{item.TransactionDate.split("T")[0]}</td>
                  </tr>
                );
              })}
            </thead>
          </Table>
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

export default connect(mapStateToProps)(TransactionHistory);

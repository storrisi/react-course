import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { Date, Amount } from "./style";
import { validateFields } from "../../utils/formValidation";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.customers = [
      {
        id: 1,
        first_name: "Simone",
        last_name: "Torrisi",
        date: "1980-10-10",
        balance: 100
      },
      {
        id: 2,
        first_name: "Mario",
        last_name: "Rossi",
        date: "1980-12-10",
        balance: 200
      },
      {
        id: 3,
        first_name: "Giovanni",
        last_name: "Verdi",
        date: "1980-11-10",
        balance: 300
      }
    ];

    this.state = {
      customers: this.customers,
      currentCustomer: {},
      isUpdating: false
    };
  }

  handleFormSubmit = () => {
    const { customers, currentCustomer, isUpdating } = this.state;
    if (
      !validateFields(
        ["first_name", "last_name", "date", "balance"],
        currentCustomer
      )
    )
      return this.setState({ validationError: true });
    const updatedList = customers;
    const updatedItem = {
      ...currentCustomer,
      id: currentCustomer.id || uuidv4()
    };
    if (!isUpdating) updatedList.push(updatedItem);
    else {
      updatedList.splice(
        customers.findIndex(customer => customer.id === currentCustomer.id),
        1,
        updatedItem
      );
    }
    this.setState({
      customers: updatedList,
      currentCustomer: {},
      isUpdating: false,
      validationError: false
    });
  };

  updateItem = id =>
    this.setState({
      currentCustomer: {
        ...this.state.customers.find(customer => customer.id === id)
      },
      isUpdating: true
    });

  removeItem = id => {
    this.setState({
      customers: this.state.customers.filter(customer => customer.id !== id)
    });
  };

  getValue = value => this.state.currentCustomer[value] || "";
  handleChange = (value, name) =>
    this.setState(
      { currentCustomer: { ...this.state.currentCustomer, [name]: value } },
      () => console.log(this.state)
    );

  render() {
    const { customers, filter, isUpdating, validationError } = this.state;
    const filteredCustomers = filter
      ? customers.filter(
          customer =>
            customer.first_name.toLowerCase().includes(filter) ||
            customer.last_name.toLowerCase().includes(filter)
        )
      : customers;
    return (
      <section>
        <div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={this.getValue("first_name")}
              onChange={event =>
                this.handleChange(event.target.value, "first_name")
              }
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={this.getValue("last_name")}
              onChange={event =>
                this.handleChange(event.target.value, "last_name")
              }
            />
          </div>
          <div>
            <label>Birth Date</label>
            <input
              type="date"
              value={this.getValue("date")}
              onChange={event => this.handleChange(event.target.value, "date")}
            />
          </div>
          <div>
            <label>Balance</label>
            <input
              type="number"
              value={this.getValue("balance")}
              onChange={event =>
                this.handleChange(event.target.value * 1, "balance")
              }
            />
          </div>
          <button onClick={() => this.handleFormSubmit()}>
            {isUpdating ? "Edit Customer" : "Add a new Customer"}
          </button>
          {validationError && <p>All fields are mandatory</p>}
        </div>
        <label>Search by Name or Surname</label>
        <input
          type="text"
          onChange={event =>
            this.setState({ filter: event.target.value.toLowerCase() })
          }
        />
        {customers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birth Date</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>
                    <Date>{customer.date}</Date>
                  </td>
                  <td>
                    <Amount>{customer.balance}</Amount>
                  </td>
                  <td>
                    <button onClick={() => this.updateItem(customer.id)}>
                      Update Item
                    </button>
                  </td>
                  <td>
                    <button onClick={() => this.removeItem(customer.id)}>
                      Remove Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Customers</p>
        )}
        <p>Total customers: {filteredCustomers.length}</p>
        <p>
          Total balance:{" "}
          {filteredCustomers.reduce(
            (previous, customer) => previous + customer.balance,
            0
          )}
        </p>
      </section>
    );
  }
}

export default Customers;

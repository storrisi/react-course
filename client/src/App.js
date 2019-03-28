import React, { Component } from 'react';
import uuidv4 from 'uuid/v4'
import './App.css';
import {Text, DateText, Amount} from './style'
 
class App extends Component {
  constructor(props) {
    super(props)

    this.customers = [
      {
        id: 1,
        first_name: 'Simone',
        last_name: 'Torrisi',
        birth_date: new Date(),
        amount: 51000
      },
      {
        id: 2,
        first_name: 'GianMario',
        last_name: 'Torrisi',
        birth_date: new Date(),
        amount: 32000
      }
    ]

    this.state = {
      currentCustomer: {},
      isUpdating: false,
      validationError: null,
      customers: this.customers
    }
  }

  updateItem = item =>
    this.setState({
      currentCustomer: item,
      isUpdating: true
    });

  removeItem = id => {
    this.setState(state => {return {customers: state.customers.filter(c => c.id !== id)}})
  }

  renderRow = (item) => 
    <tr key={item.id}>
      <td><Text>{item.first_name}</Text></td>
      <td><Text>{item.last_name}</Text></td>
      <td><DateText>{item.birth_date.toLocaleDateString()}</DateText></td>
      <td><Amount>{item.amount}</Amount> </td>
      <td><button onClick={() => this.updateItem(item)}>Update Customer</button></td>
      <td><button onClick={() => this.removeItem(item.id)}>Delete Customer</button></td>
    </tr>

  getValue = value => this.state.currentCustomer[value] || "";
  
  handleChange =  (event) => {
    const {name, value} = event.target
    this.setState(
      { currentCustomer: { ...this.state.currentCustomer, [name]: value } }
    );
  }

  handleFormSubmit = () => {
    const { customers, currentCustomer, isUpdating } = this.state;
    if (
      !this.validateFields(
        ["first_name", "last_name", "birth_date", "amount"],
        currentCustomer
      )
    ) 
      return this.setState({ validationError: true });

    const updatedList = [...customers];
    const updatedItem = {
      ...currentCustomer,
      birth_date: new Date(currentCustomer.birth_date),
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
      isUpdating: false,
      currentCustomer: {},
      validationError: false
    });
  };

  validateFields = (fieldsToValidate, itemToValidate) => {
    if (Object.keys(itemToValidate).length === 0) return false;
    return fieldsToValidate.every(item =>
      Object.keys(itemToValidate).includes(item)
    );
  }

  render() {
    const {customers, search, isUpdating, validationError} = this.state

    const filteredItems = search ? customers.filter(customer => 
      customer.first_name.toLowerCase().startsWith(search) 
      || customer.last_name.toLowerCase().startsWith(search)
      || customer.birth_date.toLocaleString().includes(search)
    ) : customers

    return (
      <div>
        <input type="text" placeholder="Search..." onChange={event => this.setState({search: event.target.value})} />
        <table>
            <tbody>
              {filteredItems.length > 0 && filteredItems.map(item => this.renderRow(item))}
            </tbody>
        </table>
        <p>Total amount of customers: {filteredItems.length}</p>
        <p>Total amount of balances: {filteredItems.reduce((previous, current) => previous + current.amount, 0)}</p>
        <div>
          <h2>Update Customers Data</h2>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={this.getValue("first_name")}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={this.getValue("last_name")}
              onChange={event => this.handleChange(event.target.value, "last_name")}
            />
          </div>
          <div>
            <label>Birth Date</label>
            <input
              type="date" //yyyy-mm-dd
              value={this.getValue("birth_date") && new Date(this.getValue("birth_date")).toISOString().slice(0,10)}
              onChange={event => this.handleChange(event.target.value, "birth_date")}
            />
          </div>
          <div>
            <label>Balance</label>
            <input
              type="number"
              value={this.getValue("amount")}
              onChange={event => this.handleChange(event.target.value * 1, "amount")}
            />
          </div>
          <button onClick={this.handleFormSubmit}>
            {isUpdating ? "Edit Customer" : "Add a new Customer"}
          </button>
          {validationError && <p>All fields are mandatory</p>}
        </div>
      </div>
    );
  }
}

export default App;

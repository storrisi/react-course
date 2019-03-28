import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import CustomersReportBar from './CustomersReportBar'
import SearchField from '../../components/UI/SearchField';
import CustomersList from './CustomersList';
import CustomerEditForm from './CustomersEditForm';
class Customers extends Component {
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
    const {customers, search, isUpdating, validationError, currentCustomer} = this.state

    const filteredItems = search ? customers.filter(customer => 
      customer.first_name.toLowerCase().startsWith(search) 
      || customer.last_name.toLowerCase().startsWith(search)
      || customer.birth_date.toLocaleString().includes(search)
    ) : customers

    return (
      <div>
        <SearchField onSearch={(value) => this.setState({search: value})} />
        <CustomersList items={filteredItems} updateItem={this.updateItem} removeItem={this.removeItem} />
        <CustomersReportBar items={filteredItems} />
        <CustomerEditForm customer={currentCustomer} validationError={validationError} onSubmit={this.handleFormSubmit} isUpdating={isUpdating} handleChange={this.handleChange} />
      </div>
    );
  }
}

export default Customers;

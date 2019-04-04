import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import CustomersReportBar from './CustomersReportBar'
import SearchField from '../../components/UI/SearchField';
import CustomersList from './CustomersList';
import CustomerEditForm from './CustomersEditForm';
import CustomerDetails from './CustomersDetails';
class Customers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCustomer: {},
      selectedCustomer: {},
      isUpdating: false,
      validationError: null,
      customers: []
    }
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/api/getCustomers`)
    .then(result => {
      console.log(result)
      this.setState({customers: result.data})
    })
  }

  selectItem = item =>
    this.setState({
      selectedCustomer: item
    });

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
        ["first_name", "last_name", "birth_date", "balance"],
        currentCustomer
      )
    ) 
      return this.setState({ validationError: true });

    const updatedList = [...customers];
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

  getUserDetails = (id) => {
    this.setState({userDetails: `Details of user ${id}`})
  }

  render() {
    const {customers, search, isUpdating, validationError, currentCustomer, selectedCustomer, userDetails} = this.state

    const filteredItems = search ? customers.filter(customer => 
      customer.first_name.toLowerCase().startsWith(search) 
      || customer.last_name.toLowerCase().startsWith(search)
      || customer.birth_date.includes(search)
    ) : customers

    return (
      <div>
        <SearchField onSearch={(value) => this.setState({search: value})} />
        <CustomersList items={filteredItems} updateItem={this.updateItem} removeItem={this.removeItem} selectItem={this.selectItem} />
        <CustomersReportBar items={filteredItems} />
        <CustomerEditForm customer={currentCustomer} validationError={validationError} onSubmit={this.handleFormSubmit} isUpdating={isUpdating} handleChange={this.handleChange} />
        <CustomerDetails customer={selectedCustomer} userDetails={userDetails} getUserDetails={this.getUserDetails} />
      </div>
    );
  }
}

export default Customers;

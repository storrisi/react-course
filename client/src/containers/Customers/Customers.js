import React, { Component } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {loadData, validateAll, updateCustomer} from '../../actions/customers'

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
    this.props.loadData()
  }

  componentDidUpdate(prevProps) {
    const {updateCustomer, isValid} = this.props
    const { currentCustomer } = this.state;
    if (prevProps.isValid !== isValid) {
      if (isValid === false) return this.setState({validationError: true})
      if(isValid === true ) updateCustomer(currentCustomer).then(() =>
        this.setState({
          isUpdating: false,
          currentCustomer: {},
          validationError: false
        })
      )
    }
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
    const {validateAll} = this.props
    const { currentCustomer } = this.state;
    validateAll(currentCustomer)
  };

  getUserDetails = (id) => {
    this.setState({userDetails: `Details of user ${id}`})
  }

  render() {
    const {search, isUpdating, validationError, currentCustomer, selectedCustomer, userDetails} = this.state
    const {customers} = this.props
    
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

const mapStateToProps = (state) => ({
  customers: state.customers.items,
  isValid: state.customers.isValid
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadData,
      validateAll, 
      updateCustomer
    },
    dispatch
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(Customers);

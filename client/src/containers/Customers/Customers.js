import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { validateFields } from "../../utils/formValidation";
import CustomersList from "./CustomersList/CustomersList";
import CustomerEditForm from "./CustomerEditForm";
import SearchField from "../../components/UI/SearchField/SearchField";
import CustomersReport from "./CustomersReport";

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
      validationError: false
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
      isUpdating: false,
      currentCustomer: {},
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

  getValue = value => this.props.customer[value] || "";
  handleChange = (value, name) =>
    this.setState(
      { currentCustomer: { ...this.state.currentCustomer, [name]: value } },
      () => console.log(this.state)
    );

  render() {
    const {
      customers,
      filter,
      validationError,
      currentCustomer,
      isUpdating
    } = this.state;

    const filteredCustomers = filter
      ? customers.filter(
          customer =>
            customer.first_name.toLowerCase().includes(filter) ||
            customer.last_name.toLowerCase().includes(filter)
        )
      : customers;

    return (
      <section>
        <CustomerEditForm
          customer={currentCustomer}
          onSubmit={this.handleFormSubmit}
          isUpdating={isUpdating}
          validationError={validationError}
          handleChange={this.handleChange}
        />
        <SearchField onSearch={value => this.setState({ filter: value })} />
        {customers.length > 0 ? (
          <CustomersList
            items={filteredCustomers}
            removeItem={this.removeItem}
            updateItem={this.updateItem}
          />
        ) : (
          <p>No Customers</p>
        )}
        <CustomersReport customers={filteredCustomers} />
      </section>
    );
  }
}

export default Customers;

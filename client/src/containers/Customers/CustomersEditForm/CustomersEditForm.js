import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/UI/Button";

class CustomerEditForm extends Component {
  getValue = value => this.props.customer[value] || "";
  render() {
    const { validationError, onSubmit, isUpdating, handleChange } = this.props;
    return (
      <div>
          <h2>Update Customers Data</h2>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={this.getValue("first_name")}
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={this.getValue("last_name")}
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label>Birth Date</label>
            <input
              type="date" //yyyy-mm-dd
              name="birth_date"
              value={this.getValue("birth_date") && new Date(this.getValue("birth_date")).toISOString().slice(0,10)}
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label>Balance</label>
            <input
              type="number"
              name="amount"
              value={this.getValue("amount")}
              onChange={event => handleChange(event)}
            />
          </div>
          <Button onClick={onSubmit}>{isUpdating ? "Edit Customer" : "Add a new Customer"}</Button>
          {validationError && <p>All fields are mandatory</p>}
        </div>
    );
  }
}

CustomerEditForm.propTypes = {
  customer: PropTypes.object,
  validationError: PropTypes.bool,
  onSubmit: PropTypes.func,
  isUpdating: PropTypes.bool,
  handleChange: PropTypes.func
};

export default CustomerEditForm;
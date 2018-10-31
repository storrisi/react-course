import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/UI/Button";

class CustomerEditForm extends Component {
  getValue = value => this.props.customer[value] || "";
  render() {
    const { validationError, onSubmit, isUpdating, handleChange } = this.props;
    return (
      <div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={this.getValue("first_name")}
            onChange={event => handleChange(event.target.value, "first_name")}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={this.getValue("last_name")}
            onChange={event => handleChange(event.target.value, "last_name")}
          />
        </div>
        <div>
          <label>Birth Date</label>
          <input
            type="date"
            value={this.getValue("date")}
            onChange={event => handleChange(event.target.value, "date")}
          />
        </div>
        <div>
          <label>Balance</label>
          <input
            type="number"
            value={this.getValue("balance")}
            onChange={event => handleChange(event.target.value * 1, "balance")}
          />
        </div>
        <Button onClick={() => onSubmit()}>
          {isUpdating ? "Edit Customer" : "Add a new Customer"}
        </Button>
        {validationError && <p>All fields are mandatory</p>}
      </div>
    );
  }
}

CustomerEditForm.propTypes = {
  validationError: PropTypes.bool,
  onSubmit: PropTypes.func,
  isUpdating: PropTypes.func,
  handleChange: PropTypes.func
};

export default CustomerEditForm;

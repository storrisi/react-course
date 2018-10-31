import React from "react";
import PropTypes from "prop-types";
import Button from "../../../components/UI/Button";
import Date from "../../../components/styled/Date";
import Amount from "../../../components/styled/Amount";

const CustomersList = ({ items, updateItem, removeItem }) => {
  return (
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
        {items.map(customer => (
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
              <Button onClick={() => updateItem(customer.id)}>
                Update Item
              </Button>
            </td>
            <td>
              <Button onClick={() => removeItem(customer.id)}>
                Remove Item
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

CustomersList.propTypes = {
  items: PropTypes.array,
  updateItem: PropTypes.func,
  removeItem: PropTypes.func
};

export default CustomersList;

import React from "react";
import PropTypes from "prop-types";

const CustomersReport = ({ customers }) => (
  <div>
    <p>Total customers: {customers.length}</p>
    <p>
      Total balance:{" "}
      {customers.reduce((previous, customer) => previous + customer.balance, 0)}
    </p>
  </div>
);

CustomersReport.propTypes = {
  customers: PropTypes.array
};

export default CustomersReport;

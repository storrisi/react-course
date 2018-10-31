import React from "react";

const CustomersReport = ({ customers }) => (
  <div>
    <p>Total customers: {customers.length}</p>
    <p>
      Total balance:{" "}
      {customers.reduce((previous, customer) => previous + customer.balance, 0)}
    </p>
  </div>
);

export default CustomersReport;

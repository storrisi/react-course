import React from 'react'

const CustomersReportBar = ({items}) => <div>
    <p>Total amount of customers: {items.length}</p>
    <p>Total amount of balances: {items.reduce((previous, current) => previous + current.amount, 0)}</p>
</div>

export default CustomersReportBar

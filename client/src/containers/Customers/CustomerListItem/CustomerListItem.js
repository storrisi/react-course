import React from 'react'
import Text from '../../../components/styled/Text';
import Date from '../../../components/styled/Date';
import Amount from '../../../components/styled/Amount';
import Button from '../../../components/UI/Button';

const CustomerListItem = ({item, updateItem, removeItem}) => {
  return (
    <tr key={item.id}>
      <td><Text>{item.first_name}</Text></td>
      <td><Text>{item.last_name}</Text></td>
      <td><Date>{item.birth_date.toLocaleDateString()}</Date></td>
      <td><Amount>{item.amount}</Amount> </td>
      <td><Button onClick={() => updateItem(item)}>Update Customer</Button></td>
      <td><Button onClick={() => removeItem(item.id)}>Delete Customer</Button></td>
    </tr>
  )
}

export default CustomerListItem

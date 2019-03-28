import React from 'react'
import CustomerListItem from '../CustomerListItem';

const CustomersList = ({items, updateItem, removeItem}) => {
  return (
    <table>
        <tbody>
            {items.length > 0 && items.map(item => 
              <CustomerListItem 
              key={item.id} 
              item={item} 
              updateItem={updateItem} 
              removeItem={removeItem} />)}
        </tbody>
    </table>
  )
}

export default CustomersList

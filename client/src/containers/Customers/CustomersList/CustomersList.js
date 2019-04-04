import React from 'react'
import CustomerListItem from '../CustomerListItem';

const CustomersList = ({items, updateItem, removeItem, selectItem}) => {
  return (
    <table>
        <tbody>
            {items.length > 0 && items.map(item => 
              <CustomerListItem 
              key={item.id} 
              item={item} 
              selectItem={selectItem} 
              updateItem={updateItem} 
              removeItem={removeItem} />)}
        </tbody>
    </table>
  )
}

export default CustomersList

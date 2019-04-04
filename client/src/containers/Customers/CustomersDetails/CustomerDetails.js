import React, { Component } from 'react'

export default class CustomerDetails extends Component {
    state = {
        currentCustomer: null
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (Object.keys(nextProps.customer).includes('id'))
        return {
            currentCustomer: nextProps.customer,
            userDetails: nextProps.userDetails
        }

        return null
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.customer.id !== this.props.customer.id) {
            this.props.getUserDetails(this.props.customer.id)
        }
    }
    
  render() {
      const {userDetails, currentCustomer} = this.state
      console.log("this.state", this.state)
      console.log("this.props", this.props)
    return (
      <div>
        {currentCustomer ? 
        <>
            <p>{currentCustomer.first_name}</p>
            <p>{currentCustomer.last_name}</p>
            <p>{userDetails}</p>
        </> : <p>Nessun cliente selezionato</p>}
      </div>
    )
  }
}

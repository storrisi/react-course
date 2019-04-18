import axios from 'axios'

export const validateFields = (fieldsToValidate, itemToValidate) => {
    return new Promise((resolve, reject) => {
        if (Object.keys(itemToValidate).length === 0) reject('validateFields failed');
        if (fieldsToValidate.every(item =>
            Object.keys(itemToValidate).includes(item) && itemToValidate[item]
        )) {
            resolve(true)
        } else {
            reject('validateFields failed')
        }
    })
}

export const validateIban = iban => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/checkIban`, {
        iban
    })
    .then(result => {
        if (!result.data.isValid) reject('iban not valid')
        resolve(true)
    })})
}

export const validateCCNo = ccNo => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/checkCCNo`, {
        ccNo
        })
        .then(result => {
        if (!result.data.isValid) reject('cc not valid')
        resolve(true)
        })
    })
}
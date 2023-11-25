// const express = require('express');
// const cors = require('cors');
// const app = express();

// // Enable CORS
// app.use(cors());

// const fetchSearch = (searchTerm) => {
//     return fetch(`http://localhost:4000/main/${searchTerm}`)
//     .then(response => response.json())
//     .then(resData => resData.results)
// }

// const wrapPromise = (promise) => {
//     let status = 'pending'
//     let result = ''
//     let suspender = promise.then(response => {
//         status = 'success'
//         result = response
//     }, err => {
//         status = 'error'
//         result = err
//     })
//     return {
//         read() {
//             if(status === 'pending') {
//                 throw suspender
//             } else if (status === 'error') {
//                 throw result
//             }
//             return result
//         }
//     }
// }

// export const createResource = (searchTerm) => {
//     return {
//         result: wrapPromise(fetchSearch(searchTerm))
//     }
// }



const API_URL = `https://itunes.apple.com/search?term=`
const fetchSearch = async (searchTerm) => {
    const response = await fetch(API_URL + searchTerm)
    const resData = await response.json()
    return resData.results
}

const wrapPromise = (promise) => {
    let status = 'pending'
    let result = ''
    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err
    })

    return {
        read() {
            if(status === 'pending') {
                throw suspender
            }
            else if (status === 'error') {
                throw result
            }
            return result
        }
    }
}

export const createResource = (searchTerm) => {
    return {
        result: wrapPromise(fetchSearch(searchTerm))
    }
}

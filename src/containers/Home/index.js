import React, { useState } from "react";

import {ApiService} from '../../ApiCalls/SearchWordApi'

function App() {

  //will store data in data state after input search
  const [data, setDatas ] = useState([])
  //will store nameInput value
  const [inputValue, setInputValue] = useState('')
  //for error case on nameInput
  const [error, setError ] = useState('')

  //handle change function runs when any change event call on input box
  const _handleChange = event => {
    event.preventDefault()
    setInputValue(event.target.value)
  }

  

  //making api call to search data and return array of data to store
  const callApiToSearchRelateWord = async () => {
    
    const searchByWordResponse = await ApiService(inputValue)
    return searchByWordResponse
  }

  //validating form inputValue
  const _validateForm = () => {
    let isFormValue = true
    if(inputValue.trim() === ''){
      isFormValue = false
      setError('Please enter some value on input box')
    }
    return isFormValue
  }

  //when submit button click the api will call to search data according to the inputValue
  const _handleSubmitFormData = async event => {
    event.preventDefault()
    if(_validateForm()){
      const storeApiResponse = await callApiToSearchRelateWord()
      if(storeApiResponse !== false){
        setDatas(storeApiResponse)
      }
    }
  }

  //integrating data on rows
  const integrateSearchData = (count = 0) => {
    if(data?.length > 0 && data !== undefined){
      return data.map( (data, index) => {
       return data.definitions.map( (record, key) => {
        count++
        return (
          <tr key={ `setSearchValueKey${index}${key}`}>
            <td>{count}</td>
            <td>{record.definition}</td>
          </tr>
        )
       })
       
      })
    }
    return (
      <tr>
        No Record Found
      </tr>
    )
    
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md">
          <form onSubmit={ event => _handleSubmitFormData(event)}>
            <div className="form-group">
              <label for="inputWordSearch">Enter Word</label>
              <input type="text" className="form-control" aria-label="form-field-nameInput" aria-describedby="searchWord" name="nameInput" onChange={ event => _handleChange(event)} placeholder="Enter your search word" />
              { error ? (
                  <div>{ error }</div>
                ) : ''
              }
            </div>
            <button type="submit" aria-label="form-submitButton" className="btn btn-primary">Submit</button>
          </form>
          <table className="table table-striped w-auto">
            <thead>
              <th>Serial Number</th>
              <th>Related Data</th>
            </thead>
            <tbody>
              { integrateSearchData() }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

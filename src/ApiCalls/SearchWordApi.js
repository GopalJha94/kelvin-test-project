import axios from 'axios'

import { displayErrorMessage } from '../utils'

const ApiService = async (inputValue) => {
    try{
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue.trim()}`)
        if(response.status === 200){
          const { meanings } = response.data[0]
          if(meanings.length > 0){
            return meanings
          }
          displayErrorMessage('No Record Found')
          return false 
        }
      }catch(error){
        return false
      }
}


export {ApiService}
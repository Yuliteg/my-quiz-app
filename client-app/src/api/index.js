import axios from 'axios'

export const URL = "http://localhost:5248/"

export const ENDPOINT = {
  participant: 'Participant',
  question: 'Question',
  getAnswers: 'Question/getanswers'
}

export const createAPIEndpoint = (endpoint) => {
  let url = URL + 'api/' + endpoint + '/'

  return {
    fetch: () => axios.get(url),
    post: newRec => axios.post(url, newRec),
    put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
  }
}
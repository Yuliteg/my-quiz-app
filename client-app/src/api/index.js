import axios from 'axios'

export const URL = "http://localhost:5248/"

export const ENDPOINT = {
  participant: 'Participant'
}

export const createAPIEndpoint = (endpoint) => {
  let url = URL + 'api/' + endpoint + '/'

  return {
    fetch: () => axios.get(url),
    post: newRec => axios.post(url, newRec)
  }
}
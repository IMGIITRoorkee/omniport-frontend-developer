import axios from 'axios'

import { getCookie } from 'formula_one'
import { urlAppList, urlAppDetail } from '../urls'

export const setOptionsList = () => {
  return dispatch => {
    axios
      .options(urlAppList())
      .then(res => {
        dispatch({
          type: 'SET_OPTIONSLIST',
          payload: {
            isLoaded: true,
            data: res.data
          }
        })
      })
      .catch(err => {})
  }
}

export const setAppList = () => {
  return dispatch => {
    axios
      .get(urlAppList())
      .then(res => {
        dispatch({
          type: 'SET_APPLIST',
          payload: {
            isLoaded: true,
            data: res.data
          }
        })
      })
      .catch(err => {})
  }
}

export const addApp = data => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .post(urlAppList(), data, { headers: headers })
      .then(res => {
        window.location.replace(`../${res.data.id}`)
      })
      .catch(err => {})
  }
}

export const setActiveApp = id => {
  return dispatch => {
    axios
      .get(urlAppDetail(id))
      .then(res => {
        dispatch({
          type: 'SET_ACTIVE_APP',
          payload: {
            isLoaded: true,
            data: res.data,
            inEditMode: 'none'
          }
        })
      })
      .catch(err => {})
  }
}

export const deleteApp = id => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios.delete(urlAppDetail(id), { headers: headers }).then(res => {
      dispatch({
        type: 'DELETE_APP',
        payload: id
      })
      window.location.replace('../')
    })
  }
}

export const changeActiveApp = (id, field, data) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: 'SET_CHANGING',
      payload: {
        inEditMode: field,
        isLoaded: true
      }
    })
    axios
      .patch(urlAppDetail(id), data, { headers: headers })
      .then(res => {
        dispatch({
          type: 'SET_ACTIVE_APP',
          payload: {
            inEditMode: 'none',
            isLoaded: true,
            data: res.data
          }
        })
      })
      .catch(err => {
        dispatch({
          type: 'SET_CHANGING',
          payload: {
            inEditMode: 'none',
            isLoaded: true
          }
        })
      })
  }
}

export const changeActiveAppWithFile = (id, field, data) => {
  let headers = {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: 'SET_CHANGING',
      payload: {
        inEditMode: field,
        isLoaded: true
      }
    })
    axios
      .patch(urlAppDetail(id), data, { headers: headers })
      .then(res => {
        dispatch({
          type: 'SET_ACTIVE_APP',
          payload: {
            inEditMode: 'none',
            isLoaded: true,
            data: res.data
          }
        })
      })
      .catch(err => {
        dispatch({
          type: 'SET_CHANGING',
          payload: {
            inEditMode: 'none',
            isLoaded: true
          }
        })
      })
  }
}

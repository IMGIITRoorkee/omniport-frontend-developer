import axios from 'axios'
import { toast } from 'react-semantic-toasts'

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
      .catch(() => {
        toast({
          type: 'error',
          title: 'Error',
          description: 'Some error occured while setting up the options list',
          animation: 'fade up',
          icon: 'frown up',
          time: 3000
        })
      })
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
      .catch(() => {
        toast({
          type: 'error',
          title: 'Error',
          description: 'Some error occured while fetching the apps',
          animation: 'fade up',
          icon: 'frown up',
          time: 3000
        })
      })
  }
}

export const addApp = (data, successCallback, errCallback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .post(urlAppList(), data, { headers: headers })
      .then(res => {
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}

export const setActiveApp = (id, errCallback) => {
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
      .catch(err => {
        errCallback(err)
      })
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

export const changeActiveApp = (
  id,
  field,
  data,
  successCallback,
  errCallback
) => {
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
        successCallback(res)
      })
      .catch(err => {
        dispatch({
          type: 'SET_CHANGING',
          payload: {
            inEditMode: 'none',
            isLoaded: true
          }
        })
        errCallback(err)
      })
  }
}

export const changeActiveAppWithFile = (
  id,
  field,
  data,
  successCallback,
  errCallback
) => {
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
        successCallback(res)
      })
      .catch(err => {
        dispatch({
          type: 'SET_CHANGING',
          payload: {
            inEditMode: 'none',
            isLoaded: true
          }
        })
        errCallback(err)
      })
  }
}

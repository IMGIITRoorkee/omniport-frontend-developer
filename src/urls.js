import appConfig from '../config.json'

// Frontend URLs
export function urlBase () {
  return `${appConfig.baseUrl}`
}

export function urlAppView (id) {
  return `${urlBase()}/${id}`
}

export function urlAddAppView () {
  return `${urlBase()}/add`
}

// Backend URLs
export function urlAppList () {
  return `/api/developer/application/`
}

export function urlAppDetail (id) {
  return `${urlAppList()}${id}/`
}

export function urlSearchPerson () {
  return `/api/yellow_pages/person/`
}

export function urlAppList () {
  return `/api/developer/application/`
}

export function urlAppDetail (id) {
  return `${urlAppList()}${id}/`
}

export function urlSearchPerson () {
  return `/api/yellow_pages/person/`
}

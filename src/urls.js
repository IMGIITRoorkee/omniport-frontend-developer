export function urlAppList () {
  return `/open_auth/application/`
}

export function urlAppDetail (id) {
  return `${urlAppList()}${id}/`
}

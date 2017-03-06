import { Cookies, Location, QueryString } from './WebEnvironment'
declare global {
  const require: any
}
const URL: any = require('url-parse')

export function parseCookieString (cookie: string): Cookies {
  if (cookie === '') {
    return {}
  }

  return cookie
    .split(';')
    .map((cookie) => cookie.split('='))
    .map(([name, values]) => [name.trim(), values && values.trim() || ''])
    .reduce((cookies, [name, values]) => ({
      ...cookies,
      [name as string]: values
    }), {})
}

export function parseLocation (url: string): Location {
  const {href, protocol, username, password, hostname, port, host, origin, pathname, search, query, hash}
    = new URL(url, true)
  return {href, protocol, username, password, hostname, port, host, origin, pathname, search, query, hash}
}

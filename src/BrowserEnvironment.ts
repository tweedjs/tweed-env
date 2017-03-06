import { WebEnvironment, Cookies, Location } from './WebEnvironment'
import { parseCookieString, parseLocation } from './utils'

export class BrowserEnvironment implements WebEnvironment {
  readonly global: any
  readonly userAgent: string | undefined
  readonly cookies: Cookies
  readonly location: Location

  constructor (window: Window, document: Document) {
    this.global = window
    this.userAgent = window.navigator.userAgent
    this.cookies = parseCookieString(document.cookie)
    this.location = parseLocation(window.location.href)
  }

  static make () {
    return new BrowserEnvironment(window, document)
  }
}

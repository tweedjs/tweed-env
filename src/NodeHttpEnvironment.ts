import { WebEnvironment, Cookies, Location } from './WebEnvironment'
import { NodeEnvironment } from './NodeEnvironment'
import { parseCookieString, parseLocation } from './utils'

export interface Request {
  headers: any
  url: string
}

export class NodeHttpEnvironment extends NodeEnvironment implements WebEnvironment {
  readonly userAgent: string | undefined
  readonly cookies: Cookies
  readonly location: Location

  constructor (request: Request, origin?: string) {
    super()
    this.userAgent = request.headers['user-agent']
    this.cookies = parseCookieString(request.headers['cookie'] || '')
    const host: string | undefined = request.headers['host']
    this.location = parseLocation((origin || request.headers['origin'] || host ? 'http://' + host : '') + request.url)
  }

  static make (request: Request, origin?: string) {
    return new NodeHttpEnvironment(request, origin)
  }
}

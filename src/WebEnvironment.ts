import { Environment } from './Environment'

export type Cookies = {
  [name: string]: string
}

export type QueryString = {
  [key: string]: string
}

export interface Location {
  href: string
  protocol: string
  username: string
  password: string
  hostname: string
  port: string
  host: string
  origin: string
  pathname: string
  search: string
  query: QueryString
  hash: string
}

export interface WebEnvironment extends Environment {
  readonly userAgent: string | undefined
  readonly cookies: Cookies
  readonly location: Location
}

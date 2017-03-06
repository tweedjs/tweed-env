import { Environment } from './Environment'

declare global {
  const global: any
}

export class NodeEnvironment implements Environment {
  readonly global = global

  static make () {
    return new NodeEnvironment()
  }
}

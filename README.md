# tweed-env

Simple abstraction to turn different JavaScript environments into strategies, with the
purpose of being used in universal UI apps.

Let's say you have a Tweed component:

```typescript
class YourURL {
  render () {
    return (
      <p>Your URL is {window.location.href}</p>
    )
  }
}
```

You have now coupled this component to a browser environment, because in an environment
like Node `window` doesn't exist.

Instead, this package gives you a `WebEnvironment` interface in TypeScript, so that you
can turn your code into this:

```typescript
import { WebEnvironment } from 'tweed-env'

class YourURL {
  constructor (
    private readonly _environment: WebEnvironment
  ) {}

  render () {
    return (
      <p>Your URL is {this._environment.location.href}</p>
    )
  }
}
```

Then, in your browser entry file, you can use the `BrowserEnvironment`:

```typescript
import { BrowserEnvironment } from 'tweed-env'

new YourURL(BrowserEnvironment.make())
```

And on the server, you can use the `NodeHttpEnvironment`, which requires an HTTP request
to create the environment for a single request.

```typescript
import { NodeHttpEnvironment } from 'tweed-env'

export default function (req, res) {
  new YourURL(NodeHttpEnvironment.make(req))
  ...
}
```

Among other things, the `NodeHttpEnvironment` will create a `Location` object from the
`url` property of the request. It will try to use the `Origin` or `Host` headers to fill
in the missing part of the HREF. However, headers are easy to fake, so you have the option
to explicitly say what the origin of the request should be:

```typescript
NodeHttpEnvironment.make(req, 'https://domain.example.com:8080')
```

---

If you're not necessarily within an HTTP environment, you can use the `Environment` base
type, which at the moment just gives you a reference to the global object (`window` in the
browser and `global` in Node).

# Umpteenth

Umpteenth is a cookie-free, PII-sensitive, and ultra-lightweight JavaScript telemetry bundle (~ 1.4kb unzipped as of now).

## Setup

1. `npm install`
2. `npm run prepare` # activate pre-commit hooks

## Lint and Format

```bash
npm run format
npm run lint # or npm run lint:fix to attempt automatic fixing
```

## Run in Development

Run the following:

```
npm run dev
```

Your script is now available at `localhost:3006`, e.g.:

```
http://localhost:3006/v2/umpteenth.0.1.0.js
```

Note: Each time a source file is saved, Vite `--watch` mode will re-build on the fly. This isn't quite the same as HMR, but a close second — you'll need to refresh whatever page you're loading the script in.

## Usage

The bundle must be consumed by an async loader script that defines a `window.UmpteenthConfig` object. This object should include a `url` property (required, represents the telemetry endpoint tracking data will be sent to) and a `meta` property (optional, a JavaScript object containing any additional information the browser should pass to the telemetry endpoint).

Here's an example:

```html
<script type="text/javascript" async>
    (function () {
        window.Umpteenth.setConfig({
            url: 'https://api.mysite.com/track',
            meta: {
                version: '0.1.0',
                origin: window.location.origin,
            },
        });
    })();

    var s = document.createElement('script');
    s.src = 'https://cdn.mysite.com/umpteenth.0.1.0.js';
    s.async = true;
    s.type = 'text/javascript';

    s.onload = function () {
        // Do something on load
    };

    var entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(s, entry);
</script>
```

### Send events

You can explicitly send events using the `track` method:

```javascript
window.Umpteenth.track('myEvent', {
    // ... event data
});
```

You can also send events with no additional data:

```javascript
window.Umpteenth.track('load');
```

The data will be merged with the environment and defined configuration metadata.

## Build

```bash
npm run build
```

## Run tests

Run tests with the following command:

```bash
npm run test
```

### Run CI tests

Build and test bundle size with the following command:

```bash
npm run test:ci
```

## Build, Release, and Deploy

**Note: The release script mentioned in this section is still @todo**

This process can be done with the `scripts/release.ts` script. This script does the following:

1. Builds the versioned bundle
2. Pushes a git version tag
3. Uploads the bundle to S3

E.g. usage:

```bash
npm run release -- --release 2.0.1 --bucket my-bucket
```

To see list of script options, run:

```bash
npm run release -- --help
```

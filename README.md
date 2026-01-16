# Umpteenth

Umpteenth is a cookie-free, PII-sensitive, and ultra-lightweight JavaScript telemetry bundle (~ 1.04kb unzipped).

## Setup

1. `npm install`
2. `npm run prepare` # activate pre-commit hooks

## Lint and Format

```bash
npm run format
npm run lint # or npm run lint:fix to attempt automatic fixing
```

## Run in Development

Run the following commands:

```bash
npm run dev:headless
```

Your script is now available at `localhost:3006`, e.g.:

```
http://localhost:3006/umpteenth.0.1.0.js
```

Note: Each time a source file is saved, Vite `--watch` mode will re-build on the fly. This isn't quite the same as HMR, but a close second — you'll need to refresh whatever page you're loading the script in.

If you run `npm run dev`, a minimal HTML sandbox page is served at localhost:3000 that loads the script.

## Usage

Before loading the bundle, define a window.umpeenthOnLoad callback. The bundle will invoke this function once it has loaded, giving you a chance to initialize Umpteenth.

Inside the callback, call Umpteenth.init() with a configuration object:

- url (required) — The telemetry endpoint that events and errors will be sent to.
- meta (optional) — An object containing additional metadata to include with every event.

### Example

```html
<script>
    // Configure umpteenthOnLoad before loading the script
    window.umpeenthOnLoad = function () {
        Umpteenth.init({
            url: 'https://api.mysite.com/capture',
            meta: {
                version: '0.1.0',
                origin: window.location.origin,
            },
        });

        // Fire away!
        Umpteenth.capture('load');
        Umpteenth.captureError(new Error('Test error'), {
            detail: 'This is a test error for Umpteenth.',
        });
        Umpteenth.capture('page_view', { page: '/test-page' });
    };
</script>
<script src="http://localhost:3006/umpteenth.0.1.0.js"></script>
```

### Send events

You can explicitly send events using the `capture` method:

```javascript
window.Umpteenth.capture('myEvent', {
    // ... event data
});
```

Event data is optional:

```javascript
window.Umpteenth.capture('load');
```

The data will be merged with the environment and defined configuration metadata.

You can also easily send error information using the `captureError` function:

```javascript
Umpteenth.captureError(new Error('Test error'), {
    detail: 'This is additional context!',
});
```

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
npm run release -- --release 0.1.0 --bucket my-bucket
```

To see list of script options, run:

```bash
npm run release -- --help
```

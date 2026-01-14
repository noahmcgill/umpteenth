import fs from 'fs';
import { it, expect, } from 'vitest';
import { BUILD_VERSION } from '../../version';

it('telemetry bundle stays under 5kb', () => {
    const size = fs.statSync(`dist/bundle.${BUILD_VERSION}.js`).size;
    expect(size).toBeLessThan(5 * 1024);
});

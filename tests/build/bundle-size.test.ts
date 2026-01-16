import fs from 'fs';
import { it, expect, } from 'vitest';
import { BUILD_VERSION } from '../../version';

it('telemetry bundle stays under 1.5kb', () => {
    const size = fs.statSync(`dist/umpteenth.${BUILD_VERSION}.js`).size;
    expect(size).toBeLessThanOrEqual(1.5 * 1024);
});

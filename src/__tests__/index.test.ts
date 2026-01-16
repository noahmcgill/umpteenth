import { describe, it, expect, vi } from 'vitest';
import * as trackModule from '../utils/telemetry';
import '../index';

describe('global error handlers', () => {
    it('tracks window errors', () => {
        const spy = vi
            .spyOn(trackModule, 'capture')
            .mockImplementation(() => {});

        window.dispatchEvent(
            new ErrorEvent('error', {
                message: 'boom',
                filename: 'widget.js',
                lineno: 10,
                colno: 2,
            })
        );

        expect(spy).toHaveBeenCalledWith(
            'err',
            expect.objectContaining({ msg: 'boom' })
        );
    });

    it('tracks unhandled rejections', () => {
        const spy = vi
            .spyOn(trackModule, 'capture')
            .mockImplementation(() => {});

        const err = new Error('nope');
        const promise = Promise.reject(err);
        promise.catch(() => {});

        window.dispatchEvent(
            new PromiseRejectionEvent('unhandledrejection', {
                promise,
                reason: err,
            })
        );

        expect(spy).toHaveBeenCalledWith(
            'rej',
            expect.objectContaining({ msg: expect.stringContaining('Error') })
        );
    });
});

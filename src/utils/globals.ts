import type { UmpteenthConfigOpts } from '@/types';

export function getConfig() {
    return window.Umpteenth.config ?? {};
}

export function setConfig(opts: UmpteenthConfigOpts = {}) {
    const merged: UmpteenthConfigOpts = {
        errorScope: 'script',
        scriptMatch: /umpteenth(\.\d+)*\.js/,
        ...opts,
    };

    const scriptMatch =
        typeof merged.scriptMatch === 'string'
            ? new RegExp(merged.scriptMatch)
            : merged.scriptMatch;

    window.Umpteenth.config = {
        ...merged,
        scriptMatch,
    };
}

export function getNavigator() {
    return navigator;
}

export function getWindow() {
    return window;
}

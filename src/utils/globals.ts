import type { UmpteenthConfig } from '@/types';

export function getConfig() {
    return window.Umpteenth.config ?? {};
}

export function init(config: UmpteenthConfig = {}) {
    window.Umpteenth.config = config;
}

export function getNavigator() {
    return navigator;
}

export function getWindow() {
    return window;
}

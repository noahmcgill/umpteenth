import type { UnknownObject } from '@shared/types';

export function getConfig() {
    return window.Umpteenth.config;
}

export function setConfig(config?: UnknownObject) {
    window.Umpteenth.config = config;
}

export function getNavigator() {
    return navigator;
}

export function getWindow() {
    return window;
}

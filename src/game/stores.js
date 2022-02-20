import {readable, writable} from 'svelte/store';

export const correctWord = readable("BLAME");
export const currentRow = writable(0);
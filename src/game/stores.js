import {readable, writable} from 'svelte/store';
import { getWordOfTheDay, allWords } from '../words';

const wordOfTheDay = getWordOfTheDay();

export const correctWord = readable(wordOfTheDay);
export const currentRow = writable(0);
export const validGuesses = readable(allWords);
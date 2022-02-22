import {readable, writable} from 'svelte/store';
import { getWordOfTheDay, allWords } from '../words';

const wordOfTheDay = getWordOfTheDay();
console.log(`THE WORD IS ${wordOfTheDay}`);

export const correctWord = readable(wordOfTheDay);
export const currentRow = writable(0);
export const validGuesses = readable(allWords);
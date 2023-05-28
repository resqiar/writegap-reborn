import { writable } from 'svelte/store';
import type UserProfile from '../types/UserProfile';

export const UserProfileStore = writable<UserProfile | null>(null);

// recoilAtoms.js
import { atom } from 'recoil';

export const tokenState = atom({
    key: 'tokenState',
    default: localStorage.getItem("token") || null,
});

export const userState = atom({
    key: 'userState',
    default: localStorage.getItem("user") || null,
});

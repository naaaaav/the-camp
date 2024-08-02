import { atom } from 'recoil';

export const roleAtom = atom({
  key: 'roleAtom',
  default: "ROLE_GUEST",
});

export const rolePathAtom = atom({
  key: 'rolePathAtom',
  default: '/',
});
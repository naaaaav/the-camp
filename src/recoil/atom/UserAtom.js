import { atom } from 'recoil';

export const roleAtom = atom({
  key: 'roleAtom',
  default: "ROLE_GUEST",
});

export const rolePathAtom = atom({
  key: 'rolePathAtom',
  default: '/',
});

export const reviewFlagAtom = atom({
  key: 'reviewFlagAtom',
  default: false,
});

export const likeFlagAtom = atom({
  key: 'likeFlagAtom',
  default: false,
});


export const cancelFlagAtom = atom({
  key: 'cancelFlagAtom',
  default: false,
});
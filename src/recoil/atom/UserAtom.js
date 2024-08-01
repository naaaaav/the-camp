import React from 'react';
import { atom, selector, useRecoilState } from 'recoil';

export const roleAtom = atom({
  key: 'roleAtom',
  default: "ROLE_GUEST",
});

export const roleFlagAtom = atom({
  key: 'roleFlagAtom',
  default: false,
});
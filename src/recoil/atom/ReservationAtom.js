import { atom } from 'recoil';

export const adultsState = atom({
    key: 'adultsState',
    default: 2,
});

export const childrenState = atom({
    key: 'childrenState',
    default: 2,
});

export const startDateState = atom({
    key: 'startDateState',
    default: null,
});

export const endDateState = atom({
    key: 'endDateState',
    default: null,
});

export const daysState = atom({
    key: 'daysState',
    default: null,
});

export const datesSelectedState = atom({
    key: 'datesSelectedState',
    default: false,
});

export const sitesState = atom({
    key: 'sitesState',
    default: [],
});

export const zoneState = atom({
    key: 'zoneState',
    default: null,
});

export const selectedSiteState = atom({
    key: 'selectedSiteState',
    default: null,
});
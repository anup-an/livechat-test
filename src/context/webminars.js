import { createContext } from 'react';

const initialState = {
    selectedWebminars: [],
    sendWebminars: [],
    displaySelected: [],
    searchInput: '',
    keyWords: null,
    display: false,
    select: { id: '', isColored: false },
    showDropDown: () => {},
    resetSelection: () => {},
    selectWebminar: () => {},
    deleteWebminar: () => {},
    searchWebminars: () => {},
    slideLeft: () => {},
    slideRight: () => {},
    sortByPrice: (sort) => {},
    sortByTitle: (sort) => {},
    sortByDate: (sort) => {},
    colorOnSelect: (webminar) => {},
};

const WebminarContext = createContext(initialState);

export default WebminarContext;

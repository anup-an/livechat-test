import { createContext } from 'react';

const initialState = {
    selectedWebminars: [],
    sendWebminars: [],
    displaySelected: [],
    searchInput: '',
    keyWords: null,
    selectWebminar: () => {},
    deleteWebminar: () => {},
    searchWebminars: () => {},
    slideLeft: () => {},
    slideRight: () => {},
    sortByPrice: (sort) => {},
    sortByTitle: (sort) => {},
    sortByDate: (sort) => {},
};

const WebminarContext = createContext(initialState);

export default WebminarContext;

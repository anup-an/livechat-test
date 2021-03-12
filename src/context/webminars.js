import { createContext } from 'react';

const initialState = {
    selectedWebminars: [],
    sendWebminars: [],
    displaySelected: [],
    searchInput: '',
    keyWords: null,
    select: { id: '', isColored: false },
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

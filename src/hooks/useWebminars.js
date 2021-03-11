/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const getAllWebminars = () => {
    const list = localStorage.getItem('webminarList');
    return JSON.parse(list);
};

const getAllServices = () => {
    const list = localStorage.getItem('servicesList');
    return JSON.parse(list);
};

const useWebminars = (window) => {
    const [selectedWebminars, setSelectedWebminars] = useState([]);
    const [sendWebminars, setSendWebminars] = useState([]);

    useEffect(() => {
        if (window === 'webinars') {
            setSelectedWebminars(getAllWebminars());
            setSendWebminars(getAllWebminars().filter((e) => e.isSelected === true));
        } else if (window === 'services') {
            setSelectedWebminars(getAllServices());
            setSendWebminars(getAllServices().filter((e) => e.isSelected === true));
            console.log(selectedWebminars);
        }
    }, [window]);

    const [displaySelected, setDisplaySelected] = useState([]);
    const searchInput = useRef(null);
    const [keyWords, setKeyWords] = useState('');

    // select webminar
    const selectWebminar = (webminar, webminarId) => {
        const foundWebminar = selectedWebminars.find((e) => e.id === webminarId && e.isSelected === true);
        if (!foundWebminar) {
            const x = selectedWebminars.map((e) => (e.id === webminarId ? { ...e, isSelected: true } : { ...e }));
            setSelectedWebminars(x);
            setSendWebminars([...sendWebminars, webminar]);
            if (window === 'webinars') {
                localStorage.setItem('webminarList', JSON.stringify(x));
            } else if (window === 'services') {
                localStorage.setItem('servicesList', JSON.stringify(x));
            }
        }
    };

    // delete webminar
    const deleteWebminar = (webminarId) => {
        const x = selectedWebminars.map((e) => (e.id === webminarId ? { ...e, isSelected: false } : { ...e }));
        setSelectedWebminars(x);
        setSendWebminars([...sendWebminars.filter((webminar) => webminar.id !== webminarId)]);
        if (window === 'webinars') {
            localStorage.setItem('webminarList', JSON.stringify(x));
        } else if (window === 'services') {
            localStorage.setItem('servicesList', JSON.stringify(x));
        }
    };

    useEffect(() => {
        const x = [...sendWebminars];
        setDisplaySelected(x.filter((e, index) => index >= sendWebminars.length - 4));
    }, [sendWebminars]);

    const slideLeft = () => {
        if (sendWebminars.length > 4) {
            const x = [...sendWebminars];
            const indx = x.map((e) => e.id).indexOf(displaySelected[0].id);
            if (indx < x.length - 4) {
                const y = x.filter((e, index) => index >= indx + 1 && index < indx + 5);
                setDisplaySelected(y);
            }
        }
    };

    const slideRight = () => {
        if (sendWebminars.length > 4) {
            const x = [...sendWebminars];
            const indx = x.map((e) => e.id).indexOf(displaySelected[0].id);
            if (indx > 0) {
                const y = x.filter((e, index) => index >= indx - 1 && index < indx + 3);
                setDisplaySelected(y);
            }
        }
    };

    const sortByPrice = (sort) => {
        if (sort === 'low') {
            if (window === 'webinars') {
                const sortWebminars = selectedWebminars.sort((a, b) => (a.price > b.price ? 1 : -1));
                console.log(sortWebminars.map((e) => e.price));
                localStorage.setItem('webminarList', JSON.stringify(sortWebminars));

                setSelectedWebminars(sortWebminars);
            } else if (window === 'services') {
                const sortWebminars = selectedWebminars.sort((a, b) => (a.onlinePrice > b.onlinePrice ? 1 : -1));
                console.log(sortWebminars.map((e) => e.onlinePrice));
                localStorage.setItem('servicesList', JSON.stringify(sortWebminars));

                setSelectedWebminars(sortWebminars);
            }
        } else if (sort === 'high') {
            if (window === 'webinars') {
                const sortWebminars = selectedWebminars.sort((a, b) => (a.price < b.price ? 1 : -1));
                console.log(sortWebminars.map((e) => e.price));
                localStorage.setItem('webminarList', JSON.stringify(sortWebminars));

                setSelectedWebminars(sortWebminars);
            } else if (window === 'services') {
                const sortWebminars = selectedWebminars.sort((a, b) => (a.onlinePrice < b.onlinePrice ? 1 : -1));
                console.log(sortWebminars.map((e) => e.onlinePrice));
                localStorage.setItem('servicesList', JSON.stringify(sortWebminars));

                setSelectedWebminars(sortWebminars);
            }
        }
    };

    const sortByDate = (sort) => {
        if (sort === 'oldest') {
            const sortWebminars = selectedWebminars.sort((a, b) =>
                a.startDate.replace(/[^\d]/g, '') > b.startDate.replace(/[^\d]/g, '') ? 1 : -1,
            );
            console.log(sortWebminars.map((e) => e.startDate));
            setSelectedWebminars(sortWebminars);
            localStorage.setItem('webminarList', JSON.stringify(sortWebminars));
        } else if (sort === 'latest') {
            const sortWebminars = selectedWebminars.sort((a, b) =>
                a.startDate.replace(/[^\d]/g, '') < b.startDate.replace(/[^\d]/g, '') ? 1 : -1,
            );
            console.log(sortWebminars.map((e) => e.startDate));
            setSelectedWebminars(sortWebminars);
            localStorage.setItem('webminarList', JSON.stringify(sortWebminars));
        }
    };

    const sortByTitle = (sort) => {
        if (sort === 'atoz') {
            if (window === 'webinars') {
                const sortWebminars = selectedWebminars.sort((a, b) =>
                    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
                );
                console.log(sortWebminars.map((e) => e.title));
                setSelectedWebminars(sortWebminars);
                localStorage.setItem('webminarList', JSON.stringify(sortWebminars));
            } else if (window === 'services') {
                const sortWebminars = selectedWebminars.sort((a, b) =>
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
                );
                console.log(sortWebminars.map((e) => e.name));
                setSelectedWebminars(sortWebminars);
                localStorage.setItem('servicesList', JSON.stringify(sortWebminars));
            }
        } else if (sort === 'ztoa') {
            if (window === 'webinars') {
                const sortWebminars = selectedWebminars.sort((a, b) =>
                    a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1,
                );
                console.log(sortWebminars.map((e) => e.title));
                setSelectedWebminars(sortWebminars);
                localStorage.setItem('webminarList', JSON.stringify(sortWebminars));
            } else if (window === 'services') {
                const sortWebminars = selectedWebminars.sort((a, b) =>
                    a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1,
                );
                console.log(sortWebminars.map((e) => e.name));
                setSelectedWebminars(sortWebminars);
                localStorage.setItem('servicesList', JSON.stringify(sortWebminars));
            }
        }
    };

    const searchWebminars = (event) => {
        event.preventDefault();
        setKeyWords(searchInput.current.value);
    };

    useEffect(() => {
        console.log(window);
        axios
            .get(`https://api-test.meeteo.io/thirdParty/v1/list_${window}?app_id=678901&search=${keyWords}`)
            .then((response) => {
                console.log(response);
                const ids = response.data.data.data.map((e) => e.id);
                const displayWebminars = selectedWebminars.map((webminar) =>
                    webminar.id === ids.find((e) => e === webminar.id)
                        ? { ...webminar, isDisplayed: true }
                        : { ...webminar, isDisplayed: false },
                );
                if (window === 'webinars') {
                    localStorage.setItem('webminarList', JSON.stringify(displayWebminars));
                    setSelectedWebminars(() => displayWebminars);
                } else if (window === 'services') {
                    localStorage.setItem('servicesList', JSON.stringify(displayWebminars));
                    setSelectedWebminars(() => displayWebminars);
                }
            })
            .catch((error) => console.log(error));
    }, [keyWords]);

    return {
        selectedWebminars,
        sendWebminars,
        displaySelected,
        searchInput,
        keyWords,
        selectWebminar,
        deleteWebminar,
        searchWebminars,
        slideLeft,
        slideRight,
        sortByPrice,
        sortByTitle,
        sortByDate,
    };
};

export default useWebminars;

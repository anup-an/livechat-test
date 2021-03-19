/* eslint-disable no-unused-expressions */
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

const getAllConsultants = () => {
    const list = localStorage.getItem('consultantsList');
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
        } else if (window === 'consultants') {
            setSelectedWebminars(getAllConsultants());
            setSendWebminars(getAllConsultants().filter((e) => e.isSelected === true));
        }
    }, [window]);

    const [display, setDisplay] = useState(false);
    const [displaySelected, setDisplaySelected] = useState([]);
    const searchInput = useRef(null);
    const [keyWords, setKeyWords] = useState({ webinars: '', services: '', consultants: '' });
    const [select, setSelect] = useState({ id: '', isColored: false });

    const showDropDown = () => {
        display ? setDisplay(false) : setDisplay(true);
    };

    const colorOnSelect = (webminar) => {
        setSelect({ id: webminar.id, isColored: true });
    };
    const resetSelection = () => {
        setSendWebminars([]);
        const x = selectedWebminars.map((e) => ({ ...e, isSelected: false }));
        setSelectedWebminars(x);
        setSelect({ id: '', isColored: false });
    };

    // select webminar
    const selectWebminar = (webminar, webminarId) => {
        const foundWebminar = selectedWebminars.find((e) => e.id === webminarId && e.isSelected === true);
        console.log(webminar.id, webminarId);
        if (!foundWebminar) {
            const x = selectedWebminars.map((e) => (e.id === webminarId ? { ...e, isSelected: true } : { ...e }));
            setSelectedWebminars(x);
            setSendWebminars([...sendWebminars, webminar]);
            if (window === 'webinars') {
                localStorage.setItem('webminarList', JSON.stringify(x));
            } else if (window === 'services') {
                localStorage.setItem('servicesList', JSON.stringify(x));
            } else if (window === 'consultants') {
                localStorage.setItem('consultantsList', JSON.stringify(x));
            }
        }
        const index1 = selectedWebminars.indexOf(foundWebminar);
        const webminars = [...selectedWebminars];
        webminars ? (webminars[index1].isSelected = false) : '';
        setSelectedWebminars(webminars);
        setSendWebminars([...sendWebminars].filter((e) => e.id !== webminarId));
        setSelect({ id: webminar.id, isColored: false });

        if (window === 'webinars') {
            localStorage.setItem('webminarList', JSON.stringify(webminars));
        } else if (window === 'services') {
            localStorage.setItem('servicesList', JSON.stringify(webminars));
        } else if (window === 'consultants') {
            localStorage.setItem('consultantsList', JSON.stringify(webminars));
        }
    };

    // delete webminar
    const deleteWebminar = (webminarId) => {
        const x = selectedWebminars.map((e) => (e.id === webminarId ? { ...e, isSelected: false } : { ...e }));
        setSelectedWebminars(x);
        setSendWebminars([...sendWebminars.filter((webminar) => webminar.id !== webminarId)]);
        setSelect({ id: webminarId, isColored: false });
        if (window === 'webinars') {
            localStorage.setItem('webminarList', JSON.stringify(x));
        } else if (window === 'services') {
            localStorage.setItem('servicesList', JSON.stringify(x));
        } else if (window === 'consultants') {
            localStorage.setItem('consultantsList', JSON.stringify(x));
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
                const sortWebminars = [...selectedWebminars].sort((a, b) => (a.price > b.price ? 1 : -1));
                console.log(sortWebminars.map((e) => e.price));
                localStorage.setItem('webminarList', JSON.stringify(sortWebminars));

                setSelectedWebminars(() => sortWebminars);
            } else if (window === 'services') {
                const sortWebminars = [...selectedWebminars].sort((a, b) => (a.onlinePrice > b.onlinePrice ? 1 : -1));
                console.log(sortWebminars.map((e) => e.onlinePrice));
                localStorage.setItem('servicesList', JSON.stringify(sortWebminars));

                setSelectedWebminars(() => sortWebminars);
            }
        } else if (sort === 'high') {
            if (window === 'webinars') {
                const sortWebminars = [...selectedWebminars].sort((a, b) => (a.price < b.price ? 1 : -1));
                console.log(sortWebminars.map((e) => e.price));
                localStorage.setItem('webminarList', JSON.stringify(sortWebminars));

                setSelectedWebminars(() => sortWebminars);
            } else if (window === 'services') {
                const sortWebminars = [...selectedWebminars].sort((a, b) => (a.onlinePrice < b.onlinePrice ? 1 : -1));
                console.log(sortWebminars.map((e) => e.onlinePrice));
                localStorage.setItem('servicesList', JSON.stringify(sortWebminars));

                setSelectedWebminars(() => sortWebminars);
            }
        }
    };

    const sortByDate = (sort) => {
        if (sort === 'oldest') {
            const sortWebminars = [...selectedWebminars].sort((a, b) =>
                a.startDate.replace(/[^\d]/g, '') > b.startDate.replace(/[^\d]/g, '') ? 1 : -1,
            );
            console.log(sortWebminars.map((e) => e.startDate));
            setSelectedWebminars(sortWebminars);
            localStorage.setItem('webminarList', JSON.stringify(sortWebminars));
        } else if (sort === 'latest') {
            const sortWebminars = [...selectedWebminars].sort((a, b) =>
                a.startDate.replace(/[^\d]/g, '') < b.startDate.replace(/[^\d]/g, '') ? 1 : -1,
            );
            console.log(sortWebminars.map((e) => e.startDate));
            setSelectedWebminars(() => sortWebminars);
            localStorage.setItem('webminarList', JSON.stringify(sortWebminars));
        }
    };

    const sortByTitle = (sort) => {
        if (sort === 'atoz') {
            if (window === 'webinars') {
                const sortWebminars = [...selectedWebminars].sort((a, b) =>
                    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
                );
                console.log(sortWebminars.map((e) => e.title));
                setSelectedWebminars(() => sortWebminars);
                localStorage.setItem('webminarList', JSON.stringify(sortWebminars));
            } else if (window === 'services') {
                const sortWebminars = [...selectedWebminars].sort((a, b) =>
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
                );
                console.log(sortWebminars.map((e) => e.name));
                setSelectedWebminars(() => sortWebminars);
                localStorage.setItem('servicesList', JSON.stringify(sortWebminars));
            }
        } else if (sort === 'ztoa') {
            if (window === 'webinars') {
                const sortWebminars = [...selectedWebminars].sort((a, b) =>
                    a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1,
                );
                console.log(sortWebminars.map((e) => e.title));
                setSelectedWebminars(() => sortWebminars);
                localStorage.setItem('webminarList', JSON.stringify(sortWebminars));
            } else if (window === 'services') {
                const sortWebminars = [...selectedWebminars].sort((a, b) =>
                    a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1,
                );
                console.log(sortWebminars.map((e) => e.name));
                setSelectedWebminars(() => sortWebminars);
                localStorage.setItem('servicesList', JSON.stringify(sortWebminars));
            }
        }
    };

    const searchWebminars = (event, window) => {
        event.preventDefault();
        setKeyWords({ ...keyWords, [window]: searchInput.current.value });
    };

    useEffect(() => {
        axios
            .get(`https://api-test.meeteo.io/thirdParty/v1/list_${window}?app_id=678901&search=${keyWords[window]}`)
            .then((response) => {
                console.log(response.data.data.data);
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
                } else if (window === 'consultants') {
                    localStorage.setItem('consultantsList', JSON.stringify(displayWebminars));
                    setSelectedWebminars(() => displayWebminars);
                }
            })
            .catch((error) => console.log(error));
    }, [keyWords]);
    useEffect(() => {
        setDisplay(false);
    }, [window]);

    return {
        selectedWebminars,
        sendWebminars,
        displaySelected,
        searchInput,
        keyWords,
        select,
        display,
        showDropDown,
        resetSelection,
        colorOnSelect,
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

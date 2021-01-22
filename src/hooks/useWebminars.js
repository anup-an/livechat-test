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
        if (window === 'webminars') {
            setSelectedWebminars(getAllWebminars());
            setSendWebminars(getAllWebminars().filter((e) => e.isSelected === true));
        } else if (window === 'services') {
            setSelectedWebminars(getAllServices());
            setSendWebminars(getAllServices().filter((e) => e.isSelected === true));
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
            if (window === 'webminars') {
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
        if (window === 'webminars') {
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

    const searchWebminars = (event) => {
        event.preventDefault();
        setKeyWords(searchInput.current.value);
    };

    useEffect(() => {
        axios
            .get(`https://api-test.meeteo.io/thirdParty/v1/list_${window}?app_id=123456&search=${keyWords}`)
            .then((response) => {
                console.log(response);
                const ids = response.data.data.data.map((e) => e.id);
                const displayWebminars = selectedWebminars.map((webminar) =>
                    webminar.id === ids.find((e) => e === webminar.id)
                        ? { ...webminar, isDisplayed: true }
                        : { ...webminar, isDisplayed: false },
                );
                setSelectedWebminars(() => displayWebminars);
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
    };
};

export default useWebminars;

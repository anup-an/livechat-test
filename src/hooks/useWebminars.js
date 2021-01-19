/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const getAllWebminars = () => {
    const list = localStorage.getItem('webminarList');
    return JSON.parse(list);
};

const useWebminars = () => {
    const [selectedWebminars, setSelectedWebminars] = useState(
        getAllWebminars().map((e) => ({ ...e, isSelected: false, isDisplayed: true })),
    );
    const [sendWebminars, setSendWebminars] = useState([]);
    const [displaySelected, setDisplaySelected] = useState([]);
    const searchInput = useRef(null);
    const [keyWords, setKeyWords] = useState('');

    // select webminar
    const selectWebminar = (webminar, webminarId) => {
        const foundService = selectedWebminars.find((e) => e.id === webminarId && e.isSelected === true);
        if (foundService) {
            setSelectedWebminars([...selectedWebminars]);
            setSendWebminars([...sendWebminars]);
        } else if (!foundService) {
            const x = selectedWebminars.map((e) => (e.id === webminarId ? { ...e, isSelected: true } : { ...e }));
            setSelectedWebminars(x);
            setSendWebminars([...sendWebminars, webminar]);
        }
    };

    // delete webminar
    const deleteWebminar = (webminarId) => {
        console.log(webminarId);
        const x = selectedWebminars.map((e) => (e.id === webminarId ? { ...e, isSelected: false } : { ...e }));
        setSelectedWebminars(x);
        setSendWebminars([...sendWebminars.filter((webminar) => webminar.id !== webminarId)]);
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
            .get(`https://api-test.meeteo.io/thirdParty/v1/list_webinars?app_id=123456&search=${keyWords}`)
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

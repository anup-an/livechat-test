/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import WebminarDisplay from '../webminars/WebminarDisplay';
import { sendSelectedWebminars } from '../../utils/config';
import axios from 'axios';
import WebminarToSend from './WebminarsToSend';

const WebminarSearch = ({ webminarList, closeModal, accessToken, chatId }) => {
    const [selectedWebminars, setSelectedWebminars] = useState(
        webminarList.map((e) => ({ ...e, isSelected: false, isDisplayed: true })),
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
                setSelectedWebminars(displayWebminars);
            })
            .catch((error) => console.log(error));
    }, [keyWords]);

    return (
        <div>
            <header className="fixed top-0 right-0 left-0 w-full z-10 border shadow flex flex-col space-y-4 bg-white flex content-center">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-end">
                        <button onClick={closeModal} type="button">
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="text-left mx-10 flex flex-row justify-between">
                        <div>Webminars</div>
                        <div>
                            <button
                                type="button"
                                className="focus:outline-none text-gray-500 hover:text-blue-800 transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="relative mx-10">
                        <form onSubmit={searchWebminars}>
                            <label htmlFor="search" className="flex flex-row items-center">
                                <button
                                    onClick={searchWebminars}
                                    className="absolute text-gray-500 focus:outline-none hover:text-white hover:text-blue-800 px-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                                <input
                                    className="px-10 py-2 border rounded w-full bg-gray-100 text-sm focus:outline-none"
                                    id="search"
                                    name="search"
                                    ref={searchInput}
                                    placeholder="Search webminars"
                                ></input>
                            </label>
                        </form>
                    </div>
                </div>
                <div className="text-center">Search results for '{keyWords}'</div>
            </header>

            <main className="p-8 mt-32">
                <div className="flex flex-col space-y-2 mt-4">
                    {selectedWebminars.map((webminar) =>
                        webminar.isDisplayed === true ? (
                            <div key={webminar.id}>
                                <div>
                                    <WebminarDisplay
                                        webminar={webminar}
                                        accessToken={accessToken}
                                        chatId={chatId}
                                        selectWebminar={selectWebminar}
                                    />
                                </div>
                                <div className="border bg-gray-500 mt-2 mb-4"></div>
                            </div>
                        ) : (
                            ''
                        ),
                    )}
                </div>
            </main>
            <footer className="fixed border shadow left-0 right-0 bottom-0 w-full h-24 bg-white flex flex-row justify-between items-center p-2">
                <button
                    type="button"
                    className={`border ${
                        sendWebminars.length > 4 ? 'visible' : 'invisible'
                    } rounded-full flex items-center justify-center bg-gray-200 hover:bg-blue-800 hover:text-white`}
                    onClick={slideLeft}
                >
                    <svg
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="grid grid-cols-4 sm:grid-cols-5 pb-2 gap-x-4 mb-4">
                    {displaySelected
                        ? displaySelected.map((webminar) => (
                              <WebminarToSend deleteWebminar={deleteWebminar} webminar={webminar} />
                          ))
                        : ''}
                </div>

                <button
                    type="button"
                    onClick={slideRight}
                    className={`border ${
                        sendWebminars.length > 4 ? 'visible' : 'invisible'
                    } rounded-full flex items-center justify-center bg-gray-200 hover:bg-blue-800 hover:text-white`}
                >
                    <svg
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <button
                    onClick={() => sendSelectedWebminars(sendWebminars, chatId, accessToken)}
                    type="button"
                    className="py-1 px-2 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                >
                    Send
                </button>
            </footer>
        </div>
    );
};

export default WebminarSearch;

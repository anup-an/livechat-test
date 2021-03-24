/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import WebminarDisplay from '../item_display/webminar';
import ServiceDisplay from '../item_display/service';
import ConsultantDisplay from '../item_display/consultant';

import WebminarFilter from '../webminars/WebminarFilter';

import { sendSelectedWebminars } from '../../utils/config';
import WebminarToSend from './WebminarsToSend';
import WebminarContext from '../../context/webminars';

const WebminarSearch = ({ closeModal, accessToken, chatId, window, openList }) => {
    const {
        selectedWebminars,
        sendWebminars,
        displaySelected,
        searchInput,
        keyWords,
        sortList,
        resetSelection,
        selectWebminar,
        deleteWebminar,
        searchWebminars,
        slideLeft,
        slideRight,
    } = useContext(WebminarContext);
    const [width, setWidth] = useState(false);

    const changeWidth = () => {
        setWidth(true);
    };

    return (
        <div className="h-screen">
            <header className="fixed h-1/5 top-0 right-0 left-0 w-full flex flex-col bg-gradient-to-r from-blue-400 to-blue-900 border-b rounded-lg shadow-lg">
                <div className="relative">
                    <span className="flex justify-end">
                        <button
                            className="border rounded shadow bg-white hover:bg-red-500"
                            onClick={closeModal}
                            type="button"
                        >
                            <svg
                                className="w-4 h-4 text-red-500 hover:text-white"
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
                    </span>
                    {sortList[window] !== '' ? (
                        <div className="flex justify-end mx-2 ">
                            <span className="absolute z-10 mt-2 flex flex-row justify-end space-x-1">
                                <button className="focus:outline-none">
                                    <span className="bg-white border rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-3 h-3 text-red-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </span>
                                </button>

                                <span className="p-1 border text-xs rounded shadow text-red-500 bg-white">
                                    Sort = '{sortList[window]}'
                                </span>
                            </span>
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="flex flex-row items-end justify-around mx-2 space-x-4">
                        <div className="border rounded text-center text-xs bg-gray-100 flex flex-col items-center text-white">
                            <button
                                className={`border-b ${
                                    window === 'webinars' ? 'text-white bg-blue-800' : 'text-gray-500'
                                } w-full p-1 focus:outline-none`}
                                onClick={() => {
                                    openList('webinars');
                                    document.getElementById('searchForm').reset();
                                }}
                            >
                                Webinars
                            </button>
                            <button
                                className={`border-b ${
                                    window === 'services' ? 'text-white bg-blue-800' : 'text-gray-500'
                                } w-full p-1 focus:outline-none`}
                                onClick={() => {
                                    openList('services');
                                    document.getElementById('searchForm').reset();
                                }}
                            >
                                Services
                            </button>
                            <button
                                className={` ${
                                    window === 'consultants' ? 'text-white bg-blue-800' : 'text-gray-500'
                                } w-full p-1 focus:outline-none`}
                                onClick={() => {
                                    openList('consultants');
                                    document.getElementById('searchForm').reset();
                                }}
                            >
                                Consultants
                            </button>
                        </div>
                        <form id="searchForm" onSubmit={searchWebminars}>
                            <label htmlFor="search" className="flex flex-row items-center ">
                                <button
                                    onClick={(event) => searchWebminars(event, window)}
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
                                    className={`px-10 border p-2 w-full rounded bg-gray-100 text-xs focus:outline-none`}
                                    id="search"
                                    name={window}
                                    ref={searchInput}
                                    placeholder="Search"
                                ></input>
                            </label>
                        </form>

                        <span>
                            <WebminarFilter window={window} />
                        </span>
                    </div>
                </div>
                {keyWords[window] ? (
                    <div className="flex flex-row space-x-1 items-center justify-center m-2">
                        <div className="flex flex-row space-x-1">
                            <span className="p-1 border text-xs rounded shadow text-red-500 truncate overflow-clip bg-white">
                                Search = '{keyWords[window]}'
                            </span>
                            <button className="focus:outline-none">
                                <span className="bg-white border rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-3 h-3 text-red-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </header>

            <main className="mt-32 mb-20">
                <div className="flex flex-col space-y-1 mt-4">
                    {selectedWebminars.map((webminar) =>
                        webminar.isDisplayed === true ? (
                            <div key={webminar.id}>
                                <div className="h-full">
                                    {window === 'webinars' ? (
                                        <WebminarDisplay
                                            webminar={webminar}
                                            accessToken={accessToken}
                                            chatId={chatId}
                                            selectWebminar={selectWebminar}
                                            window={window}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    {window === 'services' ? (
                                        <ServiceDisplay
                                            webminar={webminar}
                                            accessToken={accessToken}
                                            chatId={chatId}
                                            selectWebminar={selectWebminar}
                                            window={window}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    {window === 'consultants' ? (
                                        <ConsultantDisplay
                                            webminar={webminar}
                                            accessToken={accessToken}
                                            chatId={chatId}
                                            selectWebminar={selectWebminar}
                                            window={window}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="border bg-gray-500 mt-2 mb-4"></div>
                            </div>
                        ) : (
                            ''
                        ),
                    )}
                </div>
            </main>
            <footer className="fixed border-t rounded-lg shadow left-0 right-0 bottom-0 w-full h-24 bg-white flex flex-row justify-between items-center p-2">
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
                              <WebminarToSend deleteWebminar={deleteWebminar} webminar={webminar} window={window} />
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
                <div className="flex flex-col">
                    <button
                        onClick={resetSelection}
                        type="button"
                        className="p-1 bg-red-400 hover:bg-red-600 border rounded text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => sendSelectedWebminars(sendWebminars, chatId, accessToken)}
                        type="button"
                        className="py-1 px-1 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default WebminarSearch;

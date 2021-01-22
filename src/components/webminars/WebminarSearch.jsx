/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import WebminarDisplay from '../webminars/WebminarDisplay';
import { sendSelectedWebminars } from '../../utils/config';
import WebminarToSend from './WebminarsToSend';
import WebminarContext from '../../context/webminars';

const WebminarSearch = ({ closeModal, accessToken, chatId, window }) => {
    const {
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
    } = useContext(WebminarContext);

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
                        <div>{window.charAt(0).toUpperCase() + window.slice(1)}</div>
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
                                    placeholder={`${window === 'services' ? 'Search services' : ''}${
                                        window === 'webminars' ? 'Search webminars' : ''
                                    }`}
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
                                        window={window}
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

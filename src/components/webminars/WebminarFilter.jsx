import React, { useState, useContext } from 'react';
import WebminarContext from '../../context/webminars';

const WebminarFilter = ({ window }) => {
    const { sortByPrice, sortByTitle, sortByDate } = useContext(WebminarContext);

    const [display, setDisplay] = useState(false);

    const showDropDown = () => {
        display ? setDisplay(false) : setDisplay(true);
    };

    return (
        <div className="flex flex-col text-sm w-full">
            <div className="relative order rounded bg-gray-100 p-2 flex flex-row justify-between items-center space-x-4 w-full">
                <div className="text-gray-500">Sort</div>
                <button type="button" onClick={showDropDown} className="focus:outline-none">
                    <svg
                        className="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                    </svg>
                </button>
            </div>
            <div className={`absolute mt-10 right-4 bg-white border rounded shadow ${display ? 'block' : 'hidden'}`}>
                <div className="border-b flex flex-row p-2 space-x-2 items-center">
                    <div>Price</div>
                    <button
                        type="button"
                        onClick={() => sortByPrice('low')}
                        className="text-center border rounded shadow-lg p-1 bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
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
                                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => sortByPrice('high')}
                        className="text-center border rounded shadow-lg p-1 bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
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
                                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                            />
                        </svg>
                    </button>
                </div>

                {window === 'webinars' ? (
                    <div className="p-2 border-b flex flex-row space-x-2 items-center">
                        <div>Date</div>
                        <button
                            type="button"
                            onClick={() => sortByDate('oldest')}
                            className="text-center border rounded shadow-lg p-1 bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
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
                                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => sortByDate('latest')}
                            className="text-center border rounded shadow-lg p-1 bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
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
                                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                                />
                            </svg>
                        </button>
                    </div>
                ) : (
                    ''
                )}
                <div className="p-2 border-b flex flex-row space-x-2 items-center">
                    <div>Title</div>
                    <button
                        type="button"
                        onClick={() => sortByTitle('atoz')}
                        className="text-center border rounded shadow-lg p-1 bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
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
                                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => sortByTitle('ztoa')}
                        className="border shadow-lg rounded p-1 text-center bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
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
                                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WebminarFilter;

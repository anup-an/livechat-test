/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from 'react';
import WebminarContext from '../../context/webminars';

const WebminarFilter = ({ window }) => {
    const { sortByPrice, sortByTitle, sortByDate, display, showDropDown, sortList, setSortList } = useContext(
        WebminarContext,
    );
    const [menuDisplay, setMenuDisplay] = useState({ price: false, date: false, title: false });

    const showOptions = (menu) => {
        menu === 'price' ? setMenuDisplay({ ...menuDisplay, price: true, date: false, title: false }) : '';
        menu === 'date' ? setMenuDisplay({ ...menuDisplay, price: false, date: true, title: false }) : '';
        menu === 'title' ? setMenuDisplay({ ...menuDisplay, price: false, date: false, title: true }) : '';
    };

    const hideOptions = (menu) => {
        menu === 'price' ? setMenuDisplay({ ...menuDisplay, price: false }) : '';
        menu === 'date' ? setMenuDisplay({ ...menuDisplay, date: false }) : '';
        menu === 'title' ? setMenuDisplay({ ...menuDisplay, title: false }) : '';
    };

    console.log(menuDisplay);

    return (
        <div className="text-xs">
            <div className="relative border p-2 rounded bg-gray-100 flex flex-row justify-between items-center space-x-4">
                <div className="text-gray-500">
                    {sortList[window] ? (
                        <div className="flex justify-center">
                            <span className="flex flex-row justify-center space-x-1">
                                <span className="border text-xs rounded shadow text-red-500 bg-white">
                                    {sortList[window]}
                                </span>
                                <button
                                    className="focus:outline-none"
                                    onClick={() => setSortList({ ...sortList, [window]: '' })}
                                >
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
                            </span>
                        </div>
                    ) : (
                        'Sort'
                    )}{' '}
                </div>
                <button type="button" onClick={showDropDown} className="relative focus:outline-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
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
            <div className="absolute w-1/2 bg-white">
                <ul className="flex flex-col">
                    <li className="w-full">
                        <button className="bg-white p-2 right-0 border w-full">Price</button>
                        <ul>
                            <li className="bg-white p-2 border">Low - high</li>
                            <li className="bg-white p-2 border">High - low</li>
                        </ul>
                    </li>
                    <li className="w-full">
                        <button className="bg-white p-2 right-0 border w-full">Date</button>
                        <ul>
                            <li className="bg-white p-2 border">Old - new</li>
                            <li className="bg-white p-2 border">New - old</li>
                        </ul>
                    </li>
                    <li className="w-full">
                        <button className="bg-white p-2 right-0 border w-full">Title</button>
                        <ul>
                            <li className="bg-white p-2 border">A - Z</li>
                            <li className="bg-white p-2 border">Z - A</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WebminarFilter;

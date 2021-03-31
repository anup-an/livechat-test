/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from 'react';

import WebminarContext from '../../context/webminars';

const Header = ({ closeModal, window }) => {
    const {
        searchInput,
        keyWords,
        sortList,
        display,
        sortByPrice,
        sortByTitle,
        sortByDate,
        setSortList,
        showDropDown,
        searchWebminars,
    } = useContext(WebminarContext);
    const [menuDisplay, setMenuDisplay] = useState({ price: false, date: false, title: false });

    const showOptions = (menu) => {
        menu === 'price' && display ? setMenuDisplay({ ...menuDisplay, price: true, date: false, title: false }) : '';
        menu === 'date' && display ? setMenuDisplay({ ...menuDisplay, price: false, date: true, title: false }) : '';
        menu === 'title' && display ? setMenuDisplay({ ...menuDisplay, price: false, date: false, title: true }) : '';
    };

    const hideOptions = () => {
        setMenuDisplay({ ...menuDisplay, price: false, date: false, title: false });
    };

    return (
        <div className="fixed z-20 h-28 top-0 right-0 left-0 w-full flex flex-col space-y-5 bg-gradient-to-r from-blue-400 to-blue-900 flex flex-col">
            <span className="flex justify-end">
                <button
                    onClick={closeModal}
                    className="border rounded text-red-500 bg-white hover:bg-red-500 hover:text-white"
                >
                    <svg
                        className="w-4 h-4 text-center"
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
                </button>
            </span>

            <div className="">
                <div className="flex flex-row items-start justify-between mx-2">
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
                    {/* filter menu in header ------ start */}
                    <div>
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
                                                    onClick={() => {
                                                        setSortList({ ...sortList, [window]: '' });
                                                    }}
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
                                <button
                                    type="button"
                                    onClick={() => {
                                        showDropDown();
                                        hideOptions();
                                    }}
                                    className="relative focus:outline-none"
                                >
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
                        </div>{' '}
                    </div>
                </div>
                <div className={`absolute text-xs right-0 w-1/2 flex flex-row mx-2`}>
                    <ul className="right-1/4 w-1/2">
                        <ul className={`relative ${menuDisplay.price && display ? 'visible' : 'invisible'}`}>
                            <li className="bg-white p-2 border bg-gray-200 hover:bg-blue-800">
                                <button
                                    onClick={() => sortByPrice('low')}
                                    className={`${
                                        sortList[window] === 'Price (low to high)' ? 'text-white' : ''
                                    } w-full h-full text-center`}
                                >
                                    Low - high
                                </button>
                            </li>
                            <li class="absolute bg-white p-2 w-full border bg-gray-200 hover:bg-blue-800 hover:text-white">
                                <button
                                    onClick={() => sortByPrice('high')}
                                    className={`${
                                        sortList[window] === 'Price (high to low)' ? 'text-white' : ''
                                    } w-full h-full text-center`}
                                >
                                    High - low
                                </button>
                            </li>
                        </ul>
                        <ul className={`${menuDisplay.date && display ? 'visible' : 'invisible'}`}>
                            <li class="bg-white p-2 border bg-gray-200 hover:bg-blue-800 hover:text-white">
                                <button
                                    onClick={() => sortByDate('oldest')}
                                    className={`${
                                        sortList[window] === 'Date (oldest first)' ? 'text-white' : ''
                                    } w-full h-full text-center `}
                                >
                                    Old - new
                                </button>
                            </li>
                            <li class="absolute bg-white p-2 border w-1/2 bg-gray-200 hover:bg-blue-800 hover:text-white">
                                <button
                                    onClick={() => sortByDate('latest')}
                                    className={`${
                                        sortList[window] === 'Date (latest first)' ? 'text-white' : ''
                                    } w-full h-full text-center`}
                                >
                                    Old - new
                                </button>
                            </li>
                        </ul>
                        <ul className={`relative ${menuDisplay.title && display ? 'visible' : 'invisible'}`}>
                            <li class="bg-white p-2 border bg-gray-200 hover:bg-blue-800 hover:text-white">
                                <button
                                    onClick={() => sortByTitle('atoz')}
                                    className={`${
                                        sortList[window] === 'Title (A-Z)' ? 'text-white' : ''
                                    } w-full h-full text-center`}
                                >
                                    A - Z
                                </button>
                            </li>
                            <li class="bg-white p-2 border bg-gray-200 hover:bg-blue-800 hover:text-white">
                                <button
                                    onClick={() => sortByTitle('ztoa')}
                                    className={`${
                                        sortList[window] === 'Title (A-Z)' ? 'text-white' : ''
                                    } w-full h-full text-center`}
                                >
                                    Z - A
                                </button>
                            </li>
                        </ul>
                    </ul>
                    <ul class={`flex flex-col w-1/2 right-0 ${display ? 'block' : 'hidden'}`}>
                        <li>
                            <div
                                onMouseEnter={() => showOptions('price')}
                                className={`bg-white p-2 border w-full flex flex-row justify-around ${
                                    menuDisplay.price ? 'bg-gray-200' : ''
                                }`}
                            >
                                <svg
                                    className={`${
                                        menuDisplay.price ? 'origin-center transform rotate-90' : ''
                                    } w-3 h-3`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                                <div>Price</div>
                            </div>
                        </li>
                        <li>
                            <div
                                onMouseEnter={() => showOptions('date')}
                                className={`bg-white p-2 border w-full flex flex-row justify-around ${
                                    menuDisplay.date ? 'bg-gray-200' : ''
                                }`}
                            >
                                <svg
                                    className={`${menuDisplay.date ? 'origin-center transform rotate-90' : ''} w-3 h-3`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                                <div>Date</div>
                            </div>
                        </li>
                        <li>
                            <div
                                onMouseEnter={() => showOptions('title')}
                                className={`relative bg-white p-2 border w-full flex flex-row justify-around ${
                                    menuDisplay.title ? 'bg-gray-200' : ''
                                }`}
                            >
                                <svg
                                    className={`${
                                        menuDisplay.title ? 'origin-center transform rotate-90' : ''
                                    } w-3 h-3`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                                <div>Title</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {keyWords[window] ? (
                <div className="relative flex flex-row space-x-1 items-center justify-start">
                    <div className="absolute flex flex-row space-x-1 mx-2">
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
        </div>
    );
};

export default Header;

import React, { useState, useContext } from 'react';
import WebminarContext from '../../context/webminars';

const WebminarFilter = ({ window }) => {
    const { sortByPrice, sortByTitle, sortByDate } = useContext(WebminarContext);

    const [display, setDisplay] = useState({ price: false, date: false, title: false });

    const showDropDown = (menu) => {
        if (menu === 'price') {
            display.price === true
                ? setDisplay({ ...display, price: false })
                : setDisplay({ ...display, price: true, date: false, title: false });
        } else if (menu === 'date') {
            display.date === true
                ? setDisplay({ ...display, date: false })
                : setDisplay({ ...display, date: true, price: false, title: false });
        } else if (menu === 'title') {
            display.title === true
                ? setDisplay({ ...display, title: false })
                : setDisplay({ ...display, title: true, price: false, date: false });
        }
    };

    return (
        <div className="flex flex-row justify-between space-x-6">
            <div className="flex flex-col w-1/3">
                <div className="border shadow bg-gray-100 p-1 flex flex-row justify-between items-center space-x-4 w-full">
                    <div>Pricing:</div>
                    <button type="button" onClick={() => showDropDown('price')} className="focus:outline-none">
                        <svg
                            className="w-4 h-4 "
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
                <div className={`border shadow ${display.price === true ? 'block' : 'hidden'}`}>
                    <div className="border-b">
                        <button
                            type="button"
                            onClick={() => sortByPrice('low')}
                            className="p-1 text-center bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
                        >
                            Low to High
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => sortByPrice('high')}
                        className="p-1 text-center bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
                    >
                        High to Low
                    </button>
                </div>{' '}
            </div>
            {window === 'webinars' ? (
                <div className="flex flex-col w-1/3">
                    <div className="border shadow bg-gray-100 p-1 flex flex-row justify-between items-center w-full">
                        <div>Date:</div>
                        <button type="button" className="focus:outline-none" onClick={() => showDropDown('date')}>
                            <svg
                                className="w-4 h-4 "
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>{' '}
                    <div className={`border shadow ${display.date === true ? 'block' : 'hidden'}`}>
                        <div className="border-b">
                            <button
                                onClick={() => sortByDate('latest')}
                                type="button"
                                className="p-1 text-center bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
                            >
                                Latest first
                            </button>
                        </div>
                        <button
                            onClick={() => sortByDate('oldest')}
                            type="button"
                            className="p-1 text-center bg-white hover:bg-blue-800 hover:text-white w-full focus:outline-none"
                        >
                            Oldest first
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}
            <div className="flex flex-col w-1/3">
                <div className="border shadow bg-gray-100 p-1 flex flex-row justify-between items-center w-full">
                    <div>Title:</div>
                    <button type="button" onClick={() => showDropDown('title')} className="focus:outline-none">
                        <svg
                            className="w-4 h-4 "
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>{' '}
                <div className={`border shadow ${display.title === true ? 'block' : 'hidden'}`}>
                    <div className="border-b">
                        <button
                            typr="button"
                            onClick={() => sortByTitle('atoz')}
                            className="p-1 bg-white hover:bg-blue-800 hover:text-white text-center w-full focus:outline-none"
                        >
                            A to Z
                        </button>
                    </div>
                    <button
                        typr="button"
                        onClick={() => sortByTitle('ztoa')}
                        className="p-1 bg-white hover:bg-blue-800 hover:text-white text-center w-full focus:outline-none"
                    >
                        Z to A
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WebminarFilter;

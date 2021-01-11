import React from 'react';
import WebminarDisplay from './WebminarDisplay';

const WebminarSearch = ({ webminarList, closeModal }) => {
    return (
        <div>
            <div className="flex justify-end">
                <button onClick={closeModal} type="button">
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="text-left mx-8 flex flex-row justify-between">
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

            <div className="flex flex-col space-y-10 p-8">
                <div className="relative">
                    <label htmlFor="search" className="flex flex-row items-center">
                        <button className="absolute text-gray-500 focus:outline-none hover:text-white hover:text-blue-800 px-2">
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
                            placeholder="Search webminars"
                        ></input>
                    </label>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="text-center mb-6">Search results</div>
                    <div className="flex flex-col space-y-2 mt-4">
                        {webminarList.map((webminar) => (
                            <div key={webminar.id}>
                                <div>
                                    <WebminarDisplay webminar={webminar} />
                                </div>
                                <div className="border bg-gray-500 mt-2 mb-4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebminarSearch;

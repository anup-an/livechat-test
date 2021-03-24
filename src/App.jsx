import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './assets/main.css';
import WebminarSearch from './components/webminars/WebminarSearch';
import { sendSelectedWebminars } from './utils/config';
import { createDetailsWidget } from '@livechat/agent-app-sdk';
import WebminarContext from './context/webminars';
import useWebminars from './hooks/useWebminars';

Modal.setAppElement('#root');

const App = ({ accessToken }) => {
    const [webminarList, setWebminarList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [consultantsList, setConsultantsList] = useState([]);

    const [chatId, setChatId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [window, setWindow] = useState('');

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setWindow('');
    };

    const openList = (list) => {
        openModal();
        setWindow(list);
        setModalContent(
            <WebminarSearch
                closeModal={closeModal}
                accessToken={accessToken}
                chatId={chatId}
                window={list}
                openList={openList}
            />,
        );
    };

    useEffect(() => {
        createDetailsWidget()
            .then((widget) => {
                // condition that is emitted when an agent opens a conversation within Chats
                widget.on('customer_profile', (profile) => {
                    // sets chat_id
                    setChatId(profile.chat.chat_id);
                });
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(' https://api-test.meeteo.io/thirdParty/v1/list_webinars?app_id=678901')
            .then((response) => {
                setWebminarList(response.data.data.data);
                localStorage.setItem(
                    'webminarList',
                    JSON.stringify(
                        response.data.data.data.map((e) => ({ ...e, isSelected: false, isDisplayed: true })),
                    ),
                );
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    useEffect(() => {
        axios
            .get('https://api-test.meeteo.io/thirdParty/v1/list_services?app_id=678901')
            .then((response) => {
                setServicesList(response.data.data.data);
                localStorage.setItem(
                    'servicesList',
                    JSON.stringify(
                        response.data.data.data.map((e) => ({ ...e, isSelected: false, isDisplayed: true })),
                    ),
                );
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    useEffect(() => {
        axios
            .get('https://api-test.meeteo.io/thirdParty/v1/list_consultants?app_id=678901')
            .then((response) => {
                console.log(response.data.data.data);
                setConsultantsList(response.data.data.data);
                localStorage.setItem(
                    'consultantsList',
                    JSON.stringify(
                        response.data.data.data.map((e) => ({ ...e, isSelected: false, isDisplayed: true })),
                    ),
                );
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    return (
        <div className="relative flex flex-col h-screen">
            <header className=" h-5/6">
                <div className="text-white bg-gradient-to-r from-blue-400 to-blue-900 h-5/6 ">
                    <div className="p-4">Welcome!</div>
                </div>
            </header>
            <footer className="bg-white h-1/6 w-full flex items-end justify-center">
                <div className="bg-white h-32 border-b border-gray-200"></div>

                <div className="flex flex-row items-center h-16 space-x-4">
                    <div className="text-xs flex items-center">
                        <div>Powered by</div>{' '}
                    </div>
                    <div className="text-blue-800">meeteo.io</div>
                </div>
            </footer>
            <div className="absolute mt-14 m-4 flex flex-col space-y-6 items-center justify-center">
                <button
                    onClick={() => sendSelectedWebminars(webminarList, chatId, accessToken)}
                    type="button"
                    className="flex flex-row items-center space-x-4 w-full p-4 border rounded shadow bg-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                >
                    <svg
                        className="h-16 w-16 text-blue-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                    <div className="flex flex-col content-start space-y-2">
                        <div className="font-bold">Upcoming Webinars</div>
                        <div className="text-xs">Send upcoming webinars to customers</div>
                    </div>
                    <div>
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
                <button
                    onClick={() => openList('services')}
                    type="button"
                    className="p-4 flex flex-row w-full items-center border rounded shadow bg-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                >
                    <svg
                        className="w-16 h-16 text-blue-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    <div className="flex flex-col content-start space-y-2">
                        <div className="font-bold">Services</div>
                        <div className="text-xs">Browse services and send service details to customers</div>
                    </div>{' '}
                    <div>
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>

                <button
                    onClick={() => openList('webinars')}
                    type="button"
                    className="p-4 flex flex-row w-full items-center border rounded shadow bg-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                >
                    <svg
                        className="h-16 w-16 text-blue-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                    <div className="flex flex-col content-start space-y-2">
                        <div className="font-bold">Webinars</div>
                        <div className="text-xs">Browse webinars and send webinar details to customers</div>
                    </div>{' '}
                    <div>
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
                <button
                    onClick={() => openList('consultants')}
                    type="button"
                    className="p-4 flex flex-row w-full items-center border rounded shadow bg-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                >
                    <svg
                        className="w-16 h-16 text-blue-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                            fill="#fff"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                    </svg>
                    <div className="flex flex-col justify-start space-y-2">
                        <div className="font-bold">Consultants</div>
                        <div className="text-xs">Browse consultants and send consultant details to customers</div>
                    </div>{' '}
                    <div>
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            </div>
            <WebminarContext.Provider value={useWebminars(window)}>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    overlayClassName="fixed inset-0 bg-white bg-opacity-75 flex justify-center"
                    className="relative bg-white overflow-y-auto focus:outline-none w-screen"
                >
                    {modalContent}
                </Modal>
            </WebminarContext.Provider>
        </div>
    );
};

export default App;

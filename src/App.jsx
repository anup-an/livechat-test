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
                    <svg height="53.608" width="60.049" viewBox="0 0 60.049 53.608" xmlns="http://www.w3.org/2000/svg">
                        <defs />
                        <path
                            className="a"
                            d="M719.322,205.37H668.363a4.567,4.567,0,0,0-4.552,4.539v36.943a4.572,4.572,0,0,0,4.552,4.563h17.3v5.727h-6.225a.936.936,0,0,0-.918.918.919.919,0,0,0,.918.918h28.816a.909.909,0,0,0,.9-.918.926.926,0,0,0-.9-.918h-6.225v-5.727h17.3a4.56,4.56,0,0,0,4.538-4.563v-5.617a.9.9,0,1,0-1.809,0v2.89H695.5V231.808a6.267,6.267,0,0,0-6.264-6.264H675.586a6.27,6.27,0,0,0-6.266,6.264v12.317h-3.686V209.909a2.748,2.748,0,0,1,2.729-2.73h50.959a2.748,2.748,0,0,1,2.729,2.73v.188a.9.9,0,1,0,1.809,0v-.188A4.555,4.555,0,0,0,719.322,205.37ZM700.2,257.142H687.47v-5.727H700.2Zm-29.071-25.334a4.459,4.459,0,0,1,4.455-4.455h6v12.262a.9.9,0,1,0,1.808,0V227.353h5.849a4.461,4.461,0,0,1,4.455,4.455v12.317h-3.536V232.754a.921.921,0,0,0-.919-.918.91.91,0,0,0-.907.918v11.371H676.505V232.754a.92.92,0,0,0-.919-.918.907.907,0,0,0-.9.918v11.371h-3.551Zm-.9,14.126h51.824v.918a2.729,2.729,0,0,1-2.729,2.727H668.363a2.729,2.729,0,0,1-2.729-2.727v-.918Z"
                            transform="translate(-663.811 -205.37)"
                        />
                        <path
                            className="a"
                            d="M676.72 217.522a5.6 5.6 0 105.606-5.589A5.628 5.628 0 00676.72 217.522zm9.4 0a3.794 3.794 0 11-3.794-3.781A3.8 3.8 0 01686.12 217.522zM721 213.741H702.173A2.859 2.859 0 00699.3 216.6v1.485h-4.7a.91.91 0 00-.8.486.861.861 0 00.042.919l5.279 7.994a.971.971 0 01.174.567V234.7a2.88 2.88 0 002.876 2.89H721a2.877 2.877 0 002.862-2.89V216.6A2.856 2.856 0 00721 213.741zm1.053 20.957A1.046 1.046 0 01721 235.751H702.173a1.046 1.046 0 01-1.053-1.053v-6.643a2.691 2.691 0 00-.484-1.565l-4.336-6.562h3.9a.928.928 0 00.918-.918V216.6a1.062 1.062 0 011.053-1.051H721a1.062 1.062 0 011.053 1.051z"
                            transform="translate(-663.811 -205.37)"
                        />
                        <path
                            className="a"
                            d="M717.5 219.278H705.672a.936.936 0 00-.919.918.918.918 0 00.919.918H717.5a.906.906 0 00.9-.918A.924.924 0 00717.5 219.278zM717.5 224.734H705.672a.936.936 0 00-.919.918.92.92 0 00.919.918H717.5a.908.908 0 00.9-.918A.924.924 0 00717.5 224.734zM712.95 230.215h-7.278a.906.906 0 100 1.811h7.278a.906.906 0 000-1.811z"
                            transform="translate(-663.811 -205.37)"
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

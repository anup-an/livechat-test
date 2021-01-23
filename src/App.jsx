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
            <WebminarSearch closeModal={closeModal} accessToken={accessToken} chatId={chatId} window={list} />,
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
            .get(' https://api-test.meeteo.io/thirdParty/v1/list_webinars?app_id=123456')
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
            .get('https://api-test.meeteo.io/thirdParty/v1/list_services?app_id=123456')
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

    return (
        <div className="border rounded shadow p-10 m-2">
            <div className="flex flex-col space-y-6">
                <div>
                    <button
                        onClick={() => sendSelectedWebminars(webminarList, chatId, accessToken)}
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Send upcoming webinars
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => openList('services')}
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Open services list
                    </button>
                </div>

                <div>
                    <button
                        onClick={() => openList('webminars')}
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Search webminars
                    </button>
                </div>
            </div>
            <WebminarContext.Provider value={useWebminars(window)}>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    overlayClassName="fixed inset-0 bg-white bg-opacity-75 flex justify-center"
                    className="relative bg-white overflow-y-auto focus:outline-none p-2 w-full m-1"
                >
                    {modalContent}
                </Modal>
            </WebminarContext.Provider>
        </div>
    );
};

export default App;

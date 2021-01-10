import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './assets/main.css';
import WebminarSearch from './components/WebminarSearch';

Modal.setAppElement('#root');

const App = () => {
    const [webminarList, setWebminarList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        axios
            .get(' https://api-test.meeteo.io/thirdParty/v1/list_webinars?app_id=123456')
            .then((response) => {
                console.log(response.data.data.data);
                setWebminarList(response.data.data.data);
                localStorage.setItem('webminarList', JSON.stringify(response.data.data.data));
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    useEffect(() => {
        axios
            .get('https://api-test.meeteo.io/thirdParty/v1/list_services?app_id=123456')
            .then((response) => {
                console.log(response.data.data.data);
                setServicesList(response.data.data.data);
                localStorage.setItem('servicesList', JSON.stringify(response.data.data.data));
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
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Send upcoming webinars
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Send services list
                    </button>
                </div>

                <div>
                    <button
                        onClick={openModal}
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Search webminars
                    </button>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                overlayClassName="fixed inset-0 bg-blue-800 bg-opacity-75 flex justify-center"
                className="relative bg-white overflow-y-auto focus:outline-none w-3/4 p-2 m-10 border rounded"
            >
                <WebminarSearch webminarList={webminarList} closeModal={closeModal} />
            </Modal>
        </div>
    );
};

export default App;

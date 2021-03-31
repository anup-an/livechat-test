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
                    console.log(profile.chat);
                    // sets chat_id
                    setChatId(profile.chat.chat_id);
                });
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(` https://api-test.meeteo.io/thirdParty/v1/list_webinars?app_id=678901`)
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
            .get(` https://api-test.meeteo.io/thirdParty/v1/list_services?app_id=678901`)
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
            .get(` https://api-test.meeteo.io/thirdParty/v1/list_consultants?app_id=678901`)
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
                    <svg height="58.696" width="55.798" viewBox="0 0 55.798 58.696" xmlns="http://www.w3.org/2000/svg">
                        <defs />
                        <path
                            className="a"
                            d="M502.412,562.5H448.294a.843.843,0,0,0-.84.853v53.827a.838.838,0,0,0,.84.827h28.2l.678,2.585a.83.83,0,0,0,.6.579.6.6,0,0,0,.214.025.892.892,0,0,0,.6-.226l2.934-2.963h20.892a.836.836,0,0,0,.84-.827V563.354A.842.842,0,0,0,502.412,562.5Zm-53.265,1.68h52.411v6.777H449.147Zm15.66,34.907,14.354-14.354a17.952,17.952,0,0,1,4.492-3.261,15.547,15.547,0,0,0,9.449,9.459,18.271,18.271,0,0,1-3.251,4.491L475.5,609.778Zm6.111,8.508-2.9,4.818a7.357,7.357,0,0,1-5.859-5.874l4.818-2.886Zm-7.566-9.462-7.5-1.983,6.712-6.725,11.934-2.408Zm31.631-13.549a17.587,17.587,0,0,1-1.167,4.766,13.8,13.8,0,0,1-8.593-8.582,17.274,17.274,0,0,1,4.767-1.18l5.545-.552Zm-16.562,34.153-1.994-7.529,11.142-11.116-2.423,11.918Zm23.137-2.41H483.213l3.3-3.313a.638.638,0,0,0,.226-.426l3-14.681,1.3-1.3a19.234,19.234,0,0,0,3.965-5.746.382.382,0,0,0,.088-.175c.013-.025,0-.051.013-.051a19.333,19.333,0,0,0,1.557-5.872l.663-6.575a.892.892,0,0,0-.25-.7.828.828,0,0,0-.678-.226l-6.573.653a19.732,19.732,0,0,0-5.887,1.554H483.9a.884.884,0,0,0-.113.077,19.294,19.294,0,0,0-5.823,3.988l-1.316,1.306-14.68,2.986a.969.969,0,0,0-.427.252l-7.93,7.93a.8.8,0,0,0-.213.8.818.818,0,0,0,.588.6l9.184,2.434,2.572,2.585-4.931,2.96a.853.853,0,0,0-.413.8,9.094,9.094,0,0,0,7.994,7.979h.074a.868.868,0,0,0,.727-.4l2.95-4.944,2.586,2.585,1.3,4.919H449.147v-43.69h52.411Z"
                            transform="translate(-447.454 -562.501)"
                        />
                        <path
                            className="a"
                            d="M497.367 566.967a.852.852 0 00.6 1.454.851.851 0 00.591-1.454A.9.9 0 00497.367 566.967zM493.315 566.741a.821.821 0 00-.84.827.842.842 0 00.84.853.852.852 0 00.853-.853A.832.832 0 00493.315 566.741zM488.07 566.967a.846.846 0 000 1.205.881.881 0 00.6.249.937.937 0 00.6-.249.852.852 0 00-1.2-1.205zM482.486 595.724a3.637 3.637 0 002.585-6.221 3.655 3.655 0 10-2.585 6.221zm-1.38-5.018a1.952 1.952 0 112.76 2.762 1.927 1.927 0 01-2.76 0A1.949 1.949 0 01481.106 590.706zM477.807 596.78a3.647 3.647 0 00-5.17 5.145 3.647 3.647 0 105.17-5.145zm-1.205 3.965a1.96 1.96 0 11-2.76-2.785 2 2 0 012.76 0A1.977 1.977 0 01476.6 600.745z"
                            transform="translate(-447.454 -562.501)"
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
                    <svg height="58.766" width="60.035" viewBox="0 0 60.035 58.766" xmlns="http://www.w3.org/2000/svg">
                        <defs />
                        <path
                            className="a"
                            d="M328.918,538.7a33.112,33.112,0,0,0-4.253-1.809,20.877,20.877,0,0,0,3.509-11.587c0-9.964-5.522-20.686-17.66-20.686a17.1,17.1,0,0,0-7.278,1.538,19.322,19.322,0,0,0-5.47-.783c-8.681,0-14.3,5.078-14.3,12.909a16.24,16.24,0,0,0,.34,3.3,5.5,5.5,0,0,0-.487,2.942,5.065,5.065,0,0,0,1.551,3.429,2.179,2.179,0,0,0,1.256.542,15.571,15.571,0,0,0,5.077,7.8,7.121,7.121,0,0,1-1.85,3.51c-1.781.3-2.876.567-2.9.567-.757.191-1.554.434-2.5.73a39.23,39.23,0,0,0-5.561,2.295,8.848,8.848,0,0,0-4.848,7.887v2.4a5.929,5.929,0,0,0,3.158,5.293c3.808,2.025,10.548,4.4,21.051,4.4s17.245-2.378,21.039-4.4a5.894,5.894,0,0,0,2.282-2.107,35.512,35.512,0,0,0,9.466-3.213,5.709,5.709,0,0,0,3.039-5.1v-2.268A8.507,8.507,0,0,0,328.918,538.7Zm-18.4-32.273c10.882,0,15.838,9.8,15.838,18.877a19.057,19.057,0,0,1-3.485,10.992c-.591-.163-1.12-.323-1.631-.459a27.665,27.665,0,0,0-2.837-.674,6.874,6.874,0,0,1-1.674-3.106,14.3,14.3,0,0,0,4.2-6.67,2.192,2.192,0,0,0,1.123-.515,4.693,4.693,0,0,0,1.416-3.16c.177-2.052-.675-3.725-2.093-4.132a3.069,3.069,0,0,0-1.2-.053,6.677,6.677,0,0,0-2.5-3.188c-1.689-1.079-3.794-1.214-6.252-.376a11.453,11.453,0,0,0-5.725-6.778A15.066,15.066,0,0,1,310.514,506.426Zm1.012,34.676c-.945-.3-1.742-.539-2.472-.73a23.3,23.3,0,0,0-3.009-.675,7.1,7.1,0,0,1-1.77-3.4,14.247,14.247,0,0,0,2.512-2.594,8.978,8.978,0,0,0,3.644.811,9.335,9.335,0,0,0,4.726-1.322,8.62,8.62,0,0,0,1.812,3.1c-.15,1.378-1.311,3.565-2.73,5.8C313.377,541.752,312.472,541.425,311.526,541.1Zm.634-16.582a5.643,5.643,0,0,0-.445-2.862,16.313,16.313,0,0,0,.351-3.377,15.562,15.562,0,0,0-.216-2.566,5.639,5.639,0,0,1,4.552,0,4.944,4.944,0,0,1,2.268,3.106,1,1,0,0,0,.365.65.969.969,0,0,0,.81.135,1.919,1.919,0,0,0,.268-.135,1.1,1.1,0,0,1,.772-.136c.39.108.876.946.755,2.215a2.981,2.981,0,0,1-.755,1.917c-.094.08-.163.107-.23.08a.984.984,0,0,0-.782,0,.89.89,0,0,0-.5.594,12.3,12.3,0,0,1-4.43,7.022,7.471,7.471,0,0,1-7.13.973,17.687,17.687,0,0,0,1.541-3.645,2.173,2.173,0,0,0,1.255-.542A5.039,5.039,0,0,0,312.16,524.52Zm-14.394-17.311c7.7,0,12.491,4.239,12.491,11.072a15.039,15.039,0,0,1-.135,1.809c-.081-.025-.15-.053-.216-.08a2.989,2.989,0,0,0-1.377-.028c-.216-.647-.567-1.673-1.148-3.293-.014-.028-.041-.056-.055-.081a.852.852,0,0,0-.094-.163,1.116,1.116,0,0,0-.122-.135c-.028-.025-.028-.053-.052-.053a1.445,1.445,0,0,1-.15-.083h0a8.787,8.787,0,0,0-9.695.083,7.139,7.139,0,0,1-7.724,0,.192.192,0,0,0-.122-.055.13.13,0,0,0-.094-.053c-.028-.027-.041-.027-.053-.027a.449.449,0,0,0-.19-.028h-.175a.336.336,0,0,0-.149.055.385.385,0,0,0-.177.053,1.241,1.241,0,0,1-.133.083c-.041.052-.1.08-.135.133a.243.243,0,0,0-.042.055c-.027.027-.027.052-.052.108a1.137,1.137,0,0,0-.069.108c-.581,1.62-.932,2.646-1.148,3.293a2.989,2.989,0,0,0-1.377.028c-.053.027-.108.055-.161.08a15.464,15.464,0,0,1-.121-1.809C285.291,511.448,290.069,507.209,297.766,507.209Zm-10.1,20.066a.925.925,0,0,0-.525-.6.977.977,0,0,0-.824,0c-.094.028-.216-.08-.285-.135a3.3,3.3,0,0,1-.9-2.188c-.136-1.565.473-2.456.932-2.591a1.183,1.183,0,0,1,.932.163,2.087,2.087,0,0,0,.282.133.95.95,0,0,0,.81-.133.933.933,0,0,0,.365-.65c.069-.268.514-1.565,1-2.942a9.116,9.116,0,0,0,3.9.89,8.52,8.52,0,0,0,4.928-1.512,7.131,7.131,0,0,1,7.494-.108c.581,1.62,1.176,3.349,1.256,3.672a.9.9,0,0,0,1.175.783,2.085,2.085,0,0,0,.282-.133,1.219,1.219,0,0,1,.946-.163c.445.135,1.054,1.026.918,2.591a3.387,3.387,0,0,1-.89,2.188.513.513,0,0,1-.379.11.9.9,0,0,0-1.27.62,13.7,13.7,0,0,1-4.969,7.831,8.506,8.506,0,0,1-10.207,0A13.717,13.717,0,0,1,287.666,527.275Zm5.158,10.1a9.963,9.963,0,0,0,9.831,0,8.956,8.956,0,0,0,1.972,3.484c-.459,1.433-3.714,4.079-6.875,6.079-3.172-2-6.427-4.674-6.886-6.079A8.717,8.717,0,0,0,292.824,537.374Zm-17.472,16.313v-2.4a7.02,7.02,0,0,1,3.874-6.266,34.956,34.956,0,0,1,5.293-2.16c.9-.3,1.662-.515,2.392-.73.025,0,.9-.216,2.348-.459,1.162,2.646,5.835,5.752,7.589,6.833v13.045c-10.127-.136-16.419-2.647-19.295-4.16A4.165,4.165,0,0,1,275.352,553.687Zm44.789,0a4.164,4.164,0,0,1-2.2,3.7c-2.876,1.513-9.153,4.024-19.28,4.16V548.5c1.781-1.106,6.521-4.267,7.616-6.941.769.163,1.537.351,2.3.567.728.191,1.485.406,2.4.7a32.758,32.758,0,0,1,5.293,2.188,7.019,7.019,0,0,1,3.875,6.266Zm11.626-5.132a3.9,3.9,0,0,1-2.08,3.484,31.243,31.243,0,0,1-7.845,2.782,5.332,5.332,0,0,0,.121-1.134v-2.4a9.124,9.124,0,0,0-.16-1.593,37.655,37.655,0,0,0,4.59-1.269.914.914,0,0,0-.594-1.729,41.852,41.852,0,0,1-4.511,1.242A8.935,8.935,0,0,0,317.1,543.4c-.379-.188-.771-.4-1.161-.567a21.393,21.393,0,0,0,2.727-5.752,17.781,17.781,0,0,1,2.079.514c.7.161,1.43.377,2.282.648a35.3,35.3,0,0,1,5.049,2.079,6.706,6.706,0,0,1,3.687,5.968Z"
                            transform="translate(-273.543 -504.617)"
                        />
                        <path
                            className="a"
                            d="M314.969,551.9a47.409,47.409,0,0,1-7.331,1.863.9.9,0,0,0-.744,1.054.915.915,0,0,0,.891.758.26.26,0,0,0,.149-.028,48.1,48.1,0,0,0,7.63-1.919.914.914,0,1,0-.6-1.728Z"
                            transform="translate(-273.543 -504.617)"
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

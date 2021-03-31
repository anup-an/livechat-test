import React, { useContext } from 'react';
import WebminarContext from '../../context/WebminarContext';
import { Zoom } from 'react-awesome-reveal';

const sendList = ({ webminar, deleteWebminar, window }) => {
    const { select, colorOnSelect } = useContext(WebminarContext);
    const scrollDiv = () => {
        let elem = document.getElementById(`${webminar.id}`);
        elem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    };
    return (
        <Zoom>
            <div className=" transition duration-500 ease-in-out transform hover:translate-y-0 hover:scale-110 text-xs">
                <button onClick={() => deleteWebminar(webminar.id)} type="button">
                    <div className={`absolute z-20 -mt-1 -ml-1.5 border rounded-full bg-red-600 text-white`}>
                        <svg
                            className="h-3 w-3"
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
                    </div>
                </button>
                <button
                    onClick={() => {
                        scrollDiv();
                        colorOnSelect(webminar);
                    }}
                    className={` p-2 w-10 mb-2 h-10 border ${
                        select.id === webminar.id && select.isColored === true
                            ? 'bg-gradient-to-r from-blue-400 to-blue-900 text-white'
                            : ''
                    } rounded shadow focus:outline-none flex items-center justify-center`}
                >
                    {window === 'webinars' ? (
                        <div className="flex flex-col content-center justify-center">
                            <div>{new Date(webminar.startDate).toString().slice(4, 7)}</div>
                            <div className="text-xs text-center">
                                {new Date(webminar.startDate).toString().slice(8, 10)}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}

                    {window === 'services' ? <div className="text-xs text-center">{webminar.name}</div> : ''}
                    {window === 'consultants' ? <div className="text-xs text-center">{webminar.name}</div> : ''}
                </button>
            </div>
        </Zoom>
    );
};

export default sendList;

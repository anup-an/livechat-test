import React, { useState } from 'react';

const WebminarServices = ({ servicesList, closeModal, accessToken, chatId }) => {
    const [selectedServices, setSelectedServices] = useState(servicesList.map((e) => ({ ...e, isSelected: false })));
    const [sendServices, setSendServices] = useState([]);
    const selectService = (service, serviceId) => {
        const foundService = selectedServices.find((e) => e.id === serviceId && e.isSelected === true);
        if (foundService) {
            setSelectedServices([...selectedServices]);
            setSendServices([...sendServices]);
        } else if (!foundService) {
            const x = selectedServices.map((e) => (e.id === serviceId ? { ...e, isSelected: true } : { ...e }));
            setSelectedServices(x);
            setSendServices([...sendServices, service]);
        }
    };

    const deleteService = (serviceId) => {
        const x = selectedServices.map((e) => (e.id === serviceId ? { ...e, isSelected: false } : { ...e }));
        setSelectedServices(x);
        setSendServices([...sendServices.filter((service) => service.id !== serviceId)]);
    };
    console.log(sendServices);

    return (
        <div>
            <header>
                <div className="flex justify-end">
                    <button onClick={closeModal} type="button">
                        <div className="border rounded-full p-1 hover:bg-blue-800 hover:text-white text-center">
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </header>
            <main>
                <div className="grid grid-cols-2 gap-6 place-content-center border shadow p-4">
                    {selectedServices.map((service) => (
                        <div
                            key={service.id}
                            className={`transition duration-500 ease-in-out transform hover:translate-y-0 hover:scale-105`}
                        >
                            <div
                                className={`${
                                    service.isSelected === true ? 'block' : 'hidden'
                                } absolute z-10 -mt-2 -ml-2 border rounded-full bg-green-600 text-white p-1`}
                            >
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
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <div>
                                <button
                                    onClick={() => selectService(service, service.id)}
                                    type="button"
                                    className={` p-4 w-full text-white h-20 bg-blue-800 border rounded shadow focus:outline-none`}
                                >
                                    <div className="text-center">{service.name}</div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer>
                <div className="flex flex-row justify-between items-center border p-4 shadow w-full gap-x-6">
                    <div className="grid grid-cols-3 sm:grid-cols-4 pb-2 gap-x-4 mb-4">
                        {sendServices
                            ? sendServices.map((service) => (
                                  <div
                                      key={service.id}
                                      className="transition duration-500 ease-in-out transform hover:translate-y-0 hover:scale-105"
                                  >
                                      <button onClick={() => deleteService(service.id)} type="button">
                                          <div
                                              className={`absolute z-10 -mt-2 -ml-3 border rounded-full bg-red-600 text-white p-1`}
                                          >
                                              <svg
                                                  className="h-2 w-2"
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
                                      <div
                                          className={` p-4 w-16 h-16 border rounded shadow focus:outline-none flex items-center justify-center`}
                                      >
                                          <div className="text-xs text-center">{service.name}</div>
                                      </div>
                                  </div>
                              ))
                            : ''}
                    </div>
                    <button
                        type="button"
                        className="py-1 px-2 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Send
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default WebminarServices;

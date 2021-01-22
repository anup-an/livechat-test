import axios from 'axios';
import { formatCurrency } from './index';
export const config = {
    client_id: 'f79f914bd1d7803da8b4d8821edd1aa5',
    livechat_server_url: 'https://api.livechatinc.com/v3.2',
    account_url: 'https://accounts.livechatinc.com/',
    meetio_server_url: {
        webminarList: 'https://api-test.meeteo.io/thirdParty/v1/list_webinars?app_id=123456',
        servicesList: 'https://api-test.meeteo.io/thirdParty/v1/list_services?app_id=123456',
        webminarById: 'https://api-test.meeteo.io/thirdParty/v1/get_webinar_by_id?app_id=123456&webinarId=1',
    },
};

export const sendSelectedWebminars = (webminars, chatId, accessToken, window) => {
    let elementsArr;
    window === 'webminars'
        ? (elementsArr = webminars.map((webminar) => ({
              title: `${webminar.title}`,
              subtitle: `${formatCurrency(Number(webminar.price))}`,
              image: {
                  size: 123444,
                  width: 640,
                  height: 480,
                  url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg',
              },
              buttons: [
                  {
                      text: 'Join webminar',
                      postback_id: 'action_yes',
                      type: 'webview',
                      value: `${webminar.company.domain}/webminar-detail/${webminar.slug}`,
                      webview_height: 'full',
                      user_ids: [],
                  },
              ],
          })))
        : webminars.map((webminar) => ({
              title: `${webminar.title}`,
              subtitle: `${formatCurrency(Number(webminar.price))}`,
              image: {
                  size: 123444,
                  width: 640,
                  height: 480,
                  url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg',
              },
              buttons: [
                  {
                      text: 'Join service',
                      postback_id: 'action_yes',
                      type: 'webview',
                      value: `https://test-company.test.meeteo.io/service/${webminar.slug}`,
                      webview_height: 'full',
                      user_ids: [],
                  },
              ],
          }));
    const payload = {
        chat_id: chatId,
        event: {
            type: 'rich_message',
            recipients: 'all',
            template_id: 'cards',
            elements: webminars.map((webminar) => ({
                title: `${webminar.title}`,
                subtitle: `${formatCurrency(Number(webminar.price))}`,
                image: {
                    size: 123444,
                    width: 640,
                    height: 480,
                    url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg',
                },
                buttons: [
                    {
                        text: 'Join webminar',
                        postback_id: 'action_yes',
                        type: 'webview',
                        value: `${webminar.company.domain}/webminar-detail/${webminar.slug}`,
                        webview_height: 'full',
                        user_ids: [],
                    },
                ],
            })),
        },
    };

    axios
        .post(
            'https://api.livechatinc.com/v3.2/agent/action/send_event',

            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const sendSelectedServices = (services, chatId, accessToken) => {
    console.log(services);
    const payload = {
        chat_id: chatId,
        event: {
            type: 'rich_message',
            recipients: 'all',
            template_id: 'cards',
            elements: services.map((service) => ({
                title: `${service.name}`,
                subtitle: `${formatCurrency(Number(service.onlinePrice))}`,
                image: {
                    size: 123444,
                    width: 640,
                    height: 480,
                    url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg',
                },
                buttons: [
                    {
                        text: 'Join service',
                        postback_id: 'action_yes',
                        type: 'webview',
                        value: `https://test-company.test.meeteo.io/service/${service.slug}`,
                        webview_height: 'full',
                        user_ids: [],
                    },
                ],
            })),
        },
    };

    axios
        .post(
            'https://api.livechatinc.com/v3.2/agent/action/send_event',

            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

import axios from 'axios';

import * as queryString from 'query-string';
import Bus from "@/utils/common/bus";

const api = process.env.VUE_APP_API_URL;


export class AxiosWrapper {
    static get axios() {
        return axios;
    }

    static __getPath(path) {
        return [api, path.replace(/\//, '')].join('/');
    }

    static async get(path, data, config, lock) {
        let isLock = lock;
        let configData = config;

        if (typeof config === 'boolean') {
            isLock = configData;
            configData = undefined;
        }
        if (isLock) setLoading(true);

        let response = axios.get(`${this.__getPath(path)}?${queryString.stringify(data || {})}`, configData);
        response.then(request(isLock), error(isLock));

        return response;
    }

    static async post(path, data, config, lock) {
        let isLock = lock;
        let configData = config;

        if (typeof config === 'boolean') {
            isLock = configData;
            configData = undefined;
        }
        if (isLock) setLoading(true);

        let response = axios.post(`${this.__getPath(path)}`, data, configData);
        response.then(request(isLock), error(isLock));

        return response;
    }

    static async put(path, data, config, lock) {
        let isLock = lock;
        let configData = config;

        if (typeof config === 'boolean') {
            isLock = configData;
            configData = undefined;
        }
        if (isLock) setLoading(true);

        let response = axios.put(`${this.__getPath(path)}`, data, configData);
        response.then(request(isLock), error(isLock));

        return response;
    }

    static async delete(path, data, config, lock) {
        let isLock = lock;
        let configData = config;

        if (typeof config === 'boolean') {
            isLock = configData;
            configData = undefined;
        }
        if (isLock) setLoading(true);

        let response = axios.delete(`${this.__getPath(path)}`, data, configData);
        response.then(request(isLock), error(isLock));

        return response;
    }
}

const request = function (lock) {
    return function (response) {
        if (lock) setLoading(false);
        status.handler(response.status, response);

        if (response.data.alerts) {
            for (let i in response.data.alerts) {
                addAlert({
                    text: response.data.alerts[i],
                    type: response.data.success ? 'success' : 'dangerous'
                });
            }
        }
    };
};

const error = function (lock) {
    return function (error) {
        if (lock) setLoading(false);
        status.handler(error.response.status, error.response);
        return error;
    };
};


const status = {
    500: (() => {
        let message = 'Произошла ошибка на стороне сервера';
        console.log({
            text: message,
            type: 'error'
        });
    }),
    404: (() => {
        Bus.$emit('pageNotFound');
    }),
    default: (() => {
    })
};

status.handler = function (name = 'default') {
    let statusFunction = status[name] || status['default'];
    return statusFunction.apply(status, [].slice.call(arguments, 1));
};

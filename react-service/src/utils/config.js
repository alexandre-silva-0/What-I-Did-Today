// export const api = 'https://widt-back.oasis-server.com.br';
export const api = 'http://192.168.1.11:3001';

export const requestConfig = (method, data = null) => {
    let config;

    if (method === "DELETE" || data === null) {
        config = {
            method: method,
            credentials: "include",
            headers: {},
        };
    } else {
        config = {
            method: method,
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
    }

    return config;
};

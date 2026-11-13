export const api = "http://localhost:3001";

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

// Em produção fica vazio e as chamadas vão para /api/... no mesmo domínio
export const api = import.meta.env.VITE_API_URL ?? ''

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

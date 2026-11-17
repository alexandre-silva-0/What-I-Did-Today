# What I Did Today — front-end

App para registrar as tarefas do dia (com horário de início e fim), consultar os registros de outros dias e acompanhar pendências.

## Stack

- React 19 + Vite
- Redux Toolkit e React Router
- CSS Modules
- Bootstrap Icons e fonte Inter (instaladas pelo npm, sem CDN)

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

A URL da API vem do `VITE_API_URL`:

- `.env.development`: aponta para o back na rede local
- `.env.production`: vazio, então as chamadas vão para `/api/...` no mesmo domínio

## Build e Docker

```bash
npm run build    # gera a pasta build/
npm run preview  # serve o build localmente

docker build -t aleu7/widt-front .
```

Na imagem, o Nginx serve o build e repassa `/api/` para o container do back (`nginx.conf`). O `sw.js` é registrado só no build de produção.

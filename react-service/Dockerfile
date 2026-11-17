# ---------- Etapa 1: build da aplicação ----------
FROM node:22-alpine AS build
WORKDIR /app

# Mesma versão do npm usada na máquina de desenvolvimento. O npm 10 que vem
# no node:22 discorda do npm 11 sobre o package-lock e faz o `npm ci` falhar.
RUN npm install -g npm@11.16.0

# Copia só os manifests primeiro para aproveitar o cache de camadas
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vazio: o front chama /api/... no mesmo domínio e o Nginx repassa para o back.
# Passe --build-arg VITE_API_URL=... só se a API estiver em outro endereço.
ARG VITE_API_URL=
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---------- Etapa 2: servir os arquivos estáticos ----------
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

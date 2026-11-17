# ---------- Etapa 1: compilação do TypeScript ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Manifests primeiro para aproveitar o cache de camadas
COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

# Compila os arquivos .ts para dist/ usando o tsconfig.json
RUN npm run build

# ---------- Etapa 2: imagem final de produção ----------
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app

# Só as dependências de produção (sem typescript, tsx e @types)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Pasta dos anexos, gravável pelo usuário node. No compose ela vira um volume
# para os arquivos sobreviverem quando o container é recriado
ENV UPLOADS_DIR=/app/uploads
RUN mkdir -p /app/uploads && chown node:node /app/uploads

# Roda sem root (o usuário "node" já existe na imagem oficial)
USER node

EXPOSE 3001

CMD ["node", "dist/index.js"]

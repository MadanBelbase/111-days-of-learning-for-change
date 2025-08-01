# ====== CLIENT SIDE =======
FROM node:20 AS client

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run dev


# ====== SERVER SIDE =======
FROM node:18 AS server

WORKDIR /app

# Copy and install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server source code
COPY server ./server


COPY --from=client /app/client/build ./server/public

EXPOSE 3000

CMD ["node", "server/index.js"]

# Build image
FROM node
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY ./prisma prisma
COPY ./.env .env
COPY ./lib lib
COPY ./src src
COPY ./tsconfig.json tsconfig.json
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
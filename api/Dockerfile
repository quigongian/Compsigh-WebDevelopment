FROM node:lts

WORKDIR /usr/src/app

COPY src ./src
COPY *.json .
COPY .env .

RUN npm install

RUN npx prisma generate

CMD npm run docker:dev
# RUN npm run build
# CMD  npm run docker:start
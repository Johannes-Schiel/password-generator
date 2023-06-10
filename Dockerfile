FROM node:12-alpine

WORKDIR /

COPY . .
RUN npm i
RUN npm run build

CMD ["npm", "run", "start"]
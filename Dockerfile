FROM node:12-alpine

WORKDIR /dist

COPY . .
RUN npm i
RUN npm run build

CMD ["npm", "run", "dev"]
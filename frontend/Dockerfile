FROM node:22-alpine

ENV PORT=5173

WORKDIR /CreatureFeatureApp

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run","dev","--", "--host" ]

EXPOSE 5173



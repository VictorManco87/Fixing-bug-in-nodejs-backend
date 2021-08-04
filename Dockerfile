FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
COPY . .
EXPOSE 8085:8085
CMD [ "node", "src/main.js" ]

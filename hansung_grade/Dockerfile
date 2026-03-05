FROM node:18.2.0

COPY . /app
WORKDIR /app

RUN yarn global add pm2
RUN yarn install

RUN npm run build
CMD ["pm2-runtime", "start", "npm", "--", "start"]

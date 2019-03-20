FROM node:11.5-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install
RUN npm install react-scripts@latest -g --silent
RUN npm react-scripts build --silent
CMD ["npm", "start"]
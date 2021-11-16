FROM node:14

WORKDIR /app
#Create app directory
COPY package.json /app
#Install app dependencies
RUN npm install
COPY . /app
CMD [ "npm", "start" ]



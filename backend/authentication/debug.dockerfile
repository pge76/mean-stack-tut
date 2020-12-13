FROM node:14

# disable ssl for dev environment
RUN npm set strict-ssl false

WORKDIR /authentication

COPY package.json ./

RUN npm install

COPY . .

# expose nodejs port
EXPOSE 3000

# start app in docker
CMD ["npm", "run", "start-dev"]

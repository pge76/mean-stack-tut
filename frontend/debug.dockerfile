# Create image based off of the official 12.8-alpine
FROM node:14

# disabling ssl for npm for Dev or if you are behind proxy
RUN npm set strict-ssl false

WORKDIR /frontend

# Copy dependency definitions
COPY package.json ./

RUN npm i

COPY . .

EXPOSE 4200 49153

CMD ["npm", "start"]
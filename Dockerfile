FROM node:10
WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 3000 
RUN npm install -g nodemon

## Extra fancy stuff
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then start express application
CMD /wait && nodemon index.js

FROM node:14
# where our app will be located in the image
RUN mkdir -p /app
WORKDIR /app
# move all source code
COPY . .
RUN npm config set registry https://registry.npmjs.com/
RUN npm install
RUN npm run build:production
ENV NODE_ENV=production
EXPOSE 8080
CMD [ "npm", "run", "start" ]
# nodejs image from dockerhub
FROM node:14

# The dir insinde the container the the app sits
WORKDIR /usr/src/app

# Copy the package.json and the package-lock.json to the workdir
COPY package*.json ./

# download all the dependencies
RUN npm ci --only=production

# copy all the other files in the workdir inside the conatiner
COPY . .

# expose the default port of the app
EXPOSE 3000

# start the app
CMD ["node", "index.js"]
# nodejs image from dockerhub
FROM node:alpine

# The dir insinde the container the the app sits
WORKDIR /usr/src/app

# Copy the package.json and the package-lock.json to the workdir
COPY package*.json ./

# download all the dependencies
RUN npm ci --only=production

# copy all the other files in the workdir inside the conatiner
COPY . .

ENV PORT 3000

# expose the default port of the app
EXPOSE ${PORT}

# use the user provided by the node image
USER node

# start the app
CMD ["node", "index.js"]
# tells docker to use the node version for the image 
FROM node:12

# tells docker to create this directory and use it as our working directory
WORKDIR /code

# environment variables will be accessed by any processors running inside the image
ENV PORT 3000

# copy package.json into /code for node_modules
COPY package.json /code

RUN yarn

COPY . /code

EXPOSE 3000

RUN yarn tsc

#exec form
CMD ["yarn","start"]

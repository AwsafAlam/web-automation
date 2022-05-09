FROM node:15 AS base
# Create app directory
WORKDIR /

# Install app dependencies
COPY package.json /

# RUN yarn global add nodemon
RUN npm install
COPY .  / 
RUN npm run build


FROM node:15 AS release
# Create app directory
WORKDIR /
# copy production node_modules
COPY --from=base /node_modules /node_modules
COPY --from=base package.json /
COPY --from=base /dist /dist

CMD ["npm", "run", "start"]

# FROM release AS dev

# COPY docker/wait-for.sh /
# RUN chmod +x /wait-for.sh
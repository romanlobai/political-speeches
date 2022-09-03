FROM node:18.8.0
WORKDIR /
COPY . .
RUN npm install
RUN npm run build
EXPOSE 80/tcp
CMD ["npm", "run", "start:prod"]
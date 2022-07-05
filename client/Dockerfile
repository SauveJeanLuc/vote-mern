FROM node:18-alpine as build

WORKDIR /usr/votting-app

COPY package.json .

RUN npm install

COPY . .

#For Ngninx

# EXPOSE 3000

# CMD ["npm", "run", "dev"]
RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/votting-app/dist /usr/share/nginx/html

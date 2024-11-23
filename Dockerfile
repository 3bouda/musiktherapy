# Build Stage
FROM node:16.20-alpine AS angular
WORKDIR /app
COPY package*.json /app/
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
COPY . /app/
RUN npm run build --prod

# Run Stage
FROM nginx:alpine
COPY --from=angular /app/dist/argon-dashboard-angular /usr/share/nginx/html

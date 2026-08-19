FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80, but map to 3000 in compose
EXPOSE 80

# Default command
CMD ["nginx", "-g", "daemon off;"]

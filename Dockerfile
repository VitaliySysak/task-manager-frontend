FROM node:20.11.1-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

###########################################

# COPY package*.json ./

# RUN npm install  

# COPY . .        

# RUN chown -R appuser:appgroup /app
# USER appuser

# EXPOSE 3000

# CMD ["npm", "run", "dev"]

###########################################

COPY package*.json ./

RUN npm install  

COPY .env.production .env.production
COPY . .

RUN npm run build

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

CMD ["npm", "run", "start"]


# ---------- Base ----------
FROM node:20-bullseye AS base
WORKDIR /app
COPY package*.json ./

# ---------- Development ----------
FROM base AS development
WORKDIR /app
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---------- Build ----------
FROM base AS build
WORKDIR /app
ENV NODE_ENV=production

ARG VITE_PUBLIC_API_URL
ARG VITE_PUBLIC_GOOGLE_AUTH_URL
ARG VITE_PUBLIC_GOOGLE_CALENDAR_URL

ENV VITE_PUBLIC_API_URL=$VITE_PUBLIC_API_URL
ENV VITE_PUBLIC_GOOGLE_AUTH_URL=$VITE_PUBLIC_GOOGLE_AUTH_URL
ENV VITE_PUBLIC_GOOGLE_CALENDAR_URL=$VITE_PUBLIC_GOOGLE_CALENDAR_URL

COPY . .
RUN npm install -g typescript
RUN npm install
RUN npm run build

# ---------- Production ----------
FROM node:20-bullseye AS production
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g serve
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

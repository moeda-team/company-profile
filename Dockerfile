FROM node:22-alpine AS build
RUN corepack enable && corepack prepare pnpm@11.0.6 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG VITE_API_BASE_URL
RUN test -n "$VITE_API_BASE_URL" && pnpm build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN nginx -t
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

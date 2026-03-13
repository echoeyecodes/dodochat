FROM oven/bun:alpine AS base
WORKDIR /app

FROM base AS builder

RUN apk add --no-cache python3 make g++ pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev jpeg-dev

COPY package.json bun.lock ./
COPY server/package.json server/
COPY website/package.json website/

RUN bun install

COPY . .

RUN bun run build

FROM base AS runner

WORKDIR /app

RUN apk add --no-cache pixman cairo pango libjpeg-turbo giflib

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 4173 3001

CMD ["bun", "run", "start"]

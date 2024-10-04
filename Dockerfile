FROM node:20-alpine3.20 AS base

WORKDIR /home/cards

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack prepare pnpm@9 --activate

COPY pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm fetch \
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

FROM base AS prod-deps

COPY package.json ./

RUN pnpm clean
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install \
    --prefer-offline \
    --frozen-lockfile \
    --prod \
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

FROM base AS builder   

COPY package.json tsconfig.json vite.config.ts postcss.config.js tailwind.config.ts ./
COPY app ./app
COPY public ./public

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install \
    --offline \
    --frozen-lockfile
RUN pnpm build

FROM node:20-alpine3.20 AS runner

WORKDIR /home/cards

COPY --from=prod-deps /home/cards/node_modules ./node_modules
COPY --from=prod-deps /home/cards/package.json ./package.json

COPY --from=builder /home/cards/build ./build
COPY --from=builder /home/cards/public ./public

CMD ["sh", "./node_modules/.bin/remix-serve", "./build/server/index.js"]

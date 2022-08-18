FROM harbor.zzwb.cc:20280/proxy/library/node:lts-alpine as deps

WORKDIR /usr/src/
USER root

# 获取依赖
COPY package.json ./
COPY package-lock.json ./
RUN npm install --registry=https://registry.npmmirror.com

# build dist
FROM deps as builder
COPY ./ ./
ARG ENV=develop
RUN npm run build:${ENV}

# nginx镜像
FROM harbor.zzwb.cc:20280/proxy/library/nginx:1.17.8-alpine

RUN set -ex \
  && sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
  && apk update \
  && apk add --no-cache su-exec curl

COPY --from=builder /usr/src/dist /usr/share/nginx/html
COPY docker/default.conf /etc/nginx/conf.d/

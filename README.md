# Install Redis on macOS

https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/

## run redis on port 8080

`redis-server --port 8080`

## Connect to Redis use cli
```sh
MAC ~ % redis-cli -p 8080
127.0.0.1:8080> set myval 1
OK
127.0.0.1:8080> get myval
"1"
```

## Connect to Redis use node package ioredis
https://www.npmjs.com/package/ioredis

# Upstash Redis Service
## Create Redis Database
1. login
2. click create database

## 清空 database
到 upstash dashboard 點擊 cli 輸入 `flushall` 回車
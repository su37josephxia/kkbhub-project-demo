# Project Demo

## Docker部署
### 部署
```bash
docker-compose up -d
```

### 强制重新部署
```bash
docker-compose up --force-recreate --build
```

### 初始化数据
```
./dump/restore.sh
# 或
docker-compose exec mongo mongorestore --db kkbhub ./kkbhub
```
### 启动本地Mongo
```bash
docker-compose up mongo mongo-express
```

### 备份数据
```
docker-compose exec mongo mongodump --db kkbhub --out ../dump

```
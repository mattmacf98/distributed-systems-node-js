docker run -it --rm --name distnode-redis -p 6379:6379 redis:6.0.5-alpine

docker exec -it distnode-redis redis-cli

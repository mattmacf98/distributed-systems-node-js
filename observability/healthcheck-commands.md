docker run --rm -p 5432:5432 -e POSTGRES_PASSWORD=test -e POSTGRES_USER=user -e POSTGRES_DB=tmp postgres:12.3

docker run --rm -p 6379:6379 redis:6.0

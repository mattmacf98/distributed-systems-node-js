docker run --name distnode-postgres -it --rm -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=dbconn postgres:12.3

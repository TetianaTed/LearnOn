docker run -d -p 5432:5432 --name postgres-database -e POSTGRES_USER=sa -e POSTGRES_PASSWORD=sa -e PGDATA=/var/lib/postgresql/data/pgdata -v postgres-volume:/var/lib/postgresql/data postgres:15.0
docker ps

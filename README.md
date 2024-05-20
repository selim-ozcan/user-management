Create a postgres container with the following command:
docker run --name user-management -e POSTGRES_USER=root -e POSTGRES_DB=user-management -e POSTGRES_PASSWORD=root -d -p 5432:5432 postgres

For test purposes, there will be a seeded admin user available with the credentials;
username: admin
password: Pass123?

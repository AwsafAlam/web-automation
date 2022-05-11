- [Database initialization](#database-initialization)
- [Database connection](#database-connection)
- [Dev & Prod Environments](#dev--prod-environments)

## Database initialization

- we initialize a MySQL instance in AWS RDS using the default VPC.
- We use the free tier to create a new database

![Create](diagrams/db-create.png?raw=true 'Create DB')

We assign the name `web-automation` for connecting to the db

![Db Name assigned](diagrams/db-name.png?raw=true 'Db Name assigned')

We use the default VPC provided by AWS. For production applications, a custom VPC configuration should be used so we can make the application more secured.

![Default VPC](diagrams/db-vpc.png?raw=true 'Default VPC')

Finally we have an instance created.

![Instance](diagrams/db-instance.png?raw=true 'Instance')

## Database connection

We use a tool called `Sequel Ace` to test our database connection. This is a very good tool for visualizing all the data, schemas and relationships. we can also use this to run queries manually.

![Connection](diagrams/db-connect.png?raw=true 'Connection')

In the server we use `sequelize` to create the connection, and sync the models.

## Dev & Prod Environments

We use two separate database environments for development and deployment. These are defined in the server `.env` file.

```bash
DB_HOST=
DB_NAME
DB_USER=
DB_PASS=
DB_PORT=
```

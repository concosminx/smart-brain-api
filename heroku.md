# Heroku deploy commands

- install `heroku` cli
- `heroku login` from command line 
- create a new app with `heroku create`
- use `heroku open` to open the app
- see git remotes `git remote -v`
- push the modifications to heroku `git push heroku master`
- view logs with `heroku logs --tail`
- create and link a datastore (postgreSQL) to current application from the Heroku Dashboard
- see database info with `heroku pg:info`
- add psql to path (windows)
- run psql on heroku with `heroky pg:psql`
- create the database structure
- check the database url: 

```js
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
});

```
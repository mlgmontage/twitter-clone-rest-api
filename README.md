## Twitter clone REST API backend

### Frameworks && libraries

- express
- knex
- joi
- jsonwebtoken
- sqlite3
- volleyball
- dotenv

### API

#### Tweets

- `GET: /api/routes/tweets` - list of tweets
- `GET: /api/routes/tweets/{userid}` - list of tweets that created by user
- `POST: /api/routes/tweets/create` - create tweet

#### Comments

- `GET: /api/routes/comments/{tweetid}` - list of comments of that tweet
- `POST: /api/routes/comments/create` - create comment

#### Users

- `GET: /api/routes/users/` - list of users
- `POST: /api/routes/users/login` - login
- `POST: /api/routes/users/registee` - register

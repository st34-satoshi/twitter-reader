# twitter-reader
Read Tweets

## Prepare
1. `mv app/secret.py.tmp app/secret.py`
2. set your token in `app/secret.py`


## Run
1. `docker-compose up --build`
2. open `http://localhost:3001/twitter`

### Production
- `docker-compose -f docker-compose.production.yml up -d --build`
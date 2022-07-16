import tweepy
from secret import BEARER_TOKEN 

auth = tweepy.OAuth2BearerHandler(BEARER_TOKEN)
api = tweepy.API(auth)

"""
return {tweet_id: {text: text, user: user name, user_screen_name: user_screen_name}}
"""
def search_tweet(query):
    response = {}
    for status in api.search_tweets(q=query,count=100):
        # see: [Search Tweets: Standard v1.1](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets)
        # print(status.user.id)
        # print(status.user.name)
        # print(status.text)
        # print(status.id)
        # print(status.created_at)
        # print(status.id_str)

        response[status.id] = {'text': status.text, 'user': status.user.name, 'user_screen_name': status.user.screen_name}
    return response

if __name__ == '__main__':
    search_tweet("hello")
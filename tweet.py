import tweepy
from secret import BEARER_TOKEN 

auth = tweepy.OAuth2BearerHandler(BEARER_TOKEN)
api = tweepy.API(auth)

"""
return {tweet_id: {text: text, user: user name}}
"""
def search_tweet(query):
    response = {}
    for status in api.search_tweets(q=query,count=100):
        # print(status.user.id)
        # print(status.user.name)
        # print(status.text)
        # print(status.id)
        # print(status.created_at)
        # print(status.id_str)

        response[status.id] = {'text': status.text, 'user': status.user.name}
    return response

if __name__ == '__main__':
    search_tweet("hello")
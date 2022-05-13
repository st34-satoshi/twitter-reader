from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from tweet import search_tweet

app = FastAPI()

app.mount("/public", StaticFiles(directory="public"), name="public")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/twitter")
def twitter():
    return FileResponse('./public/twitter.html')

@app.get("/tweet")
def tweet():
    return search_tweet()
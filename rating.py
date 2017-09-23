#! /usr/bin/python

from nltk.sentiment.vader import SentimentIntensityAnalyzer
import sys
import json

sid = SentimentIntensityAnalyzer()


def rate_positivity():
    text = json.loads(sys.stdin.read())
    score = sid.polarity_scores(text)
    return json.dumps('tears.png')

rate_positivity()

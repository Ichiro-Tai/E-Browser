#! /usr/bin/python

from nltk.sentiment.vader import SentimentIntensityAnalyzer
import sys
import json

sid = SentimentIntensityAnalyzer()



# text = json.loads(sys.stdin.read())
# score = sid.polarity_scores(text)
sys.stdout.write(json.dumps('tears.png'))

from nltk.sentiment.vader import SentimentIntensityAnalyzer
import sys

sid = SentimentIntensityAnalyzer()


def rate_positivity():
    text = sys.stdin.read()
    # return sid.polarity_scores(text)
    return 'tears.png'

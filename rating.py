from nltk.sentiment.vader import SentimentIntensityAnalyzer

sid = SentimentIntensityAnalyzer()


def rate_positivity(text):
    return sid.polarity_scores(text)

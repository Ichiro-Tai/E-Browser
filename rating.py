#! /usr/local/bin/python2 -u

from nltk.sentiment.vader import SentimentIntensityAnalyzer
import sys
import json
import struct

sys.stderr = open('/tmp/test', 'wb')

sid = SentimentIntensityAnalyzer()


def getMessage():
    rawLength = sys.stdin.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.read(messageLength)
    return json.loads(message)


def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent)
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}


def sendMessage(encodedMessage):
    sys.stdout.write(encodedMessage['length'])
    sys.stdout.write(encodedMessage['content'])
    sys.stdout.flush()


def pic_polarity(polarity):
    if polarity >= 0.5:
        result = 'veryPositive.png'
    elif polarity > 0:
        result = 'neutral.png'
    elif polarity > -0.3:
        result = 'negative.png'
    else:
        result = 'veryNegative.png'

    return result


def pic_objectivity(objectivity):
    if objectivity == 'obj':
        return 'objective.png'
    else:
        return 'subjective.png'


while True:
    receivedMessage = getMessage()
    scores = []
    for line in receivedMessage[0].splitlines():
        scores.append(sid.polarity_scores(line)['compound'])
    sys.stderr.write(str(scores) + "\n")
    average = float(sum(scores))/len(scores)
    sys.stderr.write(str(average))
    sendMessage(encodeMessage(pic_polarity(average)))

def emop(polarity):
    if polarity >= 0.5:
        result = 'veryPositive.png'
    elif polarity < 0.5 and polarity >0:
        result = 'neutral.png'
    elif polarity <= 0 and polarity>-0.3:
        result = 'negative.png'
    else:
        result = 'veryNegative.png'

    return result


def emos(objectivity):
    if objectivity == 'obj':
        return 'objective.png'
    else:
        return 'subjective.png'


print(emop(0.7))
print(emos('subjective'))

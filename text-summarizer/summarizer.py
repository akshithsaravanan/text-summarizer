import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize

nltk.download('punkt')
nltk.download('stopwords')


def summarize_text(text):
    stopWords = set(stopwords.words("english"))
    words = word_tokenize(text)

    freqTable = {}
    for word in words:
        word = word.lower()
        if word in stopWords:
            continue
        freqTable[word] = freqTable.get(word, 0) + 1

    sentences = sent_tokenize(text)
    sentenceValue = {}

    for sentence in sentences:
        for word, freq in freqTable.items():
            if word in sentence.lower():
                sentenceValue[sentence] = sentenceValue.get(sentence, 0) + freq

    if not sentenceValue:
        return "No meaningful content to summarize."

    average = sum(sentenceValue.values()) / len(sentenceValue)
    summary = ' '.join([sentence for sentence in sentences if sentenceValue.get(sentence, 0) >= average])

    return summary if summary.strip() else "Summary too short or not enough detail. Try longer text."

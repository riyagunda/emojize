from keras.models import load_model
import numpy as np
from profanity_check import predict_prob
from keras.preprocessing.sequence import pad_sequences

model = load_model('LSTM.h5')
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def run(text):
    text = text.lower()
    value = tokenizer.texts_to_sequences([text])
    value = pad_sequences(value, maxlen=50, dtype='int32', value=0)
    sentiment = model.predict(value, batch_size=1,verbose = 0)
    result = [0,0,0] #positive,negative,profanity
    if(np.argmax(sentiment) == 1):
        result[0] = 1
    elif (np.argmax(sentiment) == 0):
        result[1] = 1
    if (predict_prob([text])>0.6):
        result[2] = 1
    return result


    
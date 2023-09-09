import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tensorflow

from sklearn.feature_extraction.text import CountVectorizer
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Embedding, LSTM, SpatialDropout1D, Input, Dropout, Bidirectional
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelBinarizer
from keras.utils import to_categorical
import re
import os


data = pd.read_csv(os.path.join(os.getcwd(),"data/train.csv"),encoding='latin-1')
data.columns = ["polarity","id","date","query","user","text"]

stopwords = [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", 
             "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during",
             "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", 
             "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into",
             "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or",
             "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", 
             "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's",
             "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up",
             "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's",
             "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've",
             "your", "yours", "yourself", "yourselves" ]
data['text'] = data['text'].apply(lambda x: x.lower())
data['text'] = data['text'].apply(lambda x: " ".join([word for word in x.split() if word[0]!='@']))
data['text'] = data['text'].apply(lambda x: " ".join([word for word in x.split() if word not in (stopwords)]))

max_features = 3000
max_len = 50
tokenizer = Tokenizer(num_words=max_features, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~', split=' ')
tokenizer.fit_on_texts(data['text'].values)
X = tokenizer.texts_to_sequences(data['text'].values)
X = pad_sequences(X, maxlen = max_len)

def read_glove_vector(glove_vec):
    with open(glove_vec, 'r', encoding='UTF-8') as f:
        word_to_vec_map = {}
        for line in f:
            w_line = line.split()
            word_to_vec_map[w_line[0]] = np.array(w_line[1:], dtype=np.float64)
    return word_to_vec_map

word_to_vec_map = read_glove_vector("glove.twitter.27B.50d.txt")

emb_matrix = np.zeros((len(tokenizer.word_index), 50))
for word, index in tokenizer.word_index.items():
    embedding_vector = word_to_vec_map.get(word)
    if embedding_vector is not None:
        emb_matrix[index, :] = embedding_vector
        
embedding_layer = Embedding(input_dim=(len(tokenizer.word_index)), output_dim=50, 
                                input_length=max_len, weights = [emb_matrix], trainable=False)


embed_dim = 128
lstm_out = 196
model = Sequential()

# forward_layer = LSTM(lstm_out, return_sequences=True)
# backward_layer = LSTM(lstm_out, activation='relu', return_sequences=True,
#                       go_backwards=True)
# model.add(Bidirectional(forward_layer, backward_layer=backward_layer))
# model.add(SpatialDropout1D(0.2))
model.add(LSTM(lstm_out, dropout=0.2, recurrent_dropout=0.2))
model.add(Dense(32,activation = 'relu'))
model.add(Dense(2,activation = 'sigmoid'))
model.compile(loss = 'categorical_crossentropy', optimizer='adam',metrics = ['accuracy'])


print(model.summary())

Y = pd.get_dummies(data['polarity']).values
smallsize = 3000
X_small = X[np.random.choice(X.shape[0], smallsize, replace=False)]
Y_small = Y[np.random.choice(Y.shape[0], smallsize, replace=False)]
X_train, X_test, Y_train, Y_test = train_test_split(X_small,Y_small, test_size = 0.33, random_state = 42)
batch_size = 64
model.fit(X_train, Y_train, epochs = 32, batch_size=batch_size, verbose = 2)


validation_size = 1000
def chooserandom(matrix, n):
    return matrix[np.random.choice(matrix.shape[0],n,replace=False)]
# X_validate = chooserandom(X_test,validation_size)
# Y_validate = chooserandom(X_test,validation_size)
X_validate = X_test[-validation_size:]
Y_validate = Y_test[-validation_size:]

score,acc = model.evaluate(X_validate, Y_validate, verbose = 2, batch_size = batch_size)
print("score: %.2f" % (score))
print("acc: %.2f" % (acc))

from profanity_check import predict, predict_prob
def maketest(prompt):
    testvalue = prompt.lower()
    sometestthing = tokenizer.texts_to_sequences([testvalue])
    sometestthing = pad_sequences(sometestthing, maxlen=max_len, dtype='int32', value=0)
    sometestthing.shape
    sentiment = model.predict(sometestthing, batch_size=1,verbose = 0)
    if(np.argmax(sentiment) == 0):
        result = "negative"
    elif (np.argmax(sentiment) == 1):
        result = "positive"
    if (predict_prob([testvalue])>0.6):
        result+=" and possible profanity"
    print(result)
    
    
prompt = input("Test model? (y/n)").lower()
if prompt=="y":
    while prompt!="q":
        prompt = input("Input your prompt (q to quit):")
        maketest(prompt)
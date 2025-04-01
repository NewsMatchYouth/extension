from flask import Flask, request, jsonify
import pickle
from pyngrok import ngrok

app = Flask(__name__)

# モデルとTF-IDFベクトライザーの読み込み
model = pickle.load(open('Model.pkl', 'rb'))
tfidf_vectorizer = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    # JSONからテキストを取得
    data = request.get_json()
    article = data.get("text")
    
    # 入力記事のベクトル化と予測
    article_vectorized = tfidf_vectorizer.transform([article])
    prediction = model.predict(article_vectorized)[0]
    
    # 予測結果の出力（1: Fake, 0: True と仮定）
    output = "Fake" if prediction == 1 else "True"
    return jsonify({"result": output})

if __name__ == "__main__":
    # ngrokでポート5000を外部公開（開発用）
    public_url = ngrok.connect(5000)
    print(f" * ngrok tunnel: {public_url}")
    
    app.run()
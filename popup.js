document.addEventListener('DOMContentLoaded', () => {
  // 多言語対応：テキストを読み込む
  document.getElementById('heading').textContent = chrome.i18n.getMessage('heading');
  document.getElementById('check').textContent = chrome.i18n.getMessage('button');
  document.getElementById('article').placeholder = chrome.i18n.getMessage('placeholder');
  document.title = chrome.i18n.getMessage('appName');

  // 判定ボタンのイベント処理
  document.getElementById("check").addEventListener("click", async () => {
    const text = document.getElementById("article").value;

    try {
      const response = await fetch("https://extension-5qk9.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      // 結果の表示（ここは固定文でもOK、翻訳するなら i18n で）
      document.getElementById("result").textContent = chrome.i18n.getMessage('resultPrefix') + data.result;

    } catch (error) {
      console.error("エラー:", error);
      document.getElementById("result").textContent = chrome.i18n.getMessage('errorMessage');
    }
  });
});
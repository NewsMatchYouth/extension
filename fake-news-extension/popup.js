document.getElementById("check").addEventListener("click", async () => {
    const text = document.getElementById("article").value;
    
    try {
      const response = await fetch("https://extension-5qk9.onrender.com/predict", {  // ※ここを実際のAPI URLに変更
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      document.getElementById("result").textContent = "判定結果: " + data.result;
    } catch (error) {
      console.error("エラー:", error);
      document.getElementById("result").textContent = "エラーが発生しました。";
    }
  });
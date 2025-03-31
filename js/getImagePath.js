// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyCZ-flRR09CMfA_TafU5hZQCBFqT-QqT3w",
    authDomain: "hachu-9c262.firebaseapp.com",
    databaseURL: "https://hachu-9c262-default-rtdb.firebaseio.com",
    projectId: "hachu-9c262",
    storageBucket: "hachu-9c262.firebasestorage.app",
    messagingSenderId: "912826483273",
    appId: "1:912826483273:web:51cfdfbdf1352bf6f77598",
    measurementId: "G-73L6KCS9VP"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

/**
 * 從 localStorage 取得 usedImages 物件
 * 如果沒有則回傳空物件
 */
function getUsedImages() {
  let used = localStorage.getItem("usedImages");
  return used ? JSON.parse(used) : {};
}

/**
 * 將 usedImages 物件存回 localStorage
 */
function saveUsedImages(usedImages) {
  localStorage.setItem("usedImages", JSON.stringify(usedImages));
}

/**
 * 根據使用者所選的過敏原，從 Firebase Storage 中取得對應圖片的下載 URL
 * 並確保同一組合不重複取得相同圖片（跨頁面保持狀態）
 * 
 * @param {Array} allergens - 過敏原陣列 (例如: ["pollen", "drug"])
 * @param {Function} callback - 取得 URL 後呼叫的回呼函式，格式：callback(url)
 */
function fetchMonsterImagePath(allergens, callback) {
  // 檢查參數是否正確
  if (!Array.isArray(allergens) || allergens.length === 0) {
      callback(null);
      return;
  }

  // 為避免順序不同造成組合鍵不一致，先進行字母排序
  const sortedAllergens = allergens.slice().sort();
  const combination = sortedAllergens.join("_");

  // 從 localStorage 取得已使用圖片的索引
  let usedImages = getUsedImages();
  if (!usedImages[combination]) {
      usedImages[combination] = [];
  }

  // 取得該組合資料夾的參照
  const folderRef = storage.ref(`monsterImg/output_images/${combination}`);
  
  // 列出資料夾下所有檔案
  folderRef.listAll().then(res => {
      const items = res.items;
      if (items.length === 0) {
          console.error("該組合沒有圖片");
          callback(null);
          return;
      }

      // 過濾出未被使用的圖片 (依據 localStorage 中保存的索引)
      const unusedItems = items.filter((item, index) => !usedImages[combination].includes(index));

      let chosenIndex;
      if (unusedItems.length === 0) {
          // 若全部圖片已被使用，則重置該組合的 usedImages，再隨機選一張
          usedImages[combination] = [];
          chosenIndex = Math.floor(Math.random() * items.length);
      } else {
          // 隨機選取一個未使用的圖片
          const randomUnusedIndex = Math.floor(Math.random() * unusedItems.length);
          const chosenItem = unusedItems[randomUnusedIndex];
          // 取得該項目在 items 陣列中的原始索引
          chosenIndex = items.indexOf(chosenItem);
      }
      // 標記選中的索引為已使用
      usedImages[combination].push(chosenIndex);
      // 將更新後的 usedImages 存回 localStorage
      saveUsedImages(usedImages);
      
      // 取得選中圖片的下載 URL
      items[chosenIndex].getDownloadURL().then(url => {
          console.log("Used images:", usedImages);
          callback(url);
      }).catch(error => {
          console.error("取得圖片 URL 失敗：", error);
          callback(null);
      });
  }).catch(error => {
      console.error("列出檔案失敗：", error);
      callback(null);
  });
}
// firebaseHelper.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {getDatabase, ref, push, set, get} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  listAll,
  uploadString,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);

/**
 * 上傳卡牌圖片到 Firebase Storage，回傳下載 URL
 * @param {string} dataUrl - base64 圖片
 * @param {string} fileName - 檔名（建議格式：username_時間.png）
 * @returns {Promise<string>} 圖片下載 URL
 */
export async function uploadCardImage(dataUrl, fileName) {
  const cardRef = storageRef(storage, `cards/${fileName}`);
  await uploadString(cardRef, dataUrl, "data_url");
  const downloadURL = await getDownloadURL(cardRef);
  console.log("圖片已上傳至 Firebase Storage：", downloadURL);
  return downloadURL;
}

/**
 * 儲存卡牌資料至 Firebase Realtime Database
 * @param {object} quizResults - 包含 userName, allergens, card_url 等
 * @param {string} cardUrl - 對應圖片的 Firebase Storage URL
 */
export async function saveUserData(quizResults, cardUrl) {
  const resultRef = ref(db, "test_results");
  const newEntry = push(resultRef);
  const data = {
    userName: quizResults.userName,
    allergens: quizResults.allergens,
    cardUrl: cardUrl,
    timestamp: Date.now()
  };

  await set(newEntry, data);
  console.log("使用者資料已寫入 Firebase Realtime Database：", data);
}

/**
 * 取得怪物圖片 URL，避免同組合重複（localStorage 控制）
 */
export function fetchMonsterImagePath(allergens, callback) {
  if (!Array.isArray(allergens) || allergens.length === 0) {
    callback(null);
    return;
  }

  const sortedAllergens = allergens.slice().sort();
  const combination = sortedAllergens.join("_");

  let usedImages = getUsedImages();
  if (!usedImages[combination]) {
    usedImages[combination] = [];
  }

  const folder = storageRef(storage, `monsterImg/output_images/${combination}`);
  listAll(folder)
    .then(res => {
      const items = res.items;
      if (items.length === 0) {
        console.warn(`該組合沒有圖片：${combination}`);
        callback(null);
        return;
      }

      const unusedItems = items.filter((_, idx) => !usedImages[combination].includes(idx));
      let chosenIndex;

      if (unusedItems.length === 0) {
        usedImages[combination] = [];
        chosenIndex = Math.floor(Math.random() * items.length);
      } else {
        const randUnused = Math.floor(Math.random() * unusedItems.length);
        const chosenItem = unusedItems[randUnused];
        chosenIndex = items.indexOf(chosenItem);
      }

      usedImages[combination].push(chosenIndex);
      saveUsedImages(usedImages);

      return getDownloadURL(items[chosenIndex]).then(url => {
        console.log("怪物圖片 URL：", url);
        callback(url);
      });
    })
    .catch(err => {
      console.error("❌ 讀取 Storage 圖片失敗：", err);
      callback(null);
    });
}

// localStorage 控制重複圖片的輔助函數
function getUsedImages() {
  let used = localStorage.getItem("usedImages");
  return used ? JSON.parse(used) : {};
}

function saveUsedImages(usedImages) {
  localStorage.setItem("usedImages", JSON.stringify(usedImages));
}

/**
 * 讀取卡牌資料，支援搜尋與分頁
 * @param {number} page - 頁碼（從 1 開始）
 * @param {string} search - 使用者名稱關鍵字
 * @param {number} limit - 每頁筆數
 * @returns {Promise<{cards: Array, page: number, totalPages: number}>}
 */
export async function loadCards(page = 1, search = "", limit = 12) {
  const snapshot = await get(ref(db, "test_results"));
  const rawData = snapshot.val();

  if (!rawData) {
    return { cards: [], page: 1, totalPages: 1 };
  }

  const dataArray = Object.values(rawData).sort((a, b) => b.timestamp - a.timestamp);

  const filtered = search
    ? dataArray.filter(item =>
        item.userName?.toLowerCase().includes(search.toLowerCase())
      )
    : dataArray;

  const totalPages = Math.ceil(filtered.length / limit);
  const offset = (page - 1) * limit;
  const paginated = filtered.slice(offset, offset + limit);

  return {
    cards: paginated,
    page: page,
    totalPages: totalPages
  };
}
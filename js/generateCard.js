import {fetchMonsterImagePath,  uploadCardImage, saveUserData } from "./firebaseHelper.js";

document.addEventListener("DOMContentLoaded", function() {
    const storedData = localStorage.getItem("quizResults");

    if (storedData) {
        const quizResults = JSON.parse(storedData);
        console.log(quizResults);

        fetchMonsterImagePath(quizResults.allergens, function(url) {
            if (url) {
                // 更新卡牌內容，並傳入怪物圖片 URL
                updateCard(quizResults, url);
                
                // 透過 monsterImg 的 onload 事件，確保圖片載入完成後再匯出卡牌
                const monsterImg = document.getElementById("monsterImg");
                monsterImg.onload = function() {
                    exportCard();
                };
                // 如果圖片已經快取載入完成 (complete 為 true)，直接執行匯出
                if (monsterImg.complete) {
                    exportCard();
                }
            } else {
                console.error("無法取得怪物圖片 URL");
            }
        });
    }
});


/**
 * 組合卡牌
 * @param {*} data 
 */
function updateCard(data, monsterImgUrl) {
    // 設定名稱
    document.getElementById('userName').textContent = data.userName

    // 設定背景顏色
    const bgColor = getRandomBgColor();
    const bgContainer = document.querySelector(".card-main");
    bgContainer.classList.remove("bg-red", "bg-blue", "bg-green");
    bgContainer.classList.add(bgColor);

    // 設定稀有度
    const starContainer = document.querySelector("#starContainer");
    starContainer.innerHTML = ""; // 清空舊的星星
    const maxStars = 6;
    const starCount = data.allergens.length; // 過敏原數量
    const grayStars = maxStars - starCount;

    for (let i = 0; i < grayStars; i++) {
        const grayStarImg = document.createElement("img");
        grayStarImg.src = "/image/card/level_white.png";
        starContainer.appendChild(grayStarImg);
    }

    for (let i = 0; i < starCount; i++) {
        const starImg = document.createElement("img");
        starImg.src = mapBgToStarColor(bgColor);
        starContainer.appendChild(starImg);
    }


    // 設定攻擊力
    const attackImg = document.getElementById("attackImg");
    attackImg.src = mapSeverityToImage(data.severity);
    
    // 設定出沒地點(過敏原)
    const locationList = document.querySelector("#location");
    locationList.innerHTML = ""; // 清空原本的出沒地點
    data.allergens.forEach(allergen => {
        let locationText = mapAllergenToLocation(allergen);
        const li = document.createElement("li");
        li.textContent = locationText;
        locationList.appendChild(li);
    });

    // 設定怪物圖片
    const monsterImg = document.getElementById("monsterImg");
    monsterImg.src = monsterImgUrl;
    monsterImg.style.display = "block"; // 如原本隱藏的話
}

/**
 * 依據過敏原對應怪物的出沒地點
 * @param {*} allergen 
 * @returns 
 */
function mapAllergenToLocation(allergen) {
    const locations = {
        "dust": "沒打掃的房間",
        "pollen": "前男友送的花",
        "drug": "流感疫苗",
        "food": "菜市場",
        "metal": "媽媽的項鍊",
        "animal": "毛小孩"
    };
    return locations[allergen] || "未知地點";
}


/**
 * 依據過敏嚴重程度對應攻擊力
 * @param {*} severity 
 * @returns 
 */
function mapSeverityToImage(severity) {
    const classMapping = {
        "輕微": "/image/card/attack_1.png",
        "中等": "/image/card/attack_2.png",
        "嚴重": "/image/card/attack_3.png",
        "非常嚴重": "/image/card/attack_4.png",
        "極度嚴重": "/image/card/attack_5.png"
    };
    return classMapping[severity] || "";
}


/**
 * 隨機選擇背景顏色
 * @returns 
 */
function getRandomBgColor() {
    const colors = ["bg-red", "bg-blue", "bg-green"];
    return colors[Math.floor(Math.random() * colors.length)];
}


/**
 * 根據背景顏色對應星星顏色
 * @param {*} bgColor 
 * @returns 
 */
function mapBgToStarColor(bgColor) {
    const colorMapping = {
        "bg-red": "/image/card/level_blue.png",
        "bg-blue": "/image/card/level_green.png",
        "bg-green": "/image/card/level_red.png"
    };
    return colorMapping[bgColor] || "/image/card/level_white.png";
}

/**
 * 匯出卡片png檔並儲存至Firebase Storage
 */
function exportCard() {
    const card = document.getElementById('monsterCard');
    const userName = document.getElementById('userName').textContent || "unknown";
    html2canvas(card, {
        backgroundColor: null,
        dpi: 300,
        useCORS: true
    }).then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        const fileName = `${userName}_${Date.now()}_monsterCard.png`;

        uploadCardImage(dataUrl, fileName)
            .then(downloadURL => {
                const quizResults = JSON.parse(localStorage.getItem("quizResults"));
        
                // 儲存至 Firebase Realtime Database
                saveUserData(quizResults, downloadURL);
        
                // 儲存至 localStorage
                localStorage.setItem('cardUrl', downloadURL);  
       
                // 跳轉展示頁面
                setTimeout(() => {
                    window.location.href = 'MonsterCardShow.html?cardUrl=' + encodeURIComponent(downloadURL);
                }, 5000);
            })
            .catch(error => {
                console.error("上傳卡牌圖片失敗：", error);
            });
    });
}
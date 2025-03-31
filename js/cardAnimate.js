document.addEventListener("DOMContentLoaded", function(){
    const cardUrl = getQueryParam("cardUrl");
    const card = document.querySelector(".card");
    const cardFront = document.querySelector(".card-front");
    if(cardUrl) {
        const img = new Image();
        img.onload = function() {
            cardFront.style.backgroundImage = `url(${cardUrl})`;
            // 撥放入場動畫，加入 animate 類別
            card.classList.add("animate");
        };
        img.src = cardUrl;     
        const delay = 30000;
        setTimeout(function () {
            window.location.href = "Test.html";
        }, delay);
    } else {
        console.error("找不到 cardUrl");
    }

    // 互動控制旗標，初始為 false
    let interactionEnabled = false;

    // 當最終動畫 autoRotate 結束後移除 .animate，並加入 .interactive
    card.addEventListener("animationend", function(e) {
        if(e.animationName === "autoRotate") {
            // 移除 .animate，解除 CSS 動畫對 transform 與 opacity 的干擾
            card.classList.remove("animate");
            // 手動設定 opacity 為 1（避免預設 opacity:0）
            card.style.opacity = "1";
            // 設定基底狀態為 rotate(0deg)，避免預設的 rotate(20deg)
            card.style.transform = "rotate(0deg)";
            interactionEnabled = true;
            // 加入 interactive 類別，供後續互動時使用
            card.classList.add("interactive");
        }
    });

    // 若頁面中沒有 <style class="hover"> 標籤，則動態新增一個，供更新偽元素樣式使用
    if(!$("style.hover").length){
        $("head").append('<style class="hover"></style>');
    }

    var timeoutId;
    var $cards = $(".card");
    var $style = $(".hover");

    $cards.on("mousemove touchmove", function(e) {
        if(!interactionEnabled) return; // 動畫未結束前不啟用互動

        // 取得滑鼠/觸控在卡牌上的位置
        let posX, posY;
        if(e.type === "touchmove") {
            var rect = this.getBoundingClientRect();
            posX = e.touches[0].clientX - rect.left;
            posY = e.touches[0].clientY - rect.top;
            e.preventDefault();
        } else {
            posX = e.offsetX;
            posY = e.offsetY;
        }
        var $card = $(this);
        var cardWidth = $card.width();
        var cardHeight = $card.height();
        // 計算相對位置百分比
        var px = Math.abs(Math.floor((100 / cardWidth) * posX) - 100);
        var py = Math.abs(Math.floor((100 / cardHeight) * posY) - 100);
        var pa = (50 - px) + (50 - py);
        // 計算偽元素背景位置（gradient 與 sparkles 效果）
        var lp = 50 + (px - 50) / 1.5;
        var tp = 50 + (py - 50) / 1.5;
        var px_spark = 50 + (px - 50) / 7;
        var py_spark = 50 + (py - 50) / 7;
        var p_opc = 20 + (Math.abs(pa) * 1.5);
        // 計算卡牌互動旋轉角度（X 軸與 Y 軸）
        var ty = ((tp - 50) / 2) * -1;
        var tx = ((lp - 50) / 1.5) * 0.5;
        var tf = `rotateX(${ty}deg) rotateY(${tx}deg)`;
        $card.css("transform", tf);
        // 利用動態 style 規則更新偽元素背景，並移除原動畫設定
        var styleContent = `
          .card.interactive .card-front::before { background-position: ${lp}% ${tp}%; animation: none !important; }
          .card.interactive .card-front::after { background-position: ${px_spark}% ${py_spark}%; opacity: ${p_opc / 100}; animation: none !important; }
        `;
        $style.html(styleContent);
        clearTimeout(timeoutId);
    }).on("mouseout touchend touchcancel", function(e) {
        if(!interactionEnabled) return;
        var $card = $(this);
        $style.html("");
        // 滑鼠離開時還原至基底狀態
        $card.css("transform", "rotate(0deg)");
    });

});

// 解析查詢參數的函式
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}
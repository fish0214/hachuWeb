$(document).ready(function() {
    $('#cardModal').hide();
    // 綁定卡牌點擊事件（假設卡牌在 #cardsContainer 內，且每張卡牌有 .card 類別）
    $('#cardsContainer').on('click', '.card', function() {
      // 複製被點擊卡牌的內容，這裡用 clone() 方法
      let cardClone = $(this).clone();
      // 清空並更新 modal 內容
      $('#modalCardContent').html(cardClone);
      // 顯示 modal
      $('#cardModal').fadeIn(200);
      cardInteraction();
    });
  
    // 綁定 modal 中的關閉按鈕
    $('.modal .close').on('click', function() {
      $('#cardModal').fadeOut(200);
    });
  
    // 點擊 modal 背景也可關閉
    $(window).on('click', function(e) {
      if ($(e.target).is('#cardModal')) {
        $('#cardModal').fadeOut(200);
      }
    });
});

/**
 * 卡牌互動效果
 */
function cardInteraction() {
  $(".card").on("mousemove touchmove", function(e) {
    let posX, posY;
    if(e.type === "touchmove") {
      let rect = this.getBoundingClientRect();
      posX = e.touches[0].clientX - rect.left;
      posY = e.touches[0].clientY - rect.top;
      e.preventDefault();
    } else {
      posX = e.offsetX;
      posY = e.offsetY;
    }
    
    const $card = $(this);
    const width = $card.width();
    const height = $card.height();
    // 以卡牌中心作為參考點
    const centerX = width / 2;
    const centerY = height / 2;
    // 計算滑鼠與中心點的距離（正負值）
    const deltaX = posX - centerX;
    const deltaY = posY - centerY;
    // 設定旋轉敏感度（數值可依需求調整）
    const rotateY = -deltaX / 20; // 水平移動影響 Y 軸旋轉
    const rotateX = deltaY / 20;  // 垂直移動影響 X 軸旋轉
    
    // 更新 transform，達到 3D 旋轉效果
    $card.css("transform", `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  });
  
  // 當滑鼠或觸控離開時，還原卡牌
  $(".card").on("mouseleave touchend touchcancel", function() {
    $(this).css("transform", "rotateX(0deg) rotateY(0deg)");
  });
}


  
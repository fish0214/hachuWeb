$(document).ready(function() {
  $('#cardModal').hide();
  $('#cardsContainer').on('click','.card', function() {
    // 取得卡片的圖片 src
    let cardImgSrc = $(this).find('img').attr('src');
    $('.card-front').css('background-image', 'url(' + cardImgSrc + ')');
    // 顯示 modal
    $('#cardModal').fadeIn(200);
  });

  $(".card-wrapper").on("click", function() {
    $(this).toggleClass('flipped');
  })

  // 綁定 modal 中的關閉按鈕
  $('.modal .close').on('click', function() {
    $('#cardModal').fadeOut(200);
    $(".card-wrapper").removeClass('flipped');
  });

  // 點擊 modal 背景也可關閉
  $(window).on('click', function(e) {
    if ($(e.target).is('#cardModal')) {
      $('#cardModal').fadeOut(200);
      $(".card-wrapper").removeClass('flipped');
    }
  });
  cardInteraction();
});

/**
 * 卡牌互動效果
 */
function cardInteraction() {
  var $cards = $(".card-wrapper");
  var $style = $(".hover");
  $cards
    .on("mousemove", function (e) {
      var $card = $(this);
      if ($card.hasClass("flipped")) return;
      
      // 使用頁面座標與元素 offset 計算較穩定的滑鼠位置
      var offset = $card.offset();
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top;
      var w = $card.width();
      var h = $card.height();
      // 計算百分比位置
      var lp = Math.abs(Math.floor((100 / w) * x) - 100);
      var tp = Math.abs(Math.floor((100 / h) * y) - 100);
      // 調整偽元素的背景位置（可根據需求微調）
      var lp2 = 50 - Math.abs(lp) / 10 + 5;
      var tp2 = 50 - Math.abs(tp) / 10 + 5;
      // 計算卡牌旋轉角度
      var ty = (tp - 50) / 2;
      var tx = (lp - 50) * 0.5 * -1;
      // 定義 CSS 屬性字串
      var bg = `background-position: ${lp}% ${tp}%;`;
      var bg2 = `background-position: ${lp2}% ${tp2}%;`;
      var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg);`;
      // 只針對 active 狀態的卡牌套用互動效果
      var styleContent = `
        .card-wrapper.active .card-front::before { ${bg} }
        .card-wrapper.active .card-front::after { ${bg2} }
        .card-wrapper.active { ${tf} }
      `;
      // 移除其他卡牌的 active 狀態，再設定當前卡牌為 active
      $cards.removeClass("active");
      $card.addClass("active");
      $style.html(styleContent);
    })
    .on("mouseout", function () {
      $cards.removeClass("active");
    });
}
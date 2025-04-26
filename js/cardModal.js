$(document).ready(function() {
  $('#cardModal').hide();
  $('#cardsContainer').on('click','.card', function() {
    // 取得卡片的圖片 src
    let cardImgSrc = $(this).find('img').attr('src');
    $('.card-front').css('background-image', 'url(' + cardImgSrc + ')');
    // 設定 QRCode
    $("#cardQR").attr("src", generateQR(cardImgSrc));

    // 渲染衛教資訊
    const allergens = $(this).data("allergens");    
    renderAllergyEducation(allergens);

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

/**
 * 生成 QR Code
 */
function generateQR(url) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}`;
}

/**
 * 渲染衛教資訊
 * @param {*} allergens 
 */
function renderAllergyEducation(allergens) {
  const descriptions = {
    dust: {
      name: "塵蟎",
      icon: "image/allergens/allergen_dust.png",
      traits: [
        {
          title: "家中潛伏者",
          desc: "最常見的室內過敏原，喜歡藏身於床墊、地毯、沙發與冷氣機中。"
        }
      ],
      tips: [
        "1. 床單被套每週清洗",
        "2. 定期清潔空調濾網"
      ]
    },
    pollen: {
      name: "花粉",
      icon: "image/allergens/allergen_flower.png",
      traits: [
        {
          title: "季節擾動者",
          desc: "於春夏季大量釋放花粉，飄逸的花粉能在空氣中停留許久，是戶外族群的惡夢。"
        }
      ],
      tips: [
        "1. 花粉季節外出時配戴口罩與眼鏡",
        "2. 回家後立刻洗臉與更換衣物"
      ]
    },
    drug: {
      name: "藥物",
      icon: "image/allergens/allergen_pill.png",
      traits: [
        {
          title: "療癒偽裝者",
          desc: "藏身於日常藥物中，部分人服用後可能誘發過敏反應，出現紅疹、呼吸困難等症狀。"
        }
      ],
      tips: [
        "1. 醫療紀錄中註明過敏藥物",
        "2.  使用藥物前諮詢醫師"
      ]
    },
    food: {
      name: "食物",
      icon: "image/allergens/allergen_peanut.png",
      traits: [
        {
          title: "隱藏危機者",
          desc: "化身為花生、蛋、海鮮等日常美食，看似無害卻可能引爆強烈的過敏反應。"
        }
      ],
      tips: [
        "1. 仔細閱讀食品標示與成分",
        "2. 外食時主動告知餐廳過敏原" 
      ]
    },
    metal: {
      name: "金屬",
      icon: "image/allergens/allergen_mental.png",
      traits: [
        {
          title: "陷阱製造者",
          desc: "外表閃亮奪目，卻潛藏著金屬過敏的隱患——鎳。與皮膚接觸後，容易引發紅腫、搔癢及濕疹。"
        }
      ],
      tips: [
        "1. 選用純金、純銀、鈦製品",
        "2. 避免長時間配戴劣質或合金飾品"
      ]
    },
    animal: {
      name: "動物毛髮",
      icon: "image/allergens/allergen_cat.png",
      traits: [
        {
          title: "空氣漫遊者",
          desc: "在空氣中釋放肉眼看不見的皮屑，容易引起鼻塞、打噴嚏與眼睛泛紅。"
        }
      ],
      tips: [
        "1. 定期清潔居家環境",
        "2. 使用具過濾功能的空氣清淨機"
      ]
    }
  };

  let html = `<ul class="traits-list">`;
  let traitCount = 1;

  // 特性描述
  allergens.forEach(key => {
    const item = descriptions[key];
    if (item?.traits) {
      item.traits.forEach(trait => {
        html += `
          <li>
            <div class="trait-title">
              <h2>特性${traitCount++}：${trait.title}</h2>
              <img class="trait-icon" src="${item.icon}" alt="${item.name} icon">
            </div>
            <p>${trait.desc}</p>
          </li>
        `;
      });
    }
  });
  html += `</ul><h2 class="defense-title">《 防禦對策大補帖 》</h2>`;

  // 分類 tips
  allergens.forEach(key => {
    const item = descriptions[key];
    if (item?.tips?.length) {
      html += `<h3>對抗${item.name}：</h3><ul class="defense-list">`;
      item.tips.forEach(tip => {
        html += `<li>${tip}</li>`;
      });
      html += `</ul>`;
    }
  });

  document.getElementById("eduDescription").innerHTML = html;
}
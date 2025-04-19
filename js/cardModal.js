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
          title: "飛散微粒",
          desc: "牠的屍體與排泄物能輕易飄進空氣裡，讓人鼻塞、流鼻水、眼睛紅腫！"
        }
      ],
      tips: [
        "1. 定期更換床單、枕頭套",
        "2. 使用60°C以上熱水清洗布料",
        "3. 少用布沙發與地毯，改選好清洗材質"
      ]
    },
    pollen: {
      name: "花粉",
      icon: "image/allergens/allergen_flower.png",
      traits: [
        {
          title: "風中潛行",
          desc: "不是每種花的花粉都會害人，風媒花（如松、柏、艾草）才是罪魁禍首，花粉一飄就攻入你的鼻子與氣管！"
        }
      ],
      tips: [
        "1. 花粉季外出務必戴口罩",
        "2. 清晨/黃昏避免外出（花粉濃度高）",
        "3. 回家後立刻換衣、洗臉、洗手，避免花粉入侵室內"
      ]
    },
    drug: {
      name: "藥物",
      icon: "image/allergens/allergen_pill.png",
      traits: [
        {
          title: "藥效逆襲",
          desc: "你以為藥能治病？某些成分卻可能偷偷逆襲你。青黴素、止痛藥甚至麻醉劑，都可能讓你紅疹、氣喘、甚至過敏性休克！"
        }
      ],
      tips: [
        "1. 若曾吃藥出現過敏，務必記下藥名",
        "2. 就診前告知醫師，並考慮過敏測試",
        "3. 避免自行服藥，謹慎評估風險"
      ]
    },
    food: {
      name: "食物",
      icon: "image/allergens/allergen_peanut.png",
      traits: [
        {
          title: "隱藏成分",
          desc: "花生、蛋、海鮮……有時過敏反應不是吃太多，而是根本不知道它們藏在哪！不小心入口，可能喉嚨腫脹、甚至休克！"
        }
      ],
      tips: [
        "1. 仔細看食品標示，注意「可能含有○○」",
        "2. 外食時先告知餐廳你的過敏食材",
        "3. 隨身攜帶緊急藥物備用"
      ]
    },
    metal: {
      name: "金屬",
      icon: "image/allergens/allergen_mental.png",
      traits: [
        {
          title: "金屬伏兵",
          desc: "別看它閃亮亮，一旦碰上體質敏感的人，「鎳」這種金屬就像伏兵一樣發動攻擊，讓你的皮膚紅腫、癢不停！"
        }
      ],
      tips: [
        "1.優先選擇純銀、純金或鈦金屬飾品",
        "2. 避免戴合金飾品睡覺，減少接觸時間"
      ]
    },
    animal: {
      name: "動物毛髮",
      icon: "image/allergens/allergen_cat.png",
      traits: [
        {
          title: "隱形附著",
          desc: "你以為是可愛毛毛？錯！真正惹禍的是牠們皮屑、唾液與尿液裡的蛋白質，會悄悄黏上你，讓你鼻子發癢、氣喘吁吁！"
        }
      ],
      tips: [
        "1. 保持室內空氣流通",
        "2. 使用HEPA濾網空氣清淨機",
        "3. 擁抱毛孩前，先確定自己不會過敏"
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
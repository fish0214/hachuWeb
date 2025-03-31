$(document).ready(function() {
    // 設置卡片點擊事件
    $(".card").on("click", function() {
      // 切換翻轉狀態
      $(this).toggleClass("flipped");
    });

        // 點擊事件
    $(".info-btn").on("click", function() {
        var allergenType = $(this).attr("data-allergen");

        // 隱藏所有資訊區塊
        $(".info-content").removeClass("active");

        // 根據不同的過敏原類型設置內容
        var content = "";
        switch (allergenType) {
            case "dust1":
                content = "<h2>其實讓你過敏的不是灰塵本身</h2><p>容易引起過敏反應的是塵蟎的屍體 & 排泄物，它們能輕易飛散到空氣中，讓過敏體質的人鼻塞、流鼻水、眼睛紅腫。</p>";
                $("#dust-info").html(content).addClass("active");
                break;
            case "dust2":
                content = "<h2>如何對抗灰塵過敏 </h2><ul><li>1. 定期更換床單、枕頭套</li><li>2. 用60°C以上的熱水洗滌布料 </li><li>3. 少用地毯、布沙發，選擇容易清潔的材質</li></ul>";
                $("#dust-info").html(content).addClass("active");
                break;

            case "food1":
                content = "<h2>小心暗藏過敏成分的食品！</h2><p>花生過敏可能引發喉嚨腫脹、呼吸困難，甚至休克。許多加工食品裡都含有花生成分，像是巧克力、醬料、蛋糕，需要仔細留意。</p>";
                $("#food-info").html(content).addClass("active");
                break;
            case "food2":
                content = "<h2>如何避免食物過敏</h2><ul><li>1. 仔細看食品標示，留意「可能含有○○」的提醒，尤其是加工食品</li><li>2. 在餐廳點餐時，提前告知自己對某種食物過敏 </li><li>3. 隨身攜帶應急藥物</li></ul>";
                $("#food-info").html(content).addClass("active");
                break;

            case "pollen1":
                content = "<h2>並非所有花的花粉都會引起過敏。</h2><p>真正的兇手是「風媒花」，像是艾草、豬草、柏樹、松樹，這些植物的花粉非常輕，一吹就滿天飛！</p>";
                $("#pollen-info").html(content).addClass("active");
                break;
            case "pollen2":
                content = "<h2>花粉季節如何保護自己 </h2><ul><li>1. 外出戴口罩</li><li>2. 不要在清晨或黃昏外出，這是花粉濃度最高的時段</li><li>3. 回家後馬上換衣服、洗臉，避免把花粉帶進室內</li></ul>";
                $("#pollen-info").html(content).addClass("active");
                break;

            case "animal1":
                content = "<h2>其實動物毛髮本身不會引起過敏。</h2><p>真正的罪魁禍首是皮屑、唾液和尿液中的蛋白質，所以就算是短毛貓、無毛貓，也還是可能觸發過敏反應。</p>";
                $("#animal-info").html(content).addClass("active");
                break;
            case "animal2":
                content = "<h2>對寵物過敏怎麼辦？</h2><ul><li>1. 保持空氣流通</li><li>2. 用HEPA濾網空氣清淨機</li><li>3. 擁抱貓狗前，先確認自己不會過敏</li></ul>";
                $("#animal-info").html(content).addClass("active");
                break;

            case "metal1":
                content = "<h2>最常引起過敏的金屬是「鎳」。</h2><p>金這種金屬常被用來製作飾品、鈕扣、眼鏡框，對敏感體質的人來說，接觸幾分鐘就可能引起過敏反應！</p>";
                $("#metal-info").html(content).addClass("active");
                break;
            case "metal2":
                content = "<h2>如何避免金屬過敏</h2><ul><li>1. 選擇純銀、純金或鈦金屬的飾品</li><li>2. 避免戴合金飾品過夜，減少長時間接觸 </li></ul>";
                $("#metal-info").html(content).addClass("active");
                break;

            case "drug1":
                content = "<h2>小心這些常見的藥物過敏元凶！</h2><p>抗生素（如青黴素）、止痛藥（如阿司匹林、布洛芬）、麻醉劑。嚴重的話還可能引發「過敏性休克」，需要緊急送醫</p>";
                $("#drug-info").html(content).addClass("active");
                break;
            case "drug2":
                content = "<h2>如何避免藥物過敏？</h2><ul><li>1. 曾經吃某種藥後出現紅疹、腫脹、氣喘</li><li>2. 先諮詢醫師，看看能否進行藥物過敏測試 </li><li>3. 牢記自己過敏的藥物名稱</li></ul>";
                $("#drug-info").html(content).addClass("active");
                break;
            default:
                content = "<h2>過敏原詳細信息</h2><p>這是過敏原的詳細介紹內容...</p>";
                break;
        }
    });
  });
  
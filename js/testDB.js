/**
 * 過敏測驗題庫
 */

// 必出現的題目
const generalQuestions = [
    {
        question: "請問你的過敏嚴重程度為？",
        options: ["輕微", "中等", "嚴重", "非常嚴重", "極度嚴重"]
    }
];
const generalNoAllergyQuestions = [
    {
        question: "你曾看過身邊的人出現過敏反應嗎？其中最嚴重的情況是什麼樣的？",
        options: ["輕微", "中等", "嚴重", "極端", "極度嚴重"]
    }
];


// 根據過敏原所對應的題目
const allergenQuestions = {
    "dust": [
        { allergen:"dust", type: "A", question: "你是否在打掃時經常出現過敏不適的情況？", options: ["經常", "偶爾", "從未"] },
        { allergen:"dust", type: "B", question: "你是否對家中的床墊或枕頭容易產生過敏反應？", options: ["經常", "偶爾", "從未"] },
        { allergen:"dust", type: "C", question: "早上起床時，你是否經常感到鼻塞或打噴嚏？", options: ["經常", "偶爾", "從未"] },
        { allergen:"dust", type: "D", question: "你是否需要經常清潔家中的床墊與枕頭，以避免塵蟎滋生？", options: ["經常", "偶爾", "從未"] },
        { allergen:"dust", type: "E", question: "你是否在乾燥或潮濕的天氣裡，會感覺過敏症狀加劇？", options: ["經常", "偶爾", "從未"] }
    ],
    "pollen": [
        { allergen:"pollen", type: "A", question: "你是否經常在季節交替時出現過敏症狀？", options: ["經常", "偶爾", "從未"] },
        { allergen:"pollen", type: "B", question: "在春季時，你是否會因花粉過敏而避免外出？", options: ["經常", "偶爾", "從未"] },
        { allergen:"pollen", type: "C", question: "花粉是否會讓你出現如眼睛搔癢、鼻子癢等過敏不適的症狀？", options: ["經常", "偶爾", "從未"] },
        { allergen:"pollen", type: "D", question: "你是否會避免前往植物繁茂或開花的場所？", options: ["經常", "偶爾", "從未"] },
        { allergen:"pollen", type: "E", question: "你是否經常受到換季時節所引起的過敏困擾？", options: ["經常", "偶爾", "從未"] }
    ],
    "drug": [
        { allergen:"drug", type: "A", question: "你是否因藥物過敏而影響日常生活？", options: ["經常", "偶爾", "從未"] },
        { allergen:"drug", type: "B", question: "你是否仍在尋找適合自己的抗過敏藥物？", options: ["是", "否", "不確定"] },
        { allergen:"drug", type: "C", question: "你是否曾因藥物過敏而前往就醫？", options: ["是", "否", "不確定"] },
        { allergen:"drug", type: "D", question: "你是否曾對抗生素、止痛藥等特定藥物產生過敏反應？", options: ["是", "否", "不確定"] },
        { allergen:"drug", type: "E", question: "你是否曾因藥物過敏而尋求醫療協助？", options: ["是", "否", "不確定"] }
    ],
    "food": [
        { allergen:"food", type: "A", question: "你是否因食物過敏而影響日常生活？", options: ["經常", "偶爾", "從未"] },
        { allergen:"food", type: "B", question: "你是否曾因為食物過敏而出現腸胃不適的情況？", options: ["經常", "偶爾", "從未"] },
        { allergen:"food", type: "C", question: "你是否會特別注意食品標籤與成分說明？", options: ["經常", "偶爾", "從未"] },
        { allergen:"food", type: "D", question: "你是否對食品中的添加劑較為敏感？", options: ["是", "否", "不確定"] },
        { allergen:"food", type: "E", question: "你是否曾因食物過敏而需要緊急就醫？", options: ["是", "否", "不確定"] }
    ],
    "metal": [
        { allergen:"metal", type: "A", question: "你是否對金屬飾品、眼鏡框等日常用品過敏並感到困擾？", options: ["經常", "偶爾", "從未"] },
        { allergen:"metal", type: "B", question: "你是否因接觸金屬而引發皮膚搔癢？", options: ["經常", "偶爾", "從未"] },
        { allergen:"metal", type: "C", question: "你是否曾因金屬接觸而出現水泡或紅腫反應？", options: ["經常", "偶爾", "從未"] },
        { allergen:"metal", type: "D", question: "你是否對某些特定金屬飾品特別敏感？", options: ["經常", "偶爾", "從未"] },
        { allergen:"metal", type: "E", question: "你在接觸金屬後是否會立即清洗皮膚？", options: ["經常", "偶爾", "從未"] }
    ],
    "animal": [
        { allergen:"animal", type: "A", question: "你是否對貓或狗的毛髮過敏？", options: ["經常", "偶爾", "從未"] },
        { allergen:"animal", type: "B", question: "為了減少過敏，你是否會刻意避免與動物接觸？", options: ["經常", "偶爾", "從未"] },
        { allergen:"animal", type: "C", question: "你對哪種類型的動物特別容易產生過敏反應？", options: ["貓", "狗", "兩者皆是"] },
        { allergen:"animal", type: "D", question: "你是否曾因過敏問題考慮不飼養寵物？", options: ["有", "沒有", "不記得"] },
        { allergen:"animal", type: "E", question: "你是否對動物毛髮過敏，並且會出現皮膚紅腫、呼吸困難等症狀？", options: ["是的", "偶爾", "不會"] }
    ]
}

const NoAllergenQuestions = {
    "dust": [
        { allergen:"dust", type: "A", question: "你覺得每天鋪床能減少塵蟎滋生嗎？", options: ["可以", "不可以", "不知道"], answer:"可以"},
        { allergen:"dust", type: "B", question: "你認為在陽光下曬床單能有效殺死塵蟎嗎？", options: ["可以", "不可以", "不知道"], answer:"可以" },
        { allergen:"dust", type: "C", question: "你知道塵蟎除了引發鼻子過敏，還可能導致其他症狀嗎？", options: ["是的", "不是", "不知道"], answer:"不是" },
        { allergen:"dust", type: "D", question: "你知道塵蟎最喜歡在潮濕的環境中繁殖嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"dust", type: "E", question: "你知道塵蟎過敏和家中清潔習慣有關嗎？", options: ["是的", "不是", "不知道"], answer:"是的" }
    ],
    "pollen": [
        { allergen:"pollen", type: "A", question: "你覺得花粉過敏通常在什麼季節最容易發作？", options: ["春夏", "秋冬", "季節交替之時"], answer:"春夏" },
        { allergen:"pollen", type: "B", question: "你覺得在換季期間，戴口罩能有效減少花粉過敏反應嗎？", options: ["可以", "不可以", "不知道"], answer:"可以" },
        { allergen:"pollen", type: "C", question: "你知道換季過敏症狀有時候和感冒的症狀相似嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"pollen", type: "D", question: "你覺得換季時，空氣中的花粉會加重過敏症狀嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"pollen", type: "E", question: "你認為經常更換與清洗衣物可以減少花粉過敏的機率嗎？", options: ["是的", "不是", "不知道"], answer:"是的" }
    ],
    "drug": [
        { allergen:"drug", type: "A", question: "你覺得藥物過敏是遺傳造成的嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"drug", type: "B", question: "服用維他命能緩解藥物過敏嗎？", options: ["可以", "不可以", "不知道"], answer:"不可以" },
        { allergen:"drug", type: "C", question: "你認為使用過期的藥物會有過敏或其他風險嗎？", options: ["有風險", "無風險", "不知道"], answer:"有風險" },
        { allergen:"drug", type: "D", question: "你覺得過敏用藥能夠徹底治癒過敏嗎？", options: ["可以", "不可以", "不知道"], answer:"不可以" },
        { allergen:"drug", type: "E", question: "你覺得人類會一次對多種藥物過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" }
    ],
    "food": [
        { allergen:"food", type: "A", question: "你覺得食品添加劑會引發過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"food", type: "B", question: "你認為海鮮在生食狀態下更容易引發過敏反應嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"food", type: "C", question: "你覺得堅果過敏能治癒嗎？", options: ["可以", "不可以", "不知道"], answer:"不可以" },
        { allergen:"food", type: "D", question: "你覺得食物過敏和基因有關嗎？", options: ["有", "沒有", "不知道"], answer:"有" },
        { allergen:"food", type: "E", question: "你覺得過敏體質的人應避免某些常見的過敏食物嗎？", options: ["是的", "不行", "不知道"], answer:"是的" }
    ],
    "metal": [
        { allergen:"metal", type: "A", question: "你覺得汗水會讓金屬過敏更嚴重嗎?", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"metal", type: "B", question: "你覺得純度較高的金屬，比起一般飾品常用的合金，更不容易導致過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"metal", type: "C", question: "你覺得金屬植入物（如牙套）會導致過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"metal", type: "D", question: "你覺得長時間接觸金屬物品會增加過敏的風險嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"metal", type: "E", question: "常見的過敏元素是什麼？", options: ["鎳", "銀"], answer:"鎳" }
    ],
    "animal": [
        { allergen:"animal", type: "A", question: "你覺得剃毛能減少寵物過敏嗎？", options: ["會", "不會", "不知道"], answer:"不會" },
        { allergen:"animal", type: "B", question: "你覺得短毛動物比長毛動物更不易引發過敏嗎？", options: ["會", "不會", "不知道"], answer:"不會" },
        { allergen:"animal", type: "C", question: "動物過敏是否會因季節變化而加重？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"animal", type: "D", question: "你認為定期為寵物洗澡可以減少毛髮過敏的發生嗎？", options: ["可以", "不可以", "不知道"], answer:"可以" },
        { allergen:"animal", type: "E", question: "你知道過敏體質的人在家中使用空氣清淨器可以減少動物毛髮過敏嗎?", options: ["會", "不會", "不知道"], answer:"會" }
    ]
}

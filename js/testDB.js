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
        { allergen:"dust", type: "A", question: "是否經常在打掃時感到過敏不適？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"dust", type: "B", question: "你是否對家中的床墊、枕頭特別敏感？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"dust", type: "C", question: "早上起床時，你是否經常感到鼻塞或打噴嚏？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"dust", type: "D", question: "你家中的床墊、枕頭是否經常需要特別清潔來避免塵蟎過敏？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"dust", type: "E", question: "你是否會在乾燥或潮濕天氣中感覺到塵蟎過敏的症狀加劇？", options: ["經常", "偶爾", "幾乎沒有"] }
    ],
    "pollen": [
        { allergen:"pollen", type: "A", question: "季節變換時，你是否容易過敏？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"pollen", type: "B", question: "當花粉濃度較高時，你是否會減少戶外活動？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"pollen", type: "C", question: "是否會因花粉而導致眼睛發癢？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"pollen", type: "D", question: "你是否會避免去有大量植物或開花的地方？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"pollen", type: "E", question: "你是否常常因為換季過敏而感到困擾？", options: ["經常", "偶爾", "幾乎沒有"] }
    ],
    "drug": [
        { allergen:"drug", type: "A", question: "你是否因藥物過敏影響日常生活？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"drug", type: "B", question: "你是否嘗試過其他替代藥物以避免過敏？", options: ["是的", "還在尋找", "沒有"] },
        { allergen:"drug", type: "C", question: "你是否曾經因此過敏而住院治療", options: ["有", "沒有", "不記得"] },
        { allergen:"drug", type: "D", question: "你是否曾對某些藥物（如抗生素或止痛藥）產生過敏反應？", options: ["有", "沒有", "不記得"] },
        { allergen:"drug", type: "E", question: "你是否曾因藥物過敏而需要尋求醫療協助？", options: ["有", "沒有", "不記得"] }
    ],
    "food": [
        { allergen:"food", type: "A", question: "你是否因食物過敏影響日常生活？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"food", type: "B", question: "食物過敏是否會引發腸胃不適？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"food", type: "C", question: "你會特別注意食物成分標籤嗎？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"food", type: "D", question: "你是否經常需要帶自己的食物外出以避免過敏？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"food", type: "E", question: "你是否曾因食物過敏需要緊急就醫？", options: ["經常", "偶爾", "幾乎沒有"] }
    ],
    "metal": [
        { allergen:"metal", type: "A", question: "你是否對金屬飾品（如耳環、飾品）過敏？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"metal", type: "B", question: "是否因接觸金屬而引發皮膚癢感？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"metal", type: "C", question: "你是否會因金屬接觸引發水泡或紅腫？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"metal", type: "D", question: "你是否對金屬首飾、眼鏡框等物品的過敏反應感到困擾？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"metal", type: "E", question: "你是否曾因金屬過敏無法使用某些金屬製的家居用品（如餐具或鍋具）？", options: ["經常", "偶爾", "幾乎沒有"] }
    ],
    "animal": [
        { allergen:"animal", type: "A", question: "你是否對貓狗的毛髮過敏？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"animal", type: "B", question: "是否會避免與動物接觸以減少過敏？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"animal", type: "C", question: "對哪種類型的動物特別敏感？", options: ["貓", "狗", "其他"] },
        { allergen:"animal", type: "D", question: "你是否考慮過因過敏而避免飼養寵物？", options: ["經常", "偶爾", "幾乎沒有"] },
        { allergen:"animal", type: "E", question: "你是否對動物毛髮過敏，並且會出現皮膚紅腫、呼吸困難等症狀？", options: ["經常", "偶爾", "幾乎沒有"] }
    ]
}

const NoAllergenQuestions = {
    "dust": [
        { allergen:"dust", type: "A", question: "你覺得每天鋪床能減少塵蟎滋生嗎？", options: ["可以", "不可以", "不知道"], answer:"可以"},
        { allergen:"dust", type: "B", question: "陽光曬床單能有效殺死塵蟎嗎？", options: ["可以", "不可以", "不知道"], answer:"可以" },
        { allergen:"dust", type: "C", question: "你認為塵蟎只會引發鼻子過敏嗎？", options: ["是的", "不是", "不知道"], answer:"不是" },
        { allergen:"dust", type: "D", question: "你知道塵蟎最喜歡在潮濕的環境中繁殖嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"dust", type: "E", question: "你知道塵蟎過敏和家中清潔習慣有關嗎？", options: ["是的", "不是", "不知道"], answer:"是的" }
    ],
    "pollen": [
        { allergen:"pollen", type: "A", question: "你覺得花粉過敏主要發生在什麼季節？", options: ["春夏", "秋冬", "季節交替之時"], answer:"春夏" },
        { allergen:"pollen", type: "B", question: "你覺得在換季期間，戴口罩能有效減少花粉過敏反應嗎？", options: ["可以", "不可以", "不知道"], answer:"可以" },
        { allergen:"pollen", type: "C", question: "你知道換季過敏症狀有時候和感冒的症狀相似嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"pollen", type: "D", question: "你覺得換季時，空氣中的花粉會加重過敏症狀嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"pollen", type: "E", question: "你覺得常換洗衣物能減少換季過敏的發生嗎？", options: ["是的", "不是", "不知道"], answer:"是的" }
    ],
    "drug": [
        { allergen:"drug", type: "A", question: "你覺得藥物過敏是遺傳造成的嗎？", options: ["是的", "不是", "不知道"], answer:"是的" },
        { allergen:"drug", type: "B", question: "服用維他命能緩解藥物過敏嗎？", options: ["可以", "不可以", "不知道"], answer:"不可以" },
        { allergen:"drug", type: "C", question: "你覺得使用過期藥物有風險嗎？", options: ["有風險", "無風險", "不知道"], answer:"有風險" },
        { allergen:"drug", type: "D", question: "你覺得過敏藥物能完全治癒過敏嗎？", options: ["可以", "不可以", "不知道"], answer:"不可以" },
        { allergen:"drug", type: "E", question: "你覺得人會一次對多種藥物過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" }
    ],
    "food": [
        { allergen:"food", type: "A", question: "你覺得食物添加劑會引發過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"food", type: "B", question: "生吃海鮮比煮熟的更容易引起過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"food", type: "C", question: "你覺得堅果過敏能治癒嗎？", options: ["可以", "不行", "不知道"], answer:"不行" },
        { allergen:"food", type: "D", question: "你覺得食物過敏和基因有關嗎？", options: ["有", "沒有", "不知道"], answer:"有" },
        { allergen:"food", type: "E", question: "你覺得過敏體質的人應避免某些常見的過敏食物嗎？", options: ["可以", "不行", "不知道"], answer:"可以" }
    ],
    "metal": [
        { allergen:"metal", type: "A", question: "你覺得汗水會加重金屬飾品過敏嗎?", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"metal", type: "B", question: "你覺得貴金屬比便宜金屬更不容易過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"metal", type: "C", question: "你覺得金屬植入物（如牙套）會導致過敏嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"metal", type: "D", question: "你覺得長時間接觸金屬物品會增加過敏的風險嗎？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"metal", type: "E", question: "常見的過敏元素是什麼？", options: ["鎳", "銀"], answer:"鎳" }
    ],
    "animal": [
        { allergen:"animal", type: "A", question: "你覺得剃毛能減少寵物過敏源嗎？", options: ["會", "不會", "不知道"], answer:"不會" },
        { allergen:"animal", type: "B", question: "你覺得短毛動物比長毛動物更不易引發過敏嗎？", options: ["會", "不會", "不知道"], answer:"不會" },
        { allergen:"animal", type: "C", question: "動物過敏是否會因季節變化而加重？", options: ["會", "不會", "不知道"], answer:"會" },
        { allergen:"animal", type: "D", question: "你覺得養寵物的人可以完全避免動物毛髮引起的過敏嗎？", options: ["會", "不會", "不知道"], answer:"不會" },
        { allergen:"animal", type: "E", question: "你知道過敏體質的人在家中使用空氣清新器可以減少動物毛髮過敏嗎?", options: ["會", "不會", "不知道"], answer:"會" }
    ]
}

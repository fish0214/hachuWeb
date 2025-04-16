let currentQuestionIndex = 0; // 當前題目索引
let userAnswers = {
    userName: "",
    userAnswers: []
}; // 用戶答案、名稱
let questionQueue = []; // 題目序列
let selectedAllergens = []; // 儲存選擇的過敏原
let isAllergy = true; // 是否有過敏
let currentAllergen = ""; // 當前題目的過敏原種類

document.addEventListener("DOMContentLoaded", function(){
    // 初始顯示首頁
    showSection(0);

    // 首頁進入按鈕
    $(".enter-btn").on("click", function() {
        showSection(1); // 切換到測驗介紹頁面
    });

    // 測驗介紹按鈕
    $(".btn-allergy").on("click", function() {
        isAllergy = true;
        showSection(2);
    });
    $(".btn-noallergy").on("click", function() {
        isAllergy = false;
        showSection(2);
    });

    // 選擇過敏原
    $(".allergen").on("click", function() {
        $(this).toggleClass("selected");
        const allergenType = $(this).data("type");
        if ($(this).hasClass("selected")) {
            selectedAllergens.push(allergenType);
        } else {
            selectedAllergens = selectedAllergens.filter((type) => type !== allergenType);
        }
    });
    $("#confirm-selection").on("click", function () {
        if (selectedAllergens.length === 0) {
            alert("請至少選擇一種過敏原！");
            return;
        }
        userAnswers.userAnswers.push(selectedAllergens);
        initializeTest(selectedAllergens); // 初始化測驗題目
        showSection(3); // 進入測驗頁面
    });

    // 輸入名稱
    $(".confirm-name").on("click", function() {
        const inputName = $("#userName").val().trim();
        if (userName === "") {
            alert("請輸入名稱");
            return;
        }
        userAnswers.userName = inputName;
        sendCardData();        
    });
});


/**
 * 切換頁面
 * @param {*} index 
 */
function showSection(index) {
    $("section").removeClass("active");
    $("section").eq(index).addClass("active");
}


/**
 * 初始化測驗題目
 */
function initializeTest() {
    questionQueue = []; // 清空題目

    if(isAllergy == true){
        questionQueue.push(...generalQuestions); //加入有過敏史的必出現題目

        // 分類所有A題和BC題
        let aQuestions = [];
        let bcQuestions = [];

        selectedAllergens.forEach((allergen) => {
            const questions = allergenQuestions[allergen];
            if (questions) {
                // A 題
                const questionA = questions.find((q) => q.type === "A");
                aQuestions.push(questionA);

                // BCDE 題
                const questionBC = questions.filter((q) => q.type !== "A");
                bcQuestions.push(...questionBC);
            }
        });

        // 隨機排列bc題
        randomArray(bcQuestions);

        if (aQuestions.length >= 6) {
            questionQueue.push(...aQuestions.slice(0, 5));
        } else {
            // 先加入所有A題 再加入BCDE題
            questionQueue.push(...aQuestions);
            questionQueue.push(...bcQuestions);
        }
    
        questionQueue = questionQueue.slice(0, 6);
        displayQuestion();
    } else if(isAllergy == false){
        questionQueue.push(...generalNoAllergyQuestions); //加入無過敏史的必出現題目

        // 分類所有A題和BC題
        let NoAllergyAQuestions = [];   
        let NoAllergyBCQuestions = [];
        selectedAllergens.forEach((allergen) => {
            const questions = NoAllergenQuestions[allergen];
            if (questions) {
                // A 題
                const questionA = questions.find((q) => q.type === "A");
                NoAllergyAQuestions.push(questionA);

                // BCDE 題
                const questionBC = questions.filter((q) => q.type !== "A");
                NoAllergyBCQuestions.push(...questionBC);
            }
        });

        randomArray(NoAllergyBCQuestions);

        if (NoAllergyAQuestions.length >= 6) {
            questionQueue.push(...NoAllergyAQuestions.slice(0, 5));
        } else {
            // 先加入所有A題 再加入BCDE題
            questionQueue.push(...NoAllergyAQuestions);
            questionQueue.push(...NoAllergyBCQuestions);
        }
    
        questionQueue = questionQueue.slice(0, 6);
        displayQuestion();
    }
}


/**
 * 隨機排列BCDE題
 * @param {*} array 
 */
function randomArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 隨機索引
        [array[i], array[j]] = [array[j], array[i]]; // 交換元素
    }
}


/**
 * 顯示題目及選項
 * @returns 
 */
function displayQuestion() {
    const questionContainer = $(".question");
    const optionsContainer1 = $(".ans-list1");
    const optionsContainer2 = $(".ans-list2");
    const currentQuestionDisplay = $(".current-question");
    const progressBar = $(".progress-bar");
    const background = $("#background");
    const backgroundElement = $("#background-element");

    // 檢查題目是否已完成
    if (currentQuestionIndex >= questionQueue.length) {
        // sendPrompt(prompt);
        showSection(4);
        return;
    }

    // 紀錄目前題目所對應的過敏原
    currentAllergen = questionQueue[currentQuestionIndex].allergen;

    // 更新當前題數與進度條
    currentQuestionDisplay.text(`Q${currentQuestionIndex + 1}`);
    const progress = ((currentQuestionIndex) / questionQueue.length) * 100;
    progressBar.css("width", `${progress}%`);

    // 取得當前題目
    const currentQuestion = questionQueue[currentQuestionIndex];
    questionContainer.text(currentQuestion.question);
    questionContainer.attr("data-stroke", currentQuestion.question);
    
    // 清空舊選項
    optionsContainer1.empty();
    optionsContainer2.empty();

    // 生成新選項
    currentQuestion.options.forEach(function (option, index) {
        const optionClass = "ans" + String.fromCharCode(65 + index);
        const li = $('<li>')
            .attr("data-index", index)
            .text(option)
            .addClass(optionClass)
            .on('click', function () {
                $(this).addClass('selected');  // 加上 selected class
                recordAnswer(index);
            });

        if (index < 3) {
            optionsContainer1.append(li);
        } else {
            optionsContainer2.append(li);
        }
    });

    // 清除舊背景與動畫
    backgroundElement.removeClass().addClass("test-bg-container");
    changeBackground(background, backgroundElement, currentAllergen);
}


/**
 * 切換背景及背景物件
 * @param {*} backgroundElement 
 * @param {*} currentQuestion 
 */
function changeBackground(background, backgroundElement, currentAllergen) {
    switch (currentAllergen) {
        case "dust":
            background.css("background-image", "url('image/background/dust_bg.png')");
            break;
        case "pollen":
            background.css("background-image", "url('image/background/pollen_bg.png')");
            break;
        case "drug":
            background.css("background-image", "url('image/background/drug_bg.png')");
            break;
        case "food":
            background.css("background-image", "url('image/background/food_bg.png')");
            break;
        case "metal":
            background.css("background-image", "url('image/background/metal_bg.png')");
            break;
        case "animal":
            background.css("background-image", "url('image/background/animal_bg.png')");
            break;
    }
}


let severityAnswer = ""; // 第一題答案 (過敏嚴重程度)
/**
 * 記錄答案並切換題目
 * @param {*} selectedIndex 
 */
function recordAnswer(selectedIndex) {
    const currentQuestion = questionQueue[currentQuestionIndex];
    
    // 紀錄第一題過敏嚴重程度答案
    if (currentQuestionIndex === 0) {
        severityAnswer = currentQuestion.options[selectedIndex]; 
    }

    // 如果是無過敏者模式，則將正確答案文字顯示為紅色
    if (!isAllergy) {
        const correctAnswer = currentQuestion.answer;
        // 找出正確答案在 options 陣列中的索引
        const correctIndex = currentQuestion.options.findIndex(option => option === correctAnswer);
        // 使用 jQuery 選取所有 data-index 等於正確索引的 li 並變紅
        $('.ans-list1 li[data-index="' + correctIndex + '"], .ans-list2 li[data-index="' + correctIndex + '"]').addClass('answer');
        // 為避免使用者重複點選，解除目前題目的點擊事件
        $('.ans-list1 li, .ans-list2 li').off('click');
    }

    // 無過敏者模式下，延遲一段時間後再進入下一題，讓使用者能看到正確答案的標示
    const delay = isAllergy ? 0 : 1500;
    setTimeout(function () {
        currentQuestionIndex++; // 下一題
        displayQuestion(); // 顯示下一題
    }, delay);
}


/**
 * 發送卡牌數據
 */
function sendCardData() {
    const userCardData = {
        userName: userAnswers.userName,   // 使用者名稱
        allergens: selectedAllergens,     // 過敏原
        severity: severityAnswer          // 第一題答案 (過敏嚴重程度)
    };

    // 存入 localStorage
    localStorage.setItem("quizResults", JSON.stringify(userCardData));
    // 跳轉到卡牌頁面
    window.location.href = "MonsterCard.html";
}


/**
 * 重新開始測驗
 */
function restartTest() {
    currentQuestionIndex = 0;
    userAnswers = { userName: "", selectedAllergens: [] };
    questionQueue = [];
    selectedAllergens = [];

    $("#userName").val("");
    $(".allergen").removeClass("selected"); 
    showSection(0); // 回到首頁  
}
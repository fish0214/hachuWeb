document.addEventListener("DOMContentLoaded", function () {
  // 當頁面載入時檢查是否已經觸發過動畫
  if (sessionStorage.getItem('bubbleAnimationTriggered') !== 'true') {
    $(".small-blob-container").removeClass("expanding");
    $("body").removeClass("transitioning");
    $(".small-blob-container").find("h1").css("display", "block"); // 顯示文字
  }
  // 監聽瀏覽器返回事件，確保泡泡動畫狀態被清除
  window.addEventListener("beforeunload", function (event) {
    $(".small-blob-container").removeClass("expanding");
    $("body").removeClass("transitioning");
    $(".small-blob-container").find("h1").css("display", "block"); // 顯示文字
    sessionStorage.removeItem('bubbleAnimationTriggered');
  });

  $("#intro-page").on("click", function () {
    window.location.href = "Intro.html";
  });
  $("#info-page").on("click", function () {
    window.location.href = "Info.html";
  });
  $("#test-page").on("click", function () {
    window.location.href = "Test.html";
  });
  $("#collection-page").on("click", function () {
    window.location.href = "Collection.html";
  });
  $("#index-page").on("click", function () {
    window.location.href = "index.html";
  });

  $("#intro-page-mobile").on("click", function () {
    window.location.href = "Intro.html";
  });
  $("#info-page-mobile").on("click", function () {
    window.location.href = "Info.html";
  });
  $("#test-page-mobile").on("click", function () {
    window.location.href = "Test.html";
  });
  $("#collection-page-mobile").on("click", function () {
    window.location.href = "Collection.html";
  });
  $("#index-page-mobile").on("click", function () {
    window.location.href = "index.html";
  });
  
  $("#intro-concept").on("click", function () {
    bubbleTransition("Intro.html#concept", "#intro-concept");
  });
  $("#intro-group").on("click", function () {
    bubbleTransition("Intro.html#group", "#intro-group");
  });
  $("#info-allergy").on("click", function () {
    bubbleTransition("Info.html#allergy", "#info-allergy");
  });
  $("#test-testpg").on("click", function () {
    bubbleTransition("Test.html#testpg", "#test-testpg");
  });

  /** 手機版導覽列事件 **/
  $('.mobile-menu-toggle').on('click', function() {
    $('.mobile-navbar').toggleClass('active');
    // 當選單開啟時禁用滾動
    if ($('.mobile-navbar').hasClass('active')) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }
  });
  $('.mobile-menu').on('click', function() {
    $('.mobile-navbar').toggleClass('active');
    // 當選單開啟時禁用滾動
    if ($('.mobile-navbar').hasClass('active')) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }
  });

  /** 進度條事件 **/
  $(window).on("scroll", function() {
      updateProgress();
      toggleProgressButton();
  });

  $(".progress-wrap").on("click", function (event) {
      scrollToTop(event);
  });
  
  iconContainer.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      showText(index);
    });
  });

  /** 初始化 **/
  updateProgress();
  toggleProgressButton();
});


const progressPath = document.querySelector('.progress-wrap path');
const offset = 50;
const duration = 550;

const iconContainer = document.querySelectorAll('.icon-container');

/** 初始化進度條 **/
const pathLength = progressPath.getTotalLength();
progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
progressPath.style.strokeDashoffset = pathLength;
progressPath.getBoundingClientRect();
progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';	

/**
 * 更新至頂按鈕進度條
 */
function updateProgress() {
    let scroll = $(window).scrollTop();
    let height = $(document).height() - $(window).height();
    let progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
}

function toggleProgressButton() {
    if ($(this).scrollTop() > offset) {
    $(".progress-wrap").addClass("active-progress");
    } else {
    $(".progress-wrap").removeClass("active-progress");
    }
}

function scrollToTop(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, duration);
    return false;
}


/**
 * intro頁面的icon點擊事件
 */
function showText(index) {
  const textElement = document.querySelector(`.get-text${index +1}`);
  if (textElement) {
      textElement.classList.toggle('show');
  }
}

/**
 * 首頁泡泡轉場動畫
 */
function bubbleTransition(location, sectionId) {
  $(sectionId).addClass("clickableBlob expanding");
  $("body").addClass("transitioning"); // 禁止背景滾動
  $(sectionId).find("h1").css("display", "none"); // 隱藏文字

  // 當動畫結束後，執行頁面轉場
  setTimeout(function() {
    // 在 sessionStorage 中標記動畫已經觸發過
    sessionStorage.setItem('bubbleAnimationTriggered', 'true');

    // 這裡設置轉場到的頁面
    window.location.href = location; // 替換為你希望跳轉的頁面網址
  }, 3000); // 與動畫時間相同，確保動畫完成後再跳轉
}

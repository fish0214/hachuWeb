import { loadCards } from './firebaseHelper.js';

$(document).ready(function(){
    // 載入所有卡牌
    loadAndRenderCards(1);
  
    // 搜尋按鈕點擊事件
    $("#searchBtn").on("click", function(){
      let searchText = $("#searchInput").val().trim();
      loadAndRenderCards(1, searchText);
    });

    $("#searchInput").on("keypress", function(e){
      if (e.key === "Enter") {
        let searchText = $("#searchInput").val().trim();
        loadAndRenderCards(1, searchText);
      }
    });
});

/**
 * 載入卡牌資料並渲染到頁面上
 * @param {*} page 
 * @param {*} search 
 * @param {*} limit 
 */
function loadAndRenderCards(page, search = "", limit = 12) {
  loadCards(page, search, limit).then(response => {
    renderCards(response.cards);
    renderPagination(response.page, response.totalPages, search, limit);
  })
  .catch(err => {
    console.error("載入卡牌資料時發生錯誤：", err);
    $("#cardsContainer").html(`<p class="error">讀取資料失敗，請稍後再試。</p>`);
  });
}
  
/**
 * 將取得的卡牌資料渲染到頁面上
 * @param {*} cards 
 * @returns 
 */
function renderCards(cards) {
    const container = $("#cardsContainer");
    container.empty();
    if (cards.length === 0) {
      container.append("<p>目前沒有卡牌記錄。</p>");
      return;
    }
    // 建立網格，每張卡牌包含使用者姓名與圖片
    cards.forEach(card => {
      const cardElement = $(`
        <div class="card">
          <img class="card-img" src="${card.cardUrl}" alt="卡牌圖片">
          <p class="card-title">${card.userName}</p>
        </div>
      `);
      container.append(cardElement);
    });
}

/**
 * 根據當前頁碼與總頁數渲染分頁控制元件
 * @param {*} currentPage 
 * @param {*} totalPages 
 * @param {*} search 
 * @param {*} limit 
 */
function renderPagination(currentPage, totalPages, search, limit) {
    let paginationHtml = "";
  
    // 前一頁按鈕
    if (currentPage > 1) {
      paginationHtml += `<button class="pagination-btn" data-page="${currentPage - 1}" data-search="${search}" data-limit="${limit}">Prev</button>`;
    } else {
      paginationHtml += `<button class="pagination-btn" disabled>Prev</button>`;
    }
  
    // 頁碼按鈕（簡單示範：顯示 1~totalPages，若頁數過多可考慮只顯示部分）
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        paginationHtml += `<button class="pagination-btn current" data-page="${i}" data-search="${search}" data-limit="${limit}" disabled>${i}</button>`;
      } else {
        paginationHtml += `<button class="pagination-btn" data-page="${i}" data-search="${search}" data-limit="${limit}">${i}</button>`;
      }
    }
  
    // 後一頁按鈕
    if (currentPage < totalPages) {
      paginationHtml += `<button class="pagination-btn" data-page="${currentPage + 1}" data-search="${search}" data-limit="${limit}">Next</button>`;
    } else {
      paginationHtml += `<button class="pagination-btn" disabled>Next</button>`;
    }
  
    // 如果頁面中沒有 pagination 元素則新增一個
    if ($("#pagination").length === 0) {
      $("#cardsContainer").after('<div id="pagination" class="pagination"></div>');
    }
    $("#pagination").html(paginationHtml);
  
    // 綁定分頁按鈕點擊事件
    $(".pagination-btn").click(function(){
      let page = $(this).data("page");
      let searchText = $(this).data("search");
      let limitVal = $(this).data("limit");
      loadAndRenderCards(page, searchText, limitVal);
    });
}

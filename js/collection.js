// 當頁面載入時
$(document).ready(function(){
    // 載入所有卡牌
    loadCards(1);
  
    // 搜尋按鈕點擊事件
    $("#searchBtn").on("click", function(){
      let searchText = $("#searchInput").val().trim();
      loadCards(1, searchText);
    });

    $("#searchInput").on("keypress", function(e){
      if (e.key === "Enter") {
        let searchText = $("#searchInput").val().trim();
        loadCards(1, searchText);
      }
    });
});
  
// 透過 AJAX 請求取得卡牌資料，page：當前頁碼, search：搜尋關鍵字, limit：每頁筆數（預設10筆）
function loadCards(page, search = "", limit = 12) {
    $.ajax({
      url: "getCards.php",
      method: "GET",
      data: { page: page, limit: limit, search: search },
      dataType: "json",
      success: function(response) {
        renderCards(response.cards);
        renderPagination(response.page, response.totalPages, search, limit);
    },
      error: function(xhr, status, error) {
        console.error("取得卡牌資料失敗:", error);
      }
    });
}
  
// 將取得的卡牌資料渲染到頁面上
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
          <img class="card-img" src="${card.card_url}" alt="卡牌圖片">
          <p class="card-title">${card.user_name}</p>
        </div>
      `);
      container.append(cardElement);
    });
}
  
// 根據當前頁碼與總頁數渲染分頁控制元件
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
      loadCards(page, searchText, limitVal);
    });
}

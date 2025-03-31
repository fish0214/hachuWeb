$(document).ready(function() {
  $(window).on("resize", function() {
      resizeCanvas();
      drawMainBubbleLines();
      drawAllConnections();
  });

  $(window).on("scroll", function() {
    // parallaxEffect();
  });
  
  // 綁定大泡泡的點擊事件
  $(".blob-container").on("click", function () {
      const liContainer = $(this).siblings(".li-container");
      const sectionCanvas = $(this).parent().find(".section-canvas");
      if (liContainer.is(":visible")) {
          liContainer.fadeOut(); // 隱藏小泡泡區塊
          sectionCanvas.fadeOut();
      } else {
          liContainer.fadeIn(); // 顯示點擊對應的小泡泡區塊
          sectionCanvas.fadeIn();
      }
  });

  resizeCanvas();
  insertAnimate();
  drawMainBubbleLines();
  drawAllConnections();
  $(".section-canvas").hide();
  $(".li-container").hide();
});

const canvas = document.getElementById('canvas');//大氣泡連線畫布
const ctx = canvas.getContext('2d');

const container = document.querySelector('.map');
const sections = document.querySelectorAll("section");

/**
 * 插入svg動畫
 */
function insertAnimate() {
  const blobPaths = document.querySelectorAll('.blob-path');
  blobPaths.forEach((blobPath) => {
      if (!blobPath.querySelector('animate')) {
      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animate.setAttribute('attributeName', 'd');
      animate.setAttribute('dur', '5000ms');
      animate.setAttribute('repeatCount', 'indefinite');
      animate.setAttribute(
          'values',
          `
          M484.5,292Q480,334,449,362.5Q418,391,385.5,410Q353,429,320.5,448.5Q288,468,251,461Q214,454,181.5,439Q149,424,110.5,411.5Q72,399,54.5,363.5Q37,328,39,289Q41,250,41,212Q41,174,57.5,138Q74,102,108.5,83Q143,64,177.5,49Q212,34,250,35.5Q288,37,325,46.5Q362,56,391.5,81.5Q421,107,451.5,136.5Q482,166,485.5,208Q489,250,484.5,292Z;
          M488,292Q481,334,453,365Q425,396,399.5,430Q374,464,332.5,472.5Q291,481,249,488Q207,495,166.5,480Q126,465,94,436.5Q62,408,40,371Q18,334,20.5,292Q23,250,23,208.5Q23,167,44,131Q65,95,99,71.5Q133,48,170,28Q207,8,248.5,14.5Q290,21,332.5,27.5Q375,34,400.5,68Q426,102,445,137Q464,172,479.5,211Q495,250,488,292Z;
          M484.5,292Q480,334,449,362.5Q418,391,385.5,410Q353,429,320.5,448.5Q288,468,251,461Q214,454,181.5,439Q149,424,110.5,411.5Q72,399,54.5,363.5Q37,328,39,289Q41,250,41,212Q41,174,57.5,138Q74,102,108.5,83Q143,64,177.5,49Q212,34,250,35.5Q288,37,325,46.5Q362,56,391.5,81.5Q421,107,451.5,136.5Q482,166,485.5,208Q489,250,484.5,292Z
          `
         );
      blobPath.append(animate);
      }
  });
}
/**
 * 動態設置畫布尺寸
 */
function resizeCanvas() {
  const containerRect = container.getBoundingClientRect();
  canvas.width = containerRect.width;
  canvas.height = containerRect.height;
}
function resizeSectionCanvas(section, sectionCanvas) {
  const rect = section.getBoundingClientRect();
  sectionCanvas.width = rect.width;
  sectionCanvas.height = rect.height;
}

function getCenter(element) {
  const rect = element.getBoundingClientRect();
  return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
  };
}
/**
 * 繪製大氣泡之間的連線
 */
function drawMainBubbleLines() {
  const containerRect = container.getBoundingClientRect();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#b6c3c576";
  ctx.lineWidth = 0.5;

  sections.forEach((section, index) => {
      if (index < sections.length - 1) {
      const bubble1 = section.querySelector("svg").getBoundingClientRect();
      const bubble2 = sections[index + 1].querySelector("svg").getBoundingClientRect();

      const startX = bubble1.left - containerRect.left + bubble1.width / 2;
      const startY = bubble1.top - containerRect.top + bubble1.height / 2;

      const endX = bubble2.left - containerRect.left + bubble2.width / 2;
      const endY = bubble2.top - containerRect.top + bubble2.height / 2;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      }
  });
}
/**
 * 繪製大氣泡與小氣泡的連線
 */
function drawSmallBubbleLines(section, sectionCanvas) {
  const ctx = sectionCanvas.getContext("2d");
  ctx.clearRect(0, 0, sectionCanvas.width, sectionCanvas.height);

  const blobContainer = section.querySelector(".blob-container");
  const smallBlobContainers = section.querySelectorAll(".small-blob-container");

  if (blobContainer && smallBlobContainers.length) {
      const blobCenter = getCenter(blobContainer);

      smallBlobContainers.forEach(smallBlobContainer => {
          const smallBlobCenter = getCenter(smallBlobContainer);

          const canvasOffset = sectionCanvas.getBoundingClientRect();
          const startX = blobCenter.x - canvasOffset.left;
          const startY = blobCenter.y - canvasOffset.top;
          const endX = smallBlobCenter.x - canvasOffset.left;
          const endY = smallBlobCenter.y - canvasOffset.top;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = "#fba8cf";
          ctx.lineWidth = 1;
          ctx.stroke();
      });
  }
}
function drawAllConnections() {
  sections.forEach(section => {
      const sectionCanvas = section.querySelector(".section-canvas");
      if (sectionCanvas) {
          resizeSectionCanvas(section, sectionCanvas);
          drawSmallBubbleLines(section, sectionCanvas);
      }
  });
}

function parallaxEffect() {
  const scrollY = window.scrollY;
  const map = document.querySelector('.map');
  const sections = document.querySelectorAll('section');
  if (scrollY <= 600) {
    map.style.transform = "translateY(" + (-scrollY / 3) + "px" + ")";
    sections.forEach((section) => {
      const speed = section.getAttribute('data-speed') || 3;
      section.style.transform = "translateY(" + (-scrollY / speed) + "px" + ")";
    });
  }
}
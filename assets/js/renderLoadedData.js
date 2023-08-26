import * as getRequest from './getRequests.js';
import * as handleEventFunc from './listenEvent.js';

let products;
let suggestedProducts;
let bestSellerProducts;
let categories;

function loadDataToElement(productsList) {
  return productsList.map((product) => {
    let ratingElement = ``;
    for (let i = 1; i < 6; i++) {
      ratingElement += `<i class="fa-solid fa-star ${
        i <= Math.floor(product.rating) && 'full'
      }"></i>`;
    }

    return `<div class="goods-item">
    <div class="goods-item--img">
    <img src="${product.images[0]}" alt="product-image" />
    </div>
    <div class="goods-item--info">
      <div class="goods-item--title">
        ${product.title}
      </div>
      <div class="goods-item--price">đ${product.price},000</div>
      <div class="goods-item--rating-sold">
        <div class="goods-item--rating">
          <i class="fa-solid fa-star full"></i>
          <i class="fa-solid fa-star full"></i>
          <i class="fa-solid fa-star full"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="goods-item--sold">Đã bán ${product.sold}</div>
      </div>
    </div>
  </div>
</div>`;
  });
}

function loadData(elementName, dataToLoad) {
  const renderedElement = document.querySelector(elementName);
  const dataContainerElement = loadDataToElement(dataToLoad);
  renderedElement.innerHTML = dataContainerElement.join(' ');
}

function loadPageQnt() {
  const paginationWrapperElement = document.querySelector(
    '#pagination-wrapper'
  );
  const pageQnt = Math.ceil(products.total / products.count);
  let renderedPagination = ``;
  for (let i = 1; i <= pageQnt; i++) {
    renderedPagination += `<li
    class="pagination-item pagination-btn--num ${
      (i === 1 && 'pagination-item--active') || ''
    }"
  >
    <div class="pagination-link">${i}</div>
  </li>`;
  }
  paginationWrapperElement.innerHTML = renderedPagination;
  handleEventFunc.paginationEvents();
}

export const renderPage = async function (pageIndex) {
  products = await getRequest.getProducts({ page: pageIndex });
  loadData('#shop-goods-list', products.products);
};

export const renderCategoryPage = function () {
  return categories.map((category) => {
    return `
    <div class='category-item'>${category}</div>`
  })
}

const renderData = async () => {
  bestSellerProducts = await getRequest.getBestSellerProducts({ page: 1 });
  products = await getRequest.getProducts({ page: 1 });
  suggestedProducts = await getRequest.getSuggestedProducts({ page: 1 });
  categories = Array.from(new Set(products.products.map((product) => {
    return product.category
  })))

  loadData('#shop-goods-list', products.products);
  loadData('#suggested-list', suggestedProducts.suggested);
  loadData('#best-seller-list', bestSellerProducts.bestSeller);
  loadPageQnt();
};
renderData();

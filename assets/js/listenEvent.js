import * as utilsFunc from './utils.js';
import * as getRequest from './getRequests.js';
import { renderCategoryPage, renderPage } from './renderLoadedData.js';

const seeAllElements = document.querySelectorAll(
  '.shop-collection--header--right'
);
const dropdownElements = document.querySelectorAll('.dropdown-list');
const inputSearchElement = document.querySelector('.header-searchbar--input');
const resultSearchContainerElement = document.querySelector('#search-result');


export function paginationEvents() {
  const paginationElements = document.querySelectorAll('.pagination-btn--num');
  paginationElements.forEach((paginationElement, idx) => {
    paginationElement.addEventListener('click', () => {
      const currentPage = document.querySelector(
        '.pagination-item.pagination-item--active'
      );
      currentPage.classList.remove('pagination-item--active');
      paginationElement.classList.add('pagination-item--active');
      renderPage(idx + 1);
    });
  });
}

dropdownElements.forEach((dropdownElement) => {
  const dropdownItems = dropdownElement.querySelectorAll('.dropdown-option');

  // Listen event in dropdown item
  dropdownItems.forEach((dropdownItem) => {
    dropdownItem.addEventListener('click', () => {
      dropdownElement.querySelector('.search-current-option').innerText =
        dropdownItem.innerText;
    });
  });
});
const shopGoodsTitleElement = document.querySelector('.shop-goods-wrapper')

seeAllElements.forEach((seeAllElement) => {
  seeAllElement.addEventListener('click', () => {
    shopGoodsTitleElement.scrollIntoView()
  });
});

async function getSearchResult(searchText) {
  const results = await getRequest.getSearchResult({ text: searchText });

  const resultElements = results.map((result) => {
    return `<div class='dropdown-option'>${result.item.title}</div>`;
  });
  resultSearchContainerElement.innerHTML = resultElements.join(' ');
}

inputSearchElement.addEventListener('input', () => {
  if (!inputSearchElement.value?.trim()) {
    return;
  }
  utilsFunc.debouncedFunc(
    () => getSearchResult(inputSearchElement.value),
    500
  )();
});

// Event in mobile and tablet
const searchSectionElement = document.querySelector('.search-section-wrapper');
const shopInfoSectionElement = document.querySelector(
  '.shop-info-section-wrapper'
);
const searchSectionHeight = searchSectionElement.clientHeight;

window.addEventListener('scroll', () => {
  const curPosition = document.documentElement.scrollTop;
  if (curPosition < searchSectionHeight) {
    const ratio = 1 - (curPosition / searchBarHeight);
    shopInfoSectionElement.style.opacity = ratio;
    shopInfoSectionElement.style.visibility = 'visible';
  }
  else {
    shopInfoSectionElement.style.visibility = 'hidden';
  }
});

// set top of background
const headerBackgroundElement = document.querySelector('.ms-header-wrapper');
const searchBarHeight = document.querySelector(
  '.search-section-wrapper'
).clientHeight;
const headerBackgroundHeight = headerBackgroundElement.clientHeight;

if (headerBackgroundElement) {
  headerBackgroundElement.style.top =
    -(headerBackgroundHeight - searchBarHeight) + 'px';
}

const headerTabElements = document.querySelectorAll('.header-tab-item');
const headerTabUnderlineElement = document.querySelector(
  '.header-tabs-underline'
);
const shopMainSection = document.querySelector('.shop-main-section-wrapper')
const paginationElement = document.querySelector('.pagination-list')
const categoryWrapper = document.querySelector('.category-container')

headerTabUnderlineElement.style.width = headerTabElements[0].clientWidth + 'px';
headerTabUnderlineElement.style.left = headerTabElements[0].offsetLeft + 'px';

headerTabElements.forEach((headerTabElement) => {
  headerTabElement.addEventListener('click', (e) => {
    headerTabUnderlineElement.style.left = e.target.offsetLeft + 'px';
    headerTabUnderlineElement.style.width = e.target.clientWidth + 'px';

    if (headerTabElement.innerText.toLowerCase() === 'sản phẩm') {
      shopMainSection.style.display = 'block'
      paginationElement.style.display = 'flex'
      categoryWrapper.style.display = 'none'
      shopGoodsTitleElement.scrollIntoView({
        behavior: 'smooth'
      })
    }
    else if (headerTabElement.innerText.toLowerCase() === 'danh mục') {
      shopMainSection.style.display = 'none'
      paginationElement.style.display = 'none';
      categoryWrapper.style.display = 'block'

      const categoryElements = renderCategoryPage()
      categoryWrapper.innerHTML = categoryElements.join(' ')
    }
    else if (headerTabElement.innerText.toLowerCase() === 'shop') {
      document.documentElement.scrollTop = 0;
      shopMainSection.style.display = 'block'
      paginationElement.style.display = 'flex'
      categoryWrapper.style.display = 'none'
    }

    });
});
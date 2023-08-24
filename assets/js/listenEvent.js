import * as utilsFunc from './utils.js'
import * as getRequest from './getRequests.js'
import { renderPage } from './renderLoadedData.js';

const seeAllElements = document.querySelectorAll(
  '.shop-collection--header--right'
);
const dropdownElements = document.querySelectorAll('.dropdown-list');
const inputSearchElement = document.querySelector('.header-searchbar--input')
const resultSearchContainerElement = document.querySelector('#search-result')
const headerTabElements = document.querySelectorAll('.header-tab-item')
const headerTabUnderlineElement = document.querySelector('.header-tabs-underline')

headerTabUnderlineElement.style.width = headerTabElements[0].clientWidth + 'px'
headerTabUnderlineElement.style.left = headerTabElements[0].offsetLeft + 'px'

export function paginationEvents() {
  const paginationElements = document.querySelectorAll('.pagination-btn--num')
  paginationElements.forEach((paginationElement, idx) => {
    paginationElement.addEventListener('click', () => {
      const currentPage = document.querySelector('.pagination-item.pagination-item--active')
      currentPage.classList.remove('pagination-item--active')
      paginationElement.classList.add('pagination-item--active')
      renderPage(idx + 1)
    })
  })
}

dropdownElements.forEach((dropdownElement) => {
  const dropdownItems = dropdownElement.querySelectorAll('.dropdown-option');

  // Listen event in dropdown item
  dropdownItems.forEach((dropdownItem) => {
    dropdownItem.addEventListener('click', () => {
      dropdownElement.querySelector('.search-current-option').innerText = dropdownItem.innerText
    });
  }); 
});


seeAllElements.forEach((seeAllElement) => {
  seeAllElement.addEventListener('click', () => {
    window.location.hash = '#shop-goods-list';
  });
});

async function getSearchResult(searchText) {
  const results = await getRequest.getSearchResult({text: searchText})

  const resultElements = results.map((result) => {
    return `<div class='dropdown-option'>${result.item.title}</div>`
    })
  resultSearchContainerElement.innerHTML = resultElements.join(" ")
}

inputSearchElement.addEventListener('input', () => {
  if (!inputSearchElement.value?.trim()) {
    return 
  }
  utilsFunc.debouncedFunc(() => getSearchResult(inputSearchElement.value), 500)()
})

headerTabElements.forEach((headerTabElement) => {
  headerTabElement.addEventListener('click', (e) => {
    headerTabUnderlineElement.style.left = e.target.offsetLeft + 'px'
    headerTabUnderlineElement.style.width = e.target.clientWidth + 'px'
  })
  
})
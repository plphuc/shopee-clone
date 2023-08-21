import * as utilsFunc from './utils.js'
import * as getRequest from './getRequests.js'
import { renderPage } from './renderLoadedData.js';

const seeAllElements = document.querySelectorAll(
  '.shop-collection--header--right'
);
const dropdownElements = document.querySelectorAll('.dropdown-list');
const inputSearchElement = document.querySelector('.header-searchbar--input')
const resultSearchContainerElement = document.querySelector('#search-result')
const paginationElements = document.querySelectorAll('.pagination-item')

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

paginationElements.forEach((paginationElement, idx) => {
  paginationElement.addEventListener('click', () => {
    console.log(idx);
  })
})
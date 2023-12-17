console.log('js');

const productCards = document.querySelector('.products__grid');
const loadMoreButton = document.querySelector('#load-more-button');

let displayedProducts = 4;

const response = await fetch('assets/src/products.json', {
  method: 'GET'
});

const products = await response.json();
console.log(products);

function displayProducts(start, end) {
  for (let i = start; i < end; i++) {
    const product = products[i];
    productCards.innerHTML += `
      <div class="product-card">
        <img class="product-card__img" src="${product.imgSrc}" alt="${product.title}">
        <h3 class="heading-tertiary product-card__title">${product.title}</h3>
        <p class="product-card__availability product-card__availability--yes">${product.availability}</p>
        <p class="product-card__price">${product.price} CZK</p>
        <div class="product-card__labels">
          ${product.flags.map((flag) => `<p class="product-card__label product-card__label--new">${flag}</p>`)}
        </div>
        <div class="product-card__button-wrapp"><button class="button button--cart"><img src="assets/icons/cart.svg" alt="nákupní košík"></button></div>
      </div>
    `;
  }
}

displayProducts(0, displayedProducts);

loadMoreButton.addEventListener('click', () => {
  displayedProducts += 8;
  // kontrola jestli ještě jsou produkty k zobrazení
  if (displayedProducts <= products.length) {
    // Zobrazit dalších 8 produktů
    displayProducts(displayedProducts - 8, displayedProducts);
  } else {
    loadMoreButton.style.display = 'none';
  }
});


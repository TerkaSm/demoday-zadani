console.log('js');
const productCards = document.querySelector('.products__grid');

const jsonUrl = 'assets/src/products.json';

// Fetch request pro získání dat z JSON souboru
fetch(jsonUrl)
  .then((response) => response.json())
  .then((data) => {
    // Zpracování dat a vytvoření obsahu pro prodejní kartu
    const cardContent = `
        <div class="product-card">
          <img class="product-card__img" src="${data.imgSrc}" alt="${
      data.title
    }">
          <h3 class="heading-tertiary product-card__title">${data.title}</h3>
          <p class="product-card__availability product-card__availability--yes">${
            data.availability
          }</p>
          <p class="product-card__price">${data.price} CZK</p>
          <div class="product-card__labels">
            // <p class="product-card__label product-card__label--new">Novinka</p>
            // <p class="product-card__label product-card__label--sale">Výprodej</p>
            ${
              Array.isArray(data.flags)
                ? data.flags
                    .map((flag) => `<p class="product-card__label">${flag}</p>`)
                    .join('')
                : ''
            }
          </div>
          <div class="product-card__button-wrapp"><button class="button button--cart"><img src="assets/icons/cart.svg" alt="nákupní košík"></button></div>
        </div>
        `;

    productCards.innerHTML = cardContent;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    productCards.innerHTML = 'Error loading data';
  });

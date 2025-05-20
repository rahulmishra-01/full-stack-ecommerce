import products from "./product.js"

document.addEventListener("DOMContentLoaded", function () {
    // console.log(productList)
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuPanel = document.getElementById("mobileMenuPanel");

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenuPanel.classList.toggle("active");
    // Close search if open
    mobileSearchContainer.classList.remove("active");
  });

  // Mobile search toggle
  const mobileSearchBtn = document.getElementById("mobileSearchBtn");
  const mobileSearchContainer = document.getElementById(
    "mobileSearchContainer"
  );
  const closeSearchBtn = document.getElementById("closeSearch");

  mobileSearchBtn.addEventListener("click", function () {
    mobileSearchContainer.classList.add("active");
    // Close menu if open
    mobileMenuPanel.classList.remove("active");
    // Focus on input when opened
    document.querySelector(".mobile-search-input").focus();
  });

  // Close search button
  closeSearchBtn.addEventListener("click", function () {
    mobileSearchContainer.classList.remove("active");
  });

  // Mobile dropdown toggle
  const shopLink = document.getElementById("shopLink");
  const shopDropdown = document.getElementById("shopDropdown");

  shopLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (shopDropdown.style.display === "block") {
      shopDropdown.style.display = "none";
      shopLink.innerHTML =
        'Shop <i class="fas fa-chevron-down" style="font-size: 12px; float: right;"></i>';
    } else {
      shopDropdown.style.display = "block";
      shopLink.innerHTML =
        'Shop <i class="fas fa-chevron-up" style="font-size: 12px; float: right;"></i>';
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !mobileMenuPanel.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      mobileMenuPanel.classList.remove("active");
    }
    if (
      !mobileSearchContainer.contains(event.target) &&
      !mobileSearchBtn.contains(event.target) &&
      !closeSearchBtn.contains(event.target)
    ) {
      mobileSearchContainer.classList.remove("active");
    }
  });



   const productsGrid = document.getElementById('productsGrid');
            const viewAllBtn = document.getElementById('viewAllBtn');
            let showingAll = false;
            const initialDisplayCount = 4;

            // Function to render stars based on rating
            function renderStars(rating) {
                let stars = '';
                const fullStars = Math.floor(rating);
                const hasHalfStar = rating % 1 >= 0.5;
                
                // Full stars
                for (let i = 0; i < fullStars; i++) {
                    stars += '<i class="fas fa-star"></i>';
                }
                
                // Half star
                if (hasHalfStar) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                }
                
                // Empty stars
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                for (let i = 0; i < emptyStars; i++) {
                    stars += '<i class="far fa-star"></i>';
                }
                
                return stars;
            }

            // Function to calculate discount percentage
            function calculateDiscount(currentPrice, oldPrice) {
                if (!oldPrice) return 0;
                return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
            }

            // Function to generate product card HTML
            function generateProductCard(product) {
                const discount = product.oldPrice ? calculateDiscount(product.currentPrice, product.oldPrice) : 0;
                
                return `
                    <div class="product-card" data-id="${product.id}">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${product.title}</h3>
                            <div class="product-rating">
                                <div class="stars">
                                    ${renderStars(product.rating)}
                                </div>
                                <span class="rating-value">${product.rating}/5</span>
                            </div>
                            <div class="price-container">
                                <span class="current-price">$${product.currentPrice.toFixed(2)}</span>
                                ${product.oldPrice ? `
                                    <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                                    <span class="discount">-${discount}%</span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }

            // Function to render products
            function renderProducts(count) {
                productsGrid.innerHTML = '';
                const productsToShow = count ? products.slice(0, count) : products;
                
                productsToShow.forEach(product => {
                    productsGrid.insertAdjacentHTML('beforeend', generateProductCard(product));
                });
            }

            // Initial render (show 4 products)
            renderProducts(initialDisplayCount);

            // View All button click handler
            viewAllBtn.addEventListener('click', function() {
                if (!showingAll) {
                    renderProducts(); // Show all products
                    viewAllBtn.textContent = 'Show Less';
                    showingAll = true;
                } else {
                    renderProducts(initialDisplayCount); // Show initial 4 products
                    viewAllBtn.textContent = 'View All';
                    showingAll = false;
                }
            });
});

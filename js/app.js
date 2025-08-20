// DOM Elements
const header = document.querySelector('.header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const scrollDownBtn = document.querySelector('.scroll-down');
const featuredProductsContainer = document.getElementById('featured-products-container');
const categoriesContainer = document.getElementById('categories-container');
const galleryContainer = document.getElementById('gallery-container');

// Data URLs - JSON files for dynamic content
const DATA_URLS = {
    products: 'data/products.json',
    categories: 'data/categories.json',
    gallery: 'data/gallery.json'
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load dynamic content
    loadFeaturedProducts();
    loadCategories();
    loadGallery();

    // Initialize event listeners
    initEventListeners();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Initialize event listeners
function initEventListeners() {
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            
            // Hide/show header based on scroll direction
            if (scrollTop > lastScrollTop) {
                // Scrolling down, hide header
                header.classList.add('header-hidden');
            } else {
                // Scrolling up, show header
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Mobile menu toggle

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            if(mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                const menuIcon = mobileMenuToggle.querySelector('i');
                if (menuIcon)  {
                    menuIcon.classList.remove('fa-close');
                    menuIcon.classList.add('fa-bars');
                }
            }
            else{
                navMenu.classList.add('active');
                mobileMenuToggle.classList.add('active');
                const menuIcon = mobileMenuToggle.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-close');
                }

            }
        });
    }

    // Close mobile menu when clicking a menu item
    const menuLinks = document.querySelectorAll('.nav-menu ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Scroll down button
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const featuredSection = document.getElementById('featured');
            featuredSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

        // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')
            && !navMenu.contains(e.target)
          && !mobileMenuToggle.contains(e.target)
        ){
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }

        if(!mobileMenuToggle.classList.contains('active')) {
            navMenu.classList.remove('active');
        }

    });
}

// Load featured products from JSON

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Toggle menu icon
    const menuIcon = mobileMenuToggle.querySelector('i');
    if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Load featured products from JSON
async function loadFeaturedProducts() {
    try {
        const response = await fetch(DATA_URLS.products);
        const allProducts = await response.json();
        
        // Filter only featured products
        const featuredProducts = allProducts.filter(product => product.featured === true);
        
        // Limit to 8 products for the homepage
        const limitedFeaturedProducts = featuredProducts.slice(0, 8);
        
        renderFeaturedProducts(limitedFeaturedProducts);
    } catch (error) {
        console.error('Error loading featured products:', error);
        if (featuredProductsContainer) {
            featuredProductsContainer.innerHTML = '<p class="error-message">Error loading products. Please refresh the page.</p>';
        }
    }
}

// Hide product description for featured products on home page
function renderFeaturedProductCard(product) {
    return `
    <div class="product-card">
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-footer">
                <a href="product.html?id=${product.id}" class="btn btn-outline btn-sm">View Details</a>
            </div>
        </div>
    </div>`;
}

// Render featured products
function renderFeaturedProducts(products) {
    const container = document.getElementById('featured-products-container');
    container.innerHTML = products.map(renderFeaturedProductCard).join('');
}

// Load categories from JSON
async function loadCategories() {
    try {
        // First load products to calculate product counts
        const productsResponse = await fetch(DATA_URLS.products);
        const productsData = await productsResponse.json();
        
        // Calculate product count for each category
        const productCounts = {};
        productsData.forEach(product => {
            if (!productCounts[product.categoryId]) {
                productCounts[product.categoryId] = 0;
            }
            productCounts[product.categoryId]++;
        });
        
        // Now load categories
        const categoriesResponse = await fetch(DATA_URLS.categories);
        const categoriesData = await categoriesResponse.json();
        
        if (categoriesContainer) {
            categoriesContainer.innerHTML = '';
            
            categoriesData.forEach(category => {
                // Add product count to each category
                const count = productCounts[category.id] || 0;
                const categoryCard = createCategoryCard(category, count);
                categoriesContainer.appendChild(categoryCard);
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        if (categoriesContainer) {
            categoriesContainer.innerHTML = '<p class="error-message">Error loading categories. Please refresh the page.</p>';
        }
    }
}

// Create category card element
function createCategoryCard(category, productCount) {
    const card = document.createElement('div');
    card.className = 'category-card';
    
    card.innerHTML = `
        <div class="category-image">
            <img src="${category.image}" alt="${category.name}">
        </div>
        <div class="category-overlay">
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${productCount} Products</p>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        window.location.href = `products.html?category=${category.id}`;
    });
    
    return card;
}

// Load gallery from JSON
async function loadGallery() {
    try {
        const response = await fetch(DATA_URLS.gallery);
        const data = await response.json();
        
        if (galleryContainer) {
            galleryContainer.innerHTML = '';
            
            // Only show the first 6 items in the preview
            const previewItems = data.slice(0, 6);
            
            previewItems.forEach(item => {
                const galleryItem = createGalleryItem(item);
                galleryContainer.appendChild(galleryItem);
            });
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
        if (galleryContainer) {
            galleryContainer.innerHTML = '<p class="error-message">Error loading gallery. Please refresh the page.</p>';
        }
    }
}

// Create gallery item element
function createGalleryItem(item) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    // Check if it's a video or image
    if (item.type === 'video') {
        galleryItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">
            <div class="gallery-overlay">
                <i class="fas fa-play-circle"></i>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openVideoModal(item);
        });
    } else {
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openImageModal(item);
        });
    }
    
    return galleryItem;
}

// Open video modal
function openVideoModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="video-container">
                <iframe src="${item.videoUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Open image modal
function openImageModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="image-container">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const scrollRevealElements = document.querySelectorAll('.section-header, .feature-card, .product-card, .category-card, .gallery-item');
    
    // Add scroll-reveal class to elements
    scrollRevealElements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        // Add staggered delay for a cascading effect
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Check which elements are in viewport
    function checkScroll() {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            if (scrollValue < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrollValue * 0.5}px`;
            }
        });
    }
    
    // Add smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

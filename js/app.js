// DOM Elements
const header = document.querySelector('.header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const navMenu = document.querySelector('.nav-menu');
const scrollDownBtn = document.querySelector('.scroll-down');
const featuredProductsContainer = document.getElementById('featured-products-container');
const categoriesContainer = document.getElementById('categories-container');
const galleryContainer = document.getElementById('gallery-container');

// Data URLs - JSON files for dynamic content
const DATA_URLS = {
    featuredProducts: 'data/featured-products.json',
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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            mobileMenuToggle.classList.add('active');
        });
    }

    // Mobile menu close button
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
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
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
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
        const response = await fetch(DATA_URLS.featuredProducts);
        const data = await response.json();
        
        if (featuredProductsContainer) {
            featuredProductsContainer.innerHTML = '';
            
            data.forEach(product => {
                const productCard = createProductCard(product);
                featuredProductsContainer.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error('Error loading featured products:', error);
        // Fallback with sample data if JSON fails to load
        loadSampleFeaturedProducts();
    }
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
                <a href="product-details.html?id=${product.id}" class="btn btn-outline">View Details</a>
            </div>
        </div>
    `;
    
    return card;
}

// Load categories from JSON
async function loadCategories() {
    try {
        const response = await fetch(DATA_URLS.categories);
        const data = await response.json();
        
        if (categoriesContainer) {
            categoriesContainer.innerHTML = '';
            
            data.forEach(category => {
                const categoryCard = createCategoryCard(category);
                categoriesContainer.appendChild(categoryCard);
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        // Fallback with sample data if JSON fails to load
        loadSampleCategories();
    }
}

// Create category card element
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    
    card.innerHTML = `
        <div class="category-image">
            <img src="${category.image}" alt="${category.name}">
        </div>
        <div class="category-overlay">
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.productCount} Products</p>
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
        // Fallback with sample data if JSON fails to load
        loadSampleGallery();
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

// Fallback functions if JSON fails to load
function loadSampleFeaturedProducts() {
    if (featuredProductsContainer) {
        const sampleProducts = [
            {
                id: 1,
                name: "LED Light Bar 52\"",
                description: "Super bright LED light bar for off-road vehicles",
                image: "images/products/light-bar.jpg"
            },
            {
                id: 2,
                name: "Fog Lights Kit",
                description: "Waterproof fog lights with universal mounting",
                image: "images/products/fog-lights.jpg"
            },
            {
                id: 3,
                name: "Headlight Upgrade Kit",
                description: "High-performance LED headlight upgrade",
                image: "images/products/headlight.jpg"
            },
            {
                id: 4,
                name: "Work Light 4\"",
                description: "Compact work light for various applications",
                image: "images/products/work-light.jpg"
            }
        ];
        
        featuredProductsContainer.innerHTML = '';
        
        sampleProducts.forEach(product => {
            const productCard = createProductCard(product);
            featuredProductsContainer.appendChild(productCard);
        });
    }
}

function loadSampleCategories() {
    if (categoriesContainer) {
        const sampleCategories = [
            {
                id: 1,
                name: "Light Bars",
                productCount: 24,
                image: "images/categories/light-bars.jpg"
            },
            {
                id: 2,
                name: "Fog Lights",
                productCount: 16,
                image: "images/categories/fog-lights.jpg"
            },
            {
                id: 3,
                name: "Headlights",
                productCount: 12,
                image: "images/categories/headlights.jpg"
            },
            {
                id: 4,
                name: "Work Lights",
                productCount: 18,
                image: "images/categories/work-lights.jpg"
            }
        ];
        
        categoriesContainer.innerHTML = '';
        
        sampleCategories.forEach(category => {
            const categoryCard = createCategoryCard(category);
            categoriesContainer.appendChild(categoryCard);
        });
    }
}

function loadSampleGallery() {
    if (galleryContainer) {
        const sampleGallery = [
            {
                id: 1,
                title: "Offroad Light Setup",
                description: "MotoRanger lights on a 4x4 vehicle",
                image: "images/gallery/gallery-1.jpg",
                type: "image"
            },
            {
                id: 2,
                title: "Night Trail Run",
                description: "Testing our lights on a night trail",
                thumbnail: "images/gallery/gallery-2-thumb.jpg",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                type: "video"
            },
            {
                id: 3,
                title: "Light Bar Installation",
                description: "Step-by-step installation guide",
                image: "images/gallery/gallery-3.jpg",
                type: "image"
            },
            {
                id: 4,
                title: "Product Showcase",
                description: "MotoRanger product lineup",
                image: "images/gallery/gallery-4.jpg",
                type: "image"
            },
            {
                id: 5,
                title: "Customer Installation",
                description: "Customer vehicle with our lights",
                image: "images/gallery/gallery-5.jpg",
                type: "image"
            },
            {
                id: 6,
                title: "Beam Pattern Test",
                description: "Testing beam patterns at night",
                image: "images/gallery/gallery-6.jpg",
                type: "image"
            }
        ];
        
        galleryContainer.innerHTML = '';
        
        sampleGallery.slice(0, 6).forEach(item => {
            const galleryItem = createGalleryItem(item);
            galleryContainer.appendChild(galleryItem);
        });
    }
}

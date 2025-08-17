/**
 * BlackDSN-inspired Slideshow Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the slider
    initSlider();
    
    // Load images for slides
    loadSlideImages();
});

function initSlider() {
    const slider = document.querySelector('.dsn-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide-item');
    const totalSlides = slides.length;
    const progressLine = slider.querySelector('.progress-line');
    const currentSlideEl = slider.querySelector('.slider-nav-count .current');
    const totalSlidesEl = slider.querySelector('.slider-nav-count .total');
    const dots = slider.querySelectorAll('.dot');
    
    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    
    // Set total slides count
    if (totalSlidesEl) {
        totalSlidesEl.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
    }
    
    // Update current slide number
    function updateSlideNumber() {
        if (currentSlideEl) {
            currentSlideEl.textContent = currentSlide + 1 < 10 ? `0${currentSlide + 1}` : currentSlide + 1;
        }
    }
    
    // Update active dot
    function updateActiveDot() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Start progress bar animation
    function startProgress() {
        // Reset progress
        if (progressLine) {
            progressLine.style.width = '0%';
        }
        
        // Animate progress over 7 seconds
        let progress = 0;
        const duration = 7000; // 7 seconds
        const interval = 20; // update every 20ms
        const increment = (interval / duration) * 100;
        
        clearInterval(progressInterval);
        
        progressInterval = setInterval(() => {
            progress += increment;
            if (progressLine) {
                progressLine.style.width = `${progress}%`;
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, interval);
    }
    
    // Apply animation classes for slide transitions
    function animateSlideTransition(nextIndex) {
        // Add animation classes to current slide for exit
        slides[currentSlide].classList.add('slide-exit');
        
        // Wait for exit animation to complete
        setTimeout(() => {
            // Remove active and exit classes from current slide
            slides[currentSlide].classList.remove('active', 'slide-exit');
            
            // Update current slide index
            currentSlide = (nextIndex + totalSlides) % totalSlides;
            
            // Add active and enter classes to new slide
            slides[currentSlide].classList.add('active', 'slide-enter');
            
            // Update UI elements
            updateSlideNumber();
            updateActiveDot();
            
            // Start progress bar
            startProgress();
            
            // Remove enter class after animation completes
            setTimeout(() => {
                slides[currentSlide].classList.remove('slide-enter');
            }, 1000);
        }, 400);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index === currentSlide) return;
        animateSlideTransition(index);
    }
    
    // Go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Set up auto rotation
    function startAutoRotation() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
    }
    
    // Initialize the slider
    // Show the first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    updateSlideNumber();
    updateActiveDot();
    startProgress();
    startAutoRotation();
    
    // Set up event listeners for dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
            startAutoRotation(); // Reset auto rotation timer
        });
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            nextSlide();
            startAutoRotation();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            prevSlide();
            startAutoRotation();
        }
    }
}

function loadSlideImages() {
    // Get all elements with data-image-src attribute
    const imageElements = document.querySelectorAll('.image-bg[data-image-src]');
    
    // Create an array to track loaded images
    const imagePromises = [];
    
    // Set background image for each element and preload images
    imageElements.forEach(element => {
        const imageSrc = element.getAttribute('data-image-src');
        if (imageSrc) {
            // Create a promise to track when the image is loaded
            const promise = new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    // Apply the background image once loaded
                    element.style.backgroundImage = `url(${imageSrc})`;
                    resolve();
                };
                img.onerror = reject;
                img.src = imageSrc;
            });
            
            imagePromises.push(promise);
        }
    });
    
    // When all images are loaded, ensure the first slide is visible
    Promise.all(imagePromises).then(() => {
        console.log('All slideshow images loaded successfully');
    }).catch(error => {
        console.error('Error loading slideshow images:', error);
    });
}

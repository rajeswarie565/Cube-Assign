/* ============================================
   GTG Perfumes - Main JavaScript
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // Navigation Module
    // ============================================
    const nav = {
        init: function() {
            const hamburger = document.getElementById('hamburger');
            const navList = document.getElementById('nav-list');
            const navLinks = navList.querySelectorAll('a');

            if (!hamburger || !navList) return;

            // Toggle menu
            hamburger.addEventListener('click', () => {
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                hamburger.setAttribute('aria-expanded', !isExpanded);
                navList.classList.toggle('active');
            });

            // Keyboard support for hamburger
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hamburger.click();
                }
            });

            // Close menu when clicking nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navList.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navList.classList.remove('active');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navList.classList.contains('active')) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navList.classList.remove('active');
                    hamburger.focus();
                }
            });
        }
    };

    // ============================================
    // Gallery Module
    // ============================================
    const gallery = {
        currentIndex: 0,
        images: [],
        mainImage: null,
        prevBtn: null,
        nextBtn: null,
        dotsContainer: null,
        thumbnailsContainer: null,

        init: function() {
            // Define gallery images
            this.images = [
                'images/products/main-product.png',
                'images/products/thumbnails/thumb-1.png',
                'images/products/thumbnails/thumb-2.png',
                'images/products/thumbnails/thumb-3.png',
                'images/products/thumbnails/thumb-4.png',
                'images/products/thumbnails/thumb-5.png',
                'images/products/thumbnails/thumb-6.png',
                'images/products/thumbnails/thumb-7.png',
                'images/products/thumbnails/thumb-8.png'
            ];

            this.mainImage = document.getElementById('gallery-main-image');
            this.prevBtn = document.getElementById('gallery-prev');
            this.nextBtn = document.getElementById('gallery-next');
            this.dotsContainer = document.getElementById('gallery-dots');
            this.thumbnailsContainer = document.getElementById('gallery-thumbnails');

            if (!this.mainImage || !this.prevBtn || !this.nextBtn) return;

            // Create dots
            this.createDots();

            // Create thumbnails
            this.createThumbnails();

            // Event listeners
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());

            // Keyboard navigation
            this.mainImage.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });

            // Initialize
            this.updateGallery();
        },

        createDots: function() {
            if (!this.dotsContainer) return;

            this.dotsContainer.innerHTML = '';
            this.images.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'gallery-dot';
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Go to image ${index + 1}`);
                dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
                dot.addEventListener('click', () => this.goTo(index));
                this.dotsContainer.appendChild(dot);
            });
        },

        createThumbnails: function() {
            if (!this.thumbnailsContainer) return;

            this.thumbnailsContainer.innerHTML = '';
            this.images.forEach((imagePath, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'gallery-thumbnail';
                thumbnail.setAttribute('role', 'button');
                thumbnail.setAttribute('tabindex', '0');
                thumbnail.setAttribute('aria-label', `View image ${index + 1}`);

                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Product thumbnail ${index + 1}`;
                img.loading = index < 4 ? 'eager' : 'lazy';

                thumbnail.appendChild(img);
                thumbnail.addEventListener('click', () => this.goTo(index));
                thumbnail.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goTo(index);
                    }
                });

                this.thumbnailsContainer.appendChild(thumbnail);
            });
        },

        goTo: function(index) {
            if (index < 0 || index >= this.images.length) return;
            this.currentIndex = index;
            this.updateGallery();
        },

        prev: function() {
            const newIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
            this.goTo(newIndex);
        },

        next: function() {
            const newIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
            this.goTo(newIndex);
        },

        updateGallery: function() {
            // Update main image
            if (this.mainImage) {
                this.mainImage.src = this.images[this.currentIndex];
                this.mainImage.alt = `GTG Perfume Product - Image ${this.currentIndex + 1}`;
            }

            // Update dots
            const dots = this.dotsContainer?.querySelectorAll('.gallery-dot');
            if (dots) {
                dots.forEach((dot, index) => {
                    if (index === this.currentIndex) {
                        dot.classList.add('active');
                        dot.setAttribute('aria-selected', 'true');
                    } else {
                        dot.classList.remove('active');
                        dot.setAttribute('aria-selected', 'false');
                    }
                });
            }

            // Update thumbnails
            const thumbnails = this.thumbnailsContainer?.querySelectorAll('.gallery-thumbnail');
            if (thumbnails) {
                thumbnails.forEach((thumb, index) => {
                    if (index === this.currentIndex) {
                        thumb.classList.add('active');
                    } else {
                        thumb.classList.remove('active');
                    }
                });
            }
        }
    };

    // ============================================
    // Radio Groups & Add-to-Cart Module
    // ============================================
    const radios = {
        fragranceRadios: null,
        purchaseRadios: null,
        addToCartBtn: null,
        singleSubDetails: null,
        doubleSubDetails: null,
        onetimeSubDetails: null,

        init: function() {
            this.fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
            this.purchaseRadios = document.querySelectorAll('input[name="subscription-type"]');
            this.addToCartBtn = document.getElementById('add-to-cart-btn');
            this.singleSubDetails = document.getElementById('single-sub-details');
            this.doubleSubDetails = document.getElementById('double-sub-details');
            this.onetimeSubDetails = document.getElementById('onetime-sub-details');

            if (!this.fragranceRadios.length || !this.purchaseRadios.length || !this.addToCartBtn) return;

            // Event listeners for fragrance selection
            this.fragranceRadios.forEach(radio => {
                radio.addEventListener('change', () => this.updateCartLink());
            });

            // Event listeners for purchase type selection
            this.purchaseRadios.forEach(radio => {
                radio.addEventListener('change', () => {
                    this.toggleSubscriptionDetails();
                    this.updateCartLink();
                });
            });

            // Initialize
            this.toggleSubscriptionDetails();
            this.updateCartLink();
        },

        getSelectedFragrance: function() {
            const selected = Array.from(this.fragranceRadios).find(r => r.checked);
            return selected ? {
                value: selected.value,
                id: selected.getAttribute('data-frag'),
                name: selected.nextElementSibling?.querySelector('.fragrance-name')?.textContent || selected.value
            } : null;
        },

        getSelectedPurchase: function() {
            const selected = Array.from(this.purchaseRadios).find(r => r.checked);
            return selected ? {
                value: selected.value,
                id: selected.getAttribute('data-purchase'),
                label: selected.nextElementSibling?.querySelector('.pricing-label')?.textContent || selected.value
            } : null;
        },

        updateCartLink: function() {
            const fragrance = this.getSelectedFragrance();
            const purchase = this.getSelectedPurchase();

            if (!fragrance || !purchase) return;

            // Compose URL
            const baseUrl = 'https://example.com/cart';
            const url = `${baseUrl}?frag=${fragrance.id}&type=${purchase.id}`;

            // Update href
            this.addToCartBtn.href = url;

            // Update aria-label for accessibility
            const ariaLabel = `Add to cart: ${fragrance.name}, ${purchase.label}`;
            this.addToCartBtn.setAttribute('aria-label', ariaLabel);

            // Update button text (optional, can keep static or make dynamic)
            // this.addToCartBtn.textContent = `Add to Cart - ${fragrance.name} (${purchase.label})`;
        },

        toggleSubscriptionDetails: function() {
            const selectedPurchase = this.getSelectedPurchase();
            
            if (!selectedPurchase) return;

            // Hide all initially
            if (this.singleSubDetails) {
                this.singleSubDetails.style.display = 'none';
            }
            if (this.doubleSubDetails) {
                this.doubleSubDetails.style.display = 'none';
            }
            if (this.onetimeSubDetails) {
                this.onetimeSubDetails.style.display = 'none';
            }

            // Show relevant details
            if (selectedPurchase.value === 'single' && this.singleSubDetails) {
                this.singleSubDetails.style.display = 'block';
                // Smooth scroll to details if needed
                setTimeout(() => {
                    this.singleSubDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else if (selectedPurchase.value === 'double' && this.doubleSubDetails) {
                this.doubleSubDetails.style.display = 'block';
                setTimeout(() => {
                    this.doubleSubDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else if (selectedPurchase.value === 'onetime' && this.onetimeSubDetails) {
                this.onetimeSubDetails.style.display = 'block';
                setTimeout(() => {
                    this.onetimeSubDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        }
    };

    // ============================================
    // Counter Animation Module
    // ============================================
    const counters = {
        animated: false,
        counters: null,

        init: function() {
            this.counters = document.querySelectorAll('.stat-percentage');
            if (!this.counters.length) return;

            // Check if IntersectionObserver is supported
            if (!('IntersectionObserver' in window)) {
                // Fallback: animate immediately
                this.animateCounters();
                return;
            }

            // Create observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animated) {
                        this.animateCounters();
                        this.animated = true;
                        observer.disconnect();
                    }
                });
            }, {
                threshold: 0.5,
                rootMargin: '0px'
            });

            // Observe the stats section
            const statsSection = document.getElementById('stats');
            if (statsSection) {
                observer.observe(statsSection);
            } else {
                // Fallback if section not found
                this.animateCounters();
            }
        },

        animateCounters: function() {
            this.counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                if (isNaN(target)) return;

                const duration = 1200; // milliseconds
                const startTime = performance.now();
                const startValue = 0;

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function (ease-out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

                    counter.textContent = currentValue + '%';

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target + '%';
                    }
                };

                requestAnimationFrame(animate);
            });
        }
    };

    // ============================================
    // Accordion Module (for Collection Section)
    // ============================================
    const accordion = {
        init: function() {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            
            accordionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const isExpanded = header.getAttribute('aria-expanded') === 'true';
                    const content = header.nextElementSibling;

                    // Close all other accordions (optional - remove if you want multiple open)
                    accordionHeaders.forEach(otherHeader => {
                        if (otherHeader !== header) {
                            otherHeader.setAttribute('aria-expanded', 'false');
                            const otherContent = otherHeader.nextElementSibling;
                            if (otherContent) {
                                otherContent.style.maxHeight = '0';
                            }
                        }
                    });

                    // Toggle current accordion
                    header.setAttribute('aria-expanded', !isExpanded);
                    if (content) {
                        if (!isExpanded) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        } else {
                            content.style.maxHeight = '0';
                        }
                    }
                });

                // Keyboard support
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });
            });
        }
    };

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    const smoothScroll = {
        init: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#' || href === '#home') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        return;
                    }

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // ============================================
    // Newsletter Form Module
    // ============================================
    const newsletter = {
        init: function() {
            const form = document.querySelector('.newsletter-form');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('newsletter-email');
                const email = emailInput.value.trim();

                if (email && this.isValidEmail(email)) {
                    // Here you would typically send the email to your backend
                    console.log('Newsletter subscription:', email);
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                    emailInput.focus();
                }
            });
        },

        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    };

    // ============================================
    // Initialize All Modules
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        nav.init();
        gallery.init();
        radios.init();
        counters.init();
        accordion.init();
        smoothScroll.init();
        newsletter.init();

        // Log initialization (remove in production)
        console.log('GTG Perfumes website initialized');
    });

    // ============================================
    // Export for testing (if needed)
    // ============================================
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { nav, gallery, radios, counters, accordion, newsletter };
    }

})();


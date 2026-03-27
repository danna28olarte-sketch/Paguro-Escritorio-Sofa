/**
 * Main JavaScript for Pagureo Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('[class*="reveal-"]');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all the other items first if we want only one open at a time
            // (Optional, uncomment below to enable accordion behavior)
            /*
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = null;
            });
            */
            
            // Toggle the current item
            item.classList.toggle('active');
            
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 3. Color Selector Logic
    const colorButtons = document.querySelectorAll('.color-btn');
    const mainColorImage = document.getElementById('mainColorImage');
    const currentColorName = document.getElementById('currentColorName');
    
    if (colorButtons.length > 0 && mainColorImage && currentColorName) {
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                colorButtons.forEach(b => b.classList.remove('active'));
                
                // Add active to clicked
                btn.classList.add('active');
                
                // Update text
                const name = btn.getAttribute('data-name');
                currentColorName.textContent = name;
                
                // Update image with animation
                const newImgSrc = btn.getAttribute('data-image');
                if (mainColorImage.getAttribute('src') !== newImgSrc) {
                    mainColorImage.classList.add('fade');
                    
                    setTimeout(() => {
                        mainColorImage.setAttribute('src', newImgSrc);
                        setTimeout(() => {
                            mainColorImage.classList.remove('fade');
                        }, 50);
                    }, 200); // match halfway through css transition
                }
            });
        });
    }
});

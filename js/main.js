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
                const material = btn.getAttribute('data-material') || '';
                if(material) {
                    currentColorName.innerHTML = `${name} <span class="material-text font-normal text-gray-500" style="font-weight:400; color:var(--color-body); font-size: 1rem;">- ${material}</span>`;
                } else {
                    currentColorName.textContent = name;
                }
                
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

    // 4. Countdown Timer Logic (Local Storage / 4 hours daily)
    const countdownTimer = () => {
        const hoursEl = document.getElementById('timer-hours');
        const minutesEl = document.getElementById('timer-minutes');
        const secondsEl = document.getElementById('timer-seconds');
        
        if (!hoursEl || !minutesEl || !secondsEl) return;
        
        // 4 hours in ms
        const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;
        
        // Get today's start at midnight
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        
        const storageKey = 'pagureo_promo_endtime';
        const storageDayKey = 'pagureo_promo_day';
        
        let endTime = localStorage.getItem(storageKey);
        let savedDay = localStorage.getItem(storageDayKey);
        
        // If this is a new day or we have no saved time, reset it
        if (!endTime || !savedDay || parseInt(savedDay) !== startOfDay) {
            endTime = new Date().getTime() + FOUR_HOURS_MS;
            localStorage.setItem(storageKey, endTime);
            localStorage.setItem(storageDayKey, startOfDay);
        } else {
            endTime = parseInt(endTime);
        }
        
        const updateTimer = () => {
            const currentTime = new Date().getTime();
            let distance = endTime - currentTime;
            
            // If timer runs out, keep it at 00:00:00
            if (distance < 0) {
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        };
        
        updateTimer();
        setInterval(updateTimer, 1000);
    };
    
    countdownTimer();
});

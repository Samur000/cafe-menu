document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки категорий и секции меню
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    // Функция для переключения категорий
    function switchCategory(targetCategory) {
        // Убираем активный класс со всех кнопок и секций
        categoryButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        menuSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Добавляем активный класс к выбранной кнопке и секции
        const activeButton = document.querySelector(`[data-category="${targetCategory}"]`);
        const activeSection = document.getElementById(targetCategory);
        
        if (activeButton && activeSection) {
            activeButton.classList.add('active');
            activeSection.classList.add('active');
        }
    }
    
    // Добавляем обработчики событий для каждой кнопки категории
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Добавляем эффект нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Переключаем категорию
            switchCategory(targetCategory);
            
            // Плавная прокрутка к началу меню
            setTimeout(() => {
                document.querySelector('.menu-content').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
        
        // Добавляем эффект при наведении
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Добавляем поддержку клавиатуры
    document.addEventListener('keydown', function(event) {
        const activeButton = document.querySelector('.category-btn.active');
        const activeIndex = Array.from(categoryButtons).indexOf(activeButton);
        
        if (event.key === 'ArrowLeft' && activeIndex > 0) {
            const prevButton = categoryButtons[activeIndex - 1];
            const prevCategory = prevButton.getAttribute('data-category');
            switchCategory(prevCategory);
            prevButton.focus();
        } else if (event.key === 'ArrowRight' && activeIndex < categoryButtons.length - 1) {
            const nextButton = categoryButtons[activeIndex + 1];
            const nextCategory = nextButton.getAttribute('data-category');
            switchCategory(nextCategory);
            nextButton.focus();
        }
    });
    
    // Анимация появления элементов меню
    function animateMenuItems() {
        const activeSection = document.querySelector('.menu-section.active');
        if (activeSection) {
            const menuItems = activeSection.querySelectorAll('.menu-item');
            menuItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('animate-in');
            });
        }
    }
    
    // Наблюдаем за изменениями в секциях меню
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('active')) {
                    setTimeout(animateMenuItems, 100);
                }
            }
        });
    });
    
    menuSections.forEach(section => {
        observer.observe(section, { attributes: true });
    });
    
    // Инициализация - показываем первую категорию
    switchCategory('breakfast');
    
    // Добавляем эффект загрузки страницы
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Добавляем индикатор загрузки для кнопок
    function showLoadingIndicator(button) {
        const originalText = button.textContent;
        button.textContent = 'Загрузка...';
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.opacity = '1';
        }, 200);
    }
    
    // Применяем индикатор загрузки к кнопкам
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            showLoadingIndicator(this);
        });
    });
    
    // Добавляем эффект параллакса для изображений
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const image = item.querySelector('.item-image img');
        
        item.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
        });
    });
    
    // Добавляем эффект печатания для заголовка
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Применяем эффект печатания к заголовку при загрузке
    window.addEventListener('load', function() {
        const title = document.querySelector('.august');
        const originalText = title.textContent;
        setTimeout(() => {
            typeWriter(title, originalText, 150);
        }, 500);
    });
    
    // Добавляем плавное появление элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами меню
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(item);
    });
    
    // Добавляем звуковые эффекты (опционально)
    function playClickSound() {
        // Создаем простой звуковой эффект
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Добавляем звук при клике на кнопки (можно отключить)
    // categoryButtons.forEach(button => {
    //     button.addEventListener('click', playClickSound);
    // });
});


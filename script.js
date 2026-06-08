// Функция переключения экранов
function openScreen(screenId) {
    // Прячем все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Показываем нужный экран
    document.getElementById(screenId).classList.add('active');
    // Сбрасываем скролл наверх
    window.scrollTo(0, 0);
}

// Функция перехода на форму с предзаполнением названия услуги
function goToForm(serviceName) {
    // Записываем название услуги в инпут формы
    document.getElementById('service-name').value = serviceName;
    
    // Сбрасываем остальные поля формы для новой заявки
    document.getElementById('room-number').value = '';
    document.getElementById('guests-count').value = '1';
    document.getElementById('comment').value = '';
    
    // Переключаем на экран формы
    openScreen('screen-form');
}

// Изменение количества гостей (счетчик)
function changeGuests(amount) {
    const counterInput = document.getElementById('guests-count');
    let currentValue = parseInt(counterInput.value);
    
    currentValue += amount;
    
    // Ограничение: минимум 1 гость, максимум 10
    if (currentValue < 1) currentValue = 1;
    if (currentValue > 10) currentValue = 10;
    
    counterInput.value = currentValue;
}

// Обработка отправки формы заявки
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Отменяем перезагрузку страницы

    // Собираем данные из полей
    const room = document.getElementById('room-number').value;
    const service = document.getElementById('service-name').value;
    const guests = document.getElementById('guests-count').value;
    const comment = document.getElementById('comment').value;

    // Настройки для отправки почты
    const emailTo = "kiber1vn@gmail.com";
    const subject = encodeURIComponent(`Booking Request - Room ${room}`);
    const body = encodeURIComponent(
        `Application Data:\n\n` +
        `Room Number: ${room}\n` +
        `Service Name: ${service}\n` +
        `Number of Guests: ${guests}\n` +
        `Comment: ${comment}`
    );

    // Открываем почтовое приложение устройства
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    // Переключаемся на экран "Форма заявки 2" (Экран успеха)
    openScreen('screen-success');
});
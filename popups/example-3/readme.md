popup-window, example 3
======
Третий вариант всплывающего окна, никакого JavaScript, только CSS + HTML.

##### Плюсы:
* Расположен точно в центре экрана
* Растягивается в соответствии с контентом
* Поддерживает теги внутри себя
* Протестирован и работает в Chrome, IE, Firefox и Safari
* Контент, расположенный "под" попапом, не кликабелен
* Не требует поддержки JavaScript
* Позволяет связать кнопку/ссылку/закладку на странице с popup-ом (пример ниже).
* Анимация появления на CSS3

##### Минусы:
* Для каждого popup-a необходмо прописать в таблице стилей `#id:target { display: block; }`
* z-index
* Весьма сложно реализовать анимацию исчезновения popup-a
* Анимация появления может не работать на старых браузерах

##### Пример связывания ссылки и popup-a
Переход по ссылке `#popup-1` делает элемент с `id = popup-1` выбранным, в итоге используя для элемента `#id:target { display: block; }`,
 перезаписывая таким образом `display: none;`, заданный ранее для самого popup-a.
```html
<div class="popup" id="popup-1">
    <div class="content">
        <a class="close-btn" href="#">x</a>
        <div class="header">Заголовок</div>
        <p>Содержимое</p>
    </div>
</div>
<a class="btn" href="#popup-1">Show Popup</a>
```
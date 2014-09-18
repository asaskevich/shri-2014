var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = (w.innerWidth || e.clientWidth || g.clientWidth) * 0.95,
    height = (w.innerHeight || e.clientHeight || g.clientHeight) * 0.95;

var bodySelection = d3.select("body");
// Координаты мыши
var coordinates = [0, 0];
var svgSelection = bodySelection.append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", function (d, i) {
        coordinates = d3.mouse(this)
    });

// Массив "шариков"
var circles = [];
for (var i = 0; i < 1000; i++)
    circles[i] = svgSelection.append("circle")
        .attr("cx", Math.random() * width)                          // Координата Х
        .attr("cy", Math.random() * height)                         // Координата У
        .attr("r", 4)                                               // Радиус точки
        .attr("speed", Math.abs(Math.random() * 20 - Math.random() * 20) + 10)     // Модуль скорости движения точки
        .attr("color", Math.random() * 255)                         // Цвет (канал Green)
        .attr("step", Math.random() * 20 - Math.random() * 20)      // Скорость и направление изменения цвета
        .style("fill", "red");                                      // Цвет по умолчанию - красный

// Обновляет состояние поля
setInterval(function () {
    // Генерирует новый цвет для шарика
    function getColor(circle) {
        var color = parseInt(circle.attr("color"));
        var step = parseInt(circle.attr("step"));
        color += step;
        if (color < 0) {
            color = 0;
            step = -step;
        } else if (color > 255) {
            color = 255;
            step = -step;
        }
        var rgb = "rgb(255, " + Math.floor(color) + ", 0)";
        // Сохраняет новый цвет, скорость и направление его изменения
        circle.style("fill", rgb);
        circle.attr("color", color);
        circle.attr("step", step);
    }

    var mouse_x = coordinates[0];
    var mouse_y = coordinates[1];
    for (var i = 0; i < circles.length; i++) {
        getColor(circles[i]);
        // Изменяет координаты в соответствии со скоростью и направлением движения
        var speed = parseInt(circles[i].attr("speed"));
        var x = parseInt(circles[i].attr("cx")) + (speed * Math.random() - speed * Math.random());
        var y = parseInt(circles[i].attr("cy")) + (speed * Math.random() - speed * Math.random());
        // Если шарик вышел за пределы экрана, вернуть его
        if (x >= width || x <= 0) x = Math.random() * width;
        if (y >= height || y <= 0) y = Math.random() * height;
        circles[i].attr("cx", x);
        circles[i].attr("cy", y);
        // Вычисление расстояния от шарика до курсора
        var dx = Math.abs(x - mouse_x);
        var dy = Math.abs(y - mouse_y);
        var dist = Math.sqrt(dx * dx + dy * dy);
        // Если расстояние меньше ста пикселей, то двигать шарик от мыши
        if (dist < 100) {
            var angle = 0;
            var best_x = x;
            var best_y = y;
            var best_dist = 0;
            while (angle < Math.PI * 2) {
                var temp_x = x + speed * Math.sin(angle);
                var temp_y = y + speed * Math.cos(angle);
                dx = Math.abs(temp_x - mouse_x);
                dy = Math.abs(temp_y - mouse_y);
                dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > best_dist) {
                    best_dist = dist;
                    best_x = temp_x;
                    best_y = temp_y;
                }
                angle += 0.2;
            }
            circles[i].attr("cx", best_x);
            circles[i].attr("cy", best_y);
        }
    }
}, 1);
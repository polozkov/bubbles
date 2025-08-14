// глобальный объект со всей моей игрой
let G = {
    //точка на двумерной плоскости (координата - обычно из двух целых чисел, но не обязательно)
    F_XY: function (x, y) { this.x = x, this.y = y; },

    //стиль - залтвка, обводка, толщина обводки
    F_STYLE: function (color_fill, color_stroke, width_stroke, line_cap = "round") {
        this.color_fill = color_fill;
        this.color_stroke = color_stroke;
        this.width_stroke = width_stroke;
        this.line_cap = line_cap;
    },

    //левый верхний угол; размеры ячейки; количесво ячеек (на квадратной доске)
    F_LEFT_TOP: function (LEFT_TOP_CORNER, CELL, N) {
        this.CORNER = LEFT_TOP_CORNER; //объект "X,Y"
        this.N = N; //количество клеток на поле (поле квадратное)
        this.CELL = CELL; //размер  - одно число (так как клетка квадратная)
    },

    F_TASK: null,

    //настройки цветов
    RGB: {},
    //настройка внешнего вида (но не цветов)
    VIEW: {font_family: "SchoolBook, Arial, sans-serif"},

    //база данных с заданиями
    DATA: {},

    //всё для прорисовки (холст, буфер для отрисовки без мерцания, размеры холста)
    DRAW: {canvas: null, ctx: null, wh: null },

    EL: {button_submit: null, input_number: null},

    TASKS: {task_active: null},
};

G.f_rgba_to_str = (a) => ('RGBA(' + a[0] + ',' + a[1] + ',' + a[2] + ',' + (a[3] / 255).toFixed(4) + ')');

G.F_STYLE.prototype.f_get_color_fill = function () { return G.f_rgba_to_str(this.color_fill); };
G.F_STYLE.prototype.f_get_color_stroke = function () {return G.f_rgba_to_str(this.color_stroke); };

G.F_STYLE.prototype.f_get_width_stroke = function () {
    let ratio = 1;
    return (this.width_stroke * ratio);
};

G.F_STYLE.prototype.f_set_ctx_style = function(ctx = G.DRAW.ctx) {
    ctx.fillStyle = this.f_get_color_fill();
    ctx.strokeStyle = this.f_get_color_stroke();
    ctx.lineWidth = this.f_get_width_stroke();
    ctx.lineCap = this.line_cap
};



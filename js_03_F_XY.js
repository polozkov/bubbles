//стандартные операции с двумерными точками
(function f_set_prototype_F_XY() {
    //если координаты совпадают, то для короткой записи вызывай функцию без new и с одним параметром
    G.F_NN = function (n = 0) { return new G.F_XY(n, n); };
    //копия объекта
    G.F_XY.prototype.f_get_copy = function () { return new G.F_XY(this.x, this.y); };
    G.F_XY.prototype.f_get_swap = function () { return new G.F_XY(this.y, this.x); };
    //верни массив (x,y)
    G.F_XY.prototype.f_get_arr = function () { return [this.x, this.y]; };

    //операция + (плюс)
    G.F_XY.prototype.f_add = function (p) { return new G.F_XY(this.x + p.x, this.y + p.y); };
    G.F_XY.prototype.f_add_n_n = function (n) { return new G.F_XY(this.x + n, this.y + n); };
    G.F_XY.prototype.f_add_x_y = function (x, y) { return new G.F_XY(this.x + x, this.y + y); };
    G.F_XY.prototype.f_add_y = function (y) { return new G.F_XY(this.x, this.y + y); };

    //операция - (минус)
    G.F_XY.prototype.f_subtract = function (p) { return new G.F_XY(this.x - p.x, this.y - p.y); };
    G.F_XY.prototype.f_subtract_n_n = function (n) { return new G.F_XY(this.x - n, this.y - n); };
    G.F_XY.prototype.f_subtract_x_y = function (x, y) { return new G.F_XY(this.x - x, this.y - y); };
    G.F_XY.prototype.f_subtract_y = function (y) { return new G.F_XY(this.x, this.y - y); };

    //умножить - масштабировать пропорционально
    G.F_XY.prototype.f_scale = function (n) { return new G.F_XY(this.x * n, this.y * n); };
    G.F_XY.prototype.f_scale_x_y = function (x, y) { return new G.F_XY(this.x * x, this.y * y); };
    G.F_XY.prototype.f_scale_both = function (p) { return new G.F_XY(this.x * p.x, this.y * p.y); };
    G.F_XY.prototype.f_divide = function (p) { return new G.F_XY(this.x / p.x, this.y / p.y); };
    G.F_XY.prototype.f_divide_x_y = function (x, y) { return new G.F_XY(this.x / x, this.y / y); };
    G.F_XY.prototype.f_divide_n_n = function (n) { return new G.F_XY(this.x / n, this.y / n); };

    //манхэтенское расстояние (метрика городских кварталов)
    //расстояние между двумя перекрёстками (обычно целыми) по улицам
    G.F_XY.prototype.f_manhattan = function (p) { return Math.abs(this.x - p.x) + Math.abs(this.y - p.y); };

    //минимальнаяя координата (выбери минимум из двух координат) в текущем объекте
    G.F_XY.prototype.f_get_min_this = function () { return Math.min(this.x, this.y); };
    G.F_XY.prototype.f_get_max_this = function () { return Math.max(this.x, this.y); };
    G.F_XY.prototype.f_get_min_min = function () { return G.F_NN(Math.min(this.x, this.y)); };
    G.F_XY.prototype.f_get_max_max = function () { return G.F_NN(Math.max(this.x, this.y)); };
    //минимум - по обеим координатам
    G.F_XY.prototype.f_min = function (p) { return new G.F_XY(Math.min(this.x, p.x), Math.min(this.y, p.y)); };
    G.F_XY.prototype.f_max = function (p) { return new G.F_XY(Math.max(this.x, p.x), Math.max(this.y, p.y)); };
    //минималка при сравнении с массивом (ижем левую верхнюю границу)
    G.F_XY.prototype.f_min_array = function (p) { let t = this.f_get_copy(); for (let i of p) t = t.f_min(i); return t; };
    G.F_XY.prototype.f_max_array = function (p) { let t = this.f_get_copy(); for (let i of p) t = t.f_max(i); return t; };

    G.F_XY.prototype.f_change_x = function(new_value) {return new G.F_XY(new_value, this.y);};
    G.F_XY.prototype.f_change_y = function(new_value) {return new G.F_XY(this.x, new_value);};
    G.F_XY.prototype.f_set_ratio = function (ratio) {
        //если "У" слишком большое, то замени "У" (иначе замени "Х")
        return ((ratio * this.y) >= this.x) ? this.f_change_y(this.x / ratio) : this.f_change_x(this.y * ratio); 
    }; 

    G.F_XY.prototype.f_get_floor = function () {return new G.F_XY(Math.floor(this.x), Math.floor(this.y)); };

    //отражения и повороты
    G.F_XY.prototype.f_get_reflex_x = function () { return new G.F_XY(-this.x, this.y); };
    G.F_XY.prototype.f_get_reflex_y = function () { return new G.F_XY(this.x, -this.y); };
    G.F_XY.prototype.f_get_rotate_90 = function () { return new G.F_XY(-this.y, this.x); };
    G.F_XY.prototype.f_get_swap = function () { return new G.F_XY(this.y, this.x); };

    //все 4 поворота на 90 градусов без отражений
    G.F_XY.prototype.f_get_rotate_4 = function () {
        const x = this.x, y = this.y;
        const arr_4 = [[x, y], [-y, x], [-x, -y], [y, -x]];
        return arr_4.map(xy => G.F_XY(xy[0], xy[1]));
    };
    //повороты на 90 градусов и их отражения
    G.F_XY.prototype.f_get_rotate_8 = function () {
        const x = this.x, y = this.y;
        const arr_8 = [[x, y], [-y, x], [-x, -y], [y, -x], [-x, y], [y, x], [x, -y], [-y, -x]];
        return arr_8.map(xy => G.F_XY(xy[0], xy[1]));
    };
    //повороты и отражения, сохраняющие цвет клетки при шахматной раскраске
    G.F_XY.prototype.f_get_rotate_4_save_black_white = function () {
        const x = this.x, y = this.y;
        const arr_4_save = [[x, y], [y, x], [-x, -y], [-y, -x]];
        return arr_4_save.map(xy => G.F_XY(xy[0], xy[1]));
    };

    G.F_XY.prototype.f_center = function(b) {return this.f_add(b).f_divide_n_n(2); };

    G.F_XY.prototype.f_get_len_2 = function () {return (this.x * this.x + this.y * this.y);};
    G.F_XY.prototype.f_len_2 = function (b) {return (this.f_subtract(b)).f_get_len_2(); };
    G.F_XY.prototype.f_len = function (b) {return Math.sqrt(this.f_len_2(b)); };
 
    G.F_XY.prototype.f_interpolate = function (b, n01) {
        let delta = b.f_subtract(this);
        let scaled_delta = delta.f_scale(n01);
        return this.f_add(scaled_delta);
    };
    //дан отрезок, который является диагональя квадрата, построй вторую диагональ квадрата
    G.F_XY.prototype.f_diagonal = function (opposite) {
        let center = this.f_center(opposite);
        let v90 = opposite.f_subtract(center).f_get_rotate_90();
        return [center.f_add(v90), center.f_subtract(v90)];
    };
})();
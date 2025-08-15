//поле прижато к левому нижнему углу холста (N - сколко клеток на стороне квадратного поля)
G.DRAW.f_default_LEFT_TOP_and_CELL = function (N  = G.TASKS.task_active.n_size) {
    //если размер и положения не заданы, то максимизируй и прислни к правому нижнему углу
    var CELL = Math.floor(G.DRAW.wh.f_get_min_this() / N);
    var LEFT_TOP = G.DRAW.wh.f_subtract_n_n(CELL * N);
    //CELL - размер одно ячейки, LEFT_TOP - координаты левого верхнего угла ячейки
    return ({ CELL: CELL, LEFT_TOP: LEFT_TOP });
};

//положение игрового поля 
G.F_LEFT_TOP_wh = function (wh = G.DRAW.wh, N = G.TASKS.task_active.n_size) {
    var CELL = Math.floor(wh.f_get_min_this() / N);
    var CORNER = wh.f_subtract_n_n(CELL * N).f_get_copy();
    return new G.F_LEFT_TOP(CORNER, CELL, N);
};

//по координатам клетки - найди её левый верхний угол
G.F_LEFT_TOP.prototype.f_calc_left_top = function(p) {return this.CORNER.f_add(p.f_scale(this.CELL));};
//по координатам клетки - найди её центр
G.F_LEFT_TOP.prototype.f_calc_center = function(p) {return this.f_calc_left_top(p.f_add_n_n(0.5)); };
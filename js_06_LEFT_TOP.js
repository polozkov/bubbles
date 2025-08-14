G.DRAW.f_default_LEFT_TOP_and_CELL = function (N  = G.TASKS.task_active.n_size) {
    //если размер и положения не заданы, то максимизируй и прислни к правому нижнему углу
    const CELL = Math.floor(G.DRAW.wh.f_get_min_this() / N);
    const LEFT_TOP = G.DRAW.wh.f_subtract_n_n(CELL * N);
    return ({ CELL: CELL, LEFT_TOP: LEFT_TOP });
};

G.F_LEFT_TOP_wh = function (wh = G.DRAW.wh, N = G.TASKS.task_active.n_size) {
    const CELL = Math.floor(wh.f_get_min_this() / N);
    const CORNER = wh.f_subtract_n_n(CELL * N).f_get_copy();
    //console.log("wh G.F_LEFT_TOP_wh", ...wh.f_get_arr());
    return new G.F_LEFT_TOP(CORNER, CELL, N);
};

G.F_LEFT_TOP.prototype.f_calc_left_top = function(p) {return this.CORNER.f_add(p.f_scale(this.CELL));};
G.F_LEFT_TOP.prototype.f_calc_center = function(p) {return this.f_calc_left_top(p.f_add_n_n(0.5)); };
// доска с пузырками состоит из капилляров (зон) и пузырьков (со значениями 1,2,4,8)
G.F_TASK = function (arr_bubbles, arr_zones) {
    this.arr_bubbles = arr_bubbles;
    this.arr_zones = arr_zones;

    this.n_size = Math.round(Math.sqrt(arr_bubbles.length));
    this.n2 = this.n_size * this.n_size;

    //сумму считай как сумму на всех клетках квадратной таблицы, делённой на количество строк (this.n_size)
    let sum_all_cells = arr_bubbles.reduce((sum, n_next) => sum + n_next, 0);
    this.main_sum = (sum_all_cells / this.n_size);
};

G.F_TASK.prototype.f_get_copy = function () {return new G.F_TASK(this.arr_bubbles.slice(), this.arr_zones.slice());};

G.F_TASK.prototype.f_is_solved = function () {
    let N = this.n_size, main_sum = this.main_sum, board = this.arr_bubbles;
    function f_sum_ok(n_start, delta) {
        let sum = 0, i_cell = n_start;
        for (let i = 0; i < N; i++) {sum += board[i_cell]; i_cell += delta;}
        return (sum === main_sum); 
    }
    for (let i = 0; i < N; i++) {
        if (!f_sum_ok(i * N, 1)) {return false; };
        if (!f_sum_ok(i, N)) {return false; };
    }
    if (!f_sum_ok(0, N + 1)) {return false; };
    if (!f_sum_ok(N - 1, N - 1)) {return false; };
    return true;
};

//верни (х,у) координаты энной ячейки как объект G.F_XY
G.F_TASK.prototype.f_n_to_xy = function (n) {
    //дели целое число n с остатком на размер n_size
    let x = n % this.n_size;
    //вычти остаток, и поэтому деление будет точно нацело
    let y = (n - x) / this.n_size;
    return new G.F_XY(x, y);
};

G.F_TASK.prototype.f_xy_to_n = function (xy) {return (xy.x + (xy.y * this.n_size)); };

//возможен ли ход из ячейки na в ячейку nb ?
G.F_TASK.prototype.f_is_legal_move = function (na, nb) {
    if (this.arr_zones[na] !== this.arr_zones[nb]) { return false; };
    if ((this.arr_bubbles[na] === 0) || (this.arr_bubbles[nb] > 0)) { return false; };
    if (this.f_n_to_xy(na).f_manhattan(this.f_n_to_xy(nb)) !== 1) { return false; };
    return true;
};

//верни все возможные ходы (ход - это массив из пар номеров [na, nb] - откуда и куда)
G.F_TASK.prototype.f_get_legal_moves = function () {
    let arr_moves = [];
    for (let na = 0; na < this.n2; na++)
        for (let nb = 0; nb < this.n2; nb++) 
            if (this.f_is_legal_move(na,nb))
                arr_moves.push([na,nb]);
    return arr_moves;
};

G.F_TASK.prototype.f_search_pressed_cell = function (xy_mouse, get_LEFT_TOP, get_CELL) {
    let relative_mouse = xy_mouse.f_subtract(get_LEFT_TOP);
    if (relative_mouse.f_get_min_this() <= 0) {return null; };
    if (relative_mouse.f_get_max_this() >= (this.n_size * get_CELL)) {return null; };

    let cell_xy_with_frac = relative_mouse.f_divide_n_n(get_CELL);
    let cell_xy_int = cell_xy_with_frac.f_get_floor();
    let cell_xy_frac = cell_xy_with_frac.f_subtract(cell_xy_int);
    return ({n_cell: this.f_xy_to_n(cell_xy_int), frac: cell_xy_frac, with_frac: cell_xy_with_frac});
};

//ab - два числа: [0 .. this.n_size * this.n_size - 1]
G.F_TASK.prototype.f_move_ab_center_point = function(ab) {
    let a_xy = this.f_n_to_xy(ab[0]).f_add_n_n(0.5);
    let b_xy = this.f_n_to_xy(ab[1]).f_add_n_n(0.5);
    return a_xy.f_center(b_xy);
};

G.F_TASK.prototype.f_search_pressed_legal_move = function (xy_mouse, get_LEFT_TOP, get_CELL) {
    //ищи нажатую клетку
    let obj_pressed = this.f_search_pressed_cell(xy_mouse, get_LEFT_TOP, get_CELL);
    //если клетка не нажата, то хода нет, верни null
    if (obj_pressed === null) {return null; };

    let arr_legal_moves = this.f_get_legal_moves();
    let arr_filtered_moves = arr_legal_moves.filter(ab => ((ab[0] === obj_pressed.n_cell) || (ab[1] === obj_pressed.n_cell)));
    //если нет ни одного легального хода, верни null
    if (arr_filtered_moves.length === 0) {return null; };
    
    f_len_and_index = (ab, i) => ({
        xy_move: this.f_move_ab_center_point(ab),
        xy_pressed: obj_pressed.with_frac,
        distance_to_pressed: this.f_move_ab_center_point(ab).f_len(obj_pressed.with_frac),
        i: i});

    let arr_distances = arr_filtered_moves.map((ab, i) => f_len_and_index(ab, i));
    arr_distances.sort((a,b) => (a.distance_to_pressed - b.distance_to_pressed));
    
    let pressed_index = arr_distances[0].i;
    let pressed_move = arr_filtered_moves[pressed_index];
    return pressed_move;
};

G.F_TASK.prototype.f_do_self_move = function (ab) {
    let temp = this.arr_bubbles[ab[0]];
    this.arr_bubbles[ab[0]] = this.arr_bubbles[ab[1]];
    this.arr_bubbles[ab[1]] = temp;
};

G.F_TASK.prototype.f_do_move_by_mouse_change = function (xy_mouse, LEFT_TOP_and_CELL) {
    let ab = this.f_search_pressed_legal_move(xy_mouse, LEFT_TOP_and_CELL.LEFT_TOP, LEFT_TOP_and_CELL.CELL);
    if (ab === null) {return;}
    this.f_do_self_move(ab);
};
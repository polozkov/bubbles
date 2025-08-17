// доска с пузырками состоит из капилляров (зон) и пузырьков (со значениями 1,2,4,8)
G.F_TASK = function (arr_bubbles, arr_zones, arr_pairs = []) {
    this.arr_bubbles = arr_bubbles; //пузырки (одномерный массив - кодирующий квадратную матрицу)
    this.arr_zones = arr_zones; //где какая зона
    this.arr_pairs = arr_pairs; //особые стенки внутри зоны

    this.n_size = Math.round(Math.sqrt(arr_bubbles.length));
    this.n2 = this.n_size * this.n_size;

    //сумму считай как сумму на всех клетках квадратной таблицы, делённой на количество строк (this.n_size)
    var sum_all_cells = arr_bubbles.reduce((sum, n_next) => sum + n_next, 0);
    this.main_sum = (sum_all_cells / this.n_size);
};

//копия текущего задания
G.F_TASK.prototype.f_get_copy = function () {
    return new G.F_TASK(
        this.arr_bubbles.slice(),
        this.arr_zones.slice(),
        this.arr_pairs.map(ab => [ab[0], ab[1]])
    );
};

//проверь, что задача решена
G.F_TASK.prototype.f_is_solved = function () {
    var N = this.n_size, main_sum = this.main_sum, board = this.arr_bubbles;

    //сумма N чисел (пузырьков) - дан индекс начального поля и сдвиг
    function f_sum_ok(n_start, delta) {
        var sum = 0, i_cell = n_start;
        for (var i = 0; i < N; i++) {sum += board[i_cell]; i_cell += delta;}
        return (sum === main_sum); 
    }

    //главная диагональ
    if (!f_sum_ok(0, N + 1)) {return false; };
    //побочная диагональ
    if (!f_sum_ok(N - 1, N - 1)) {return false; };

    //строки и столбцы
    for (var i = 0; i < N; i++) {
        //у каждой строки (горизонтали) - сдвиг на 1 - то есть, вправо
        if (!f_sum_ok(i * N, 1)) {return false; };
        //у каждого столбца (вертикали) - сдвиг на N - то есть, вниз
        if (!f_sum_ok(i, N)) {return false; };
    }
    return true;
};

//верни (х,у) координаты энной ячейки как объект G.F_XY
G.F_TASK.prototype.f_n_to_xy = function (n) {
    //дели целое число n с остатком на размер n_size
    var x = n % this.n_size;
    //вычти остаток, и поэтому деление будет точно нацело
    var y = (n - x) / this.n_size;
    return new G.F_XY(x, y);
};
//по xy-объекту верни номер ячейки
G.F_TASK.prototype.f_xy_to_n = function (xy) {return (xy.x + (xy.y * this.n_size)); };

G.F_TASK.prototype.f_is_in_blocked_pair = function (na, nb) {
    var ab = [Math.min(na,nb), Math.max(na,nb)];
    for (var i_pair of this.arr_pairs) {
        if ((i_pair[0] === ab[0]) && (i_pair[1] === ab[1])) {return true; };
    };
    return false;
};

//возможен ли ход из ячейки na в ячейку nb ?
G.F_TASK.prototype.f_is_legal_move = function (na, nb) {
    //ход только внутри одно зоны
    if (this.arr_zones[na] !== this.arr_zones[nb]) { return false; };
    //ход только пузырьком на свободное поле
    if ((this.arr_bubbles[na] === 0) || (this.arr_bubbles[nb] > 0)) { return false; };
    //ход только на соседнее по стороне поле
    if (this.f_n_to_xy(na).f_manhattan(this.f_n_to_xy(nb)) !== 1) { return false; };

    if (this.f_is_in_blocked_pair(na, nb)) {return false; };
    return true;
};

//верни все возможные ходы (ход - это массив из пар номеров [na, nb] - откуда и куда)
G.F_TASK.prototype.f_get_legal_moves = function () {
    var arr_moves = [];
    for (var na = 0; na < this.n2; na++)
        for (var nb = 0; nb < this.n2; nb++) 
            if (this.f_is_legal_move(na,nb))
                arr_moves.push([na,nb]);
    return arr_moves;
};

G.F_TASK.prototype.f_search_pressed_cell = function (xy_mouse, get_LEFT_TOP, get_CELL) {
    var relative_mouse = xy_mouse.f_subtract(get_LEFT_TOP);
    //нажатие вне доски - нет хода
    if (relative_mouse.f_get_min_this() <= 0) {return null; };
    if (relative_mouse.f_get_max_this() >= (this.n_size * get_CELL)) {return null; };

    var cell_xy_with_frac = relative_mouse.f_divide_n_n(get_CELL);
    var cell_xy_int = cell_xy_with_frac.f_get_floor();
    var cell_xy_frac = cell_xy_with_frac.f_subtract(cell_xy_int);
    //номер ячейки, дробная часть, вщественное число целиком
    return ({n_cell: this.f_xy_to_n(cell_xy_int), frac: cell_xy_frac, with_frac: cell_xy_with_frac});
};

//ab - два числа внутри отрезка [0 .. this.n_size * this.n_size - 1]
G.F_TASK.prototype.f_move_ab_center_point = function(ab) {
    var a_xy = this.f_n_to_xy(ab[0]).f_add_n_n(0.5);
    var b_xy = this.f_n_to_xy(ab[1]).f_add_n_n(0.5);
    return a_xy.f_center(b_xy);
};

//найди нажатый ход (либо null)
G.F_TASK.prototype.f_search_pressed_legal_move = function (xy_mouse, get_LEFT_TOP, get_CELL) {
    //ищи нажатую клетку
    var obj_pressed = this.f_search_pressed_cell(xy_mouse, get_LEFT_TOP, get_CELL);
    //если клетка не нажата, то хода нет, верни null
    if (obj_pressed === null) {return null; };

    var arr_legal_moves = this.f_get_legal_moves();
    //отфильтруй, где нажата либо начальная, либо конечная клетка хода
    var arr_filtered_moves = arr_legal_moves.filter(ab => ((ab[0] === obj_pressed.n_cell) || (ab[1] === obj_pressed.n_cell)));
    //если нет ни одного легального хода, верни null
    if (arr_filtered_moves.length === 0) {return null; };
    
    //информация с ходом (в том числе, расстояние до середины стрелочки)
    f_len_and_index = (ab, i) => ({
        xy_move: this.f_move_ab_center_point(ab),
        xy_pressed: obj_pressed.with_frac,
        distance_to_pressed: this.f_move_ab_center_point(ab).f_len(obj_pressed.with_frac),
        i: i});

    var arr_distances = arr_filtered_moves.map((ab, i) => f_len_and_index(ab, i));
    //ищи ближайший ход
    arr_distances.sort((a,b) => (a.distance_to_pressed - b.distance_to_pressed));
    
    var pressed_index = arr_distances[0].i;
    var pressed_move = arr_filtered_moves[pressed_index];
    return pressed_move;
};

//делай ход, меняя себя
G.F_TASK.prototype.f_do_self_move = function (ab) {
    var temp = this.arr_bubbles[ab[0]];
    this.arr_bubbles[ab[0]] = this.arr_bubbles[ab[1]];
    this.arr_bubbles[ab[1]] = temp;
};

//нажат ход - делай его (иначе ничего не делай - стой на месте)
G.F_TASK.prototype.f_do_move_by_mouse_change = function (xy_mouse, LEFT_TOP_and_CELL) {
    var ab = this.f_search_pressed_legal_move(xy_mouse, LEFT_TOP_and_CELL.LEFT_TOP, LEFT_TOP_and_CELL.CELL);
    if (ab === null) {return;}
    this.f_do_self_move(ab);
};
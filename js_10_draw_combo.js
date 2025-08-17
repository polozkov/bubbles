//выведи текст, если задача решена
G.DRAW.f_draw_info_when_solved = function (is_solved, ctx = G.DRAW.ctx) {
    if (!is_solved) { return; };
    var number_next = "№" + G.EL.f_next_task_from_1(G.VIEW.n_task);
    var my_text_arr = ["Задача","№" + G.VIEW.n_task, "решена.", "Жми, будет", "задача", number_next];
    var cxy = G.DRAW.wh.f_scale(0.5);

    var font_h = G.VIEW.f_calc_border(G.DRAW.wh.f_get_min_this(), G.VIEW.ratio_font_info);
    var font_stroke = G.VIEW.f_calc_border(font_h, G.VIEW.ratio_font_stroke_info);

    var obj_style = new G.F_STYLE(G.RGB.fill_text_info, G.RGB.stroke_text_info, font_stroke);

    //центры текстов - вычисли, меняя только y-координату
    var cxy_arr = [0,1,2,3,4,5].map(n05 => cxy.f_add_y(font_h * (n05 - 2.5)));
    for (var i of [0,1,2,3,4,5])
        G.DRAW.f_draw_text(my_text_arr[i], cxy_arr[i], font_h, obj_style, ctx);
};


//рисуй границу между двумя клетками ()
G.DRAW.f_draw_border_between_cells = function (left_top, cell_a, dir, task_n_size, ctx = G.DRAW.ctx) {
    var BORDER_50 = G.VIEW.f_calc_border(left_top.CELL, G.VIEW.ratio_border_50);
    var XY_END = left_top.f_calc_left_top(cell_a).f_add_n_n(left_top.CELL);

    var XY_BEGIN = XY_END.f_get_copy();
    //направление вниз - граница горизонтальная (иначе - вертикальная)
    var s = (dir.y !== 0) ? "x" : "y";

    XY_BEGIN[s] -= left_top.CELL;
    //выход за мЕньшую границу (слева и сверху))
    if (cell_a[s] === 0) { XY_BEGIN[s] += BORDER_50; };
    //выход за бОльшую границу (справа и снизу)
    if (cell_a[s] === (task_n_size - 1)) { XY_END[s] -= BORDER_50; };

    //цвет границы - такой же, как на границах на доске
    var obj_style = new G.F_STYLE(G.RGB.border_board, G.RGB.border_board, BORDER_50 * 2, "round");

    //console.log(XY_A.f_get_arr(), XY_B.f_get_arr());
    G.DRAW.f_draw_line(XY_BEGIN, XY_END, obj_style, ctx);
};

//рисуй все необходимые границы
G.DRAW.f_draw_all_borders = function (task, left_top, ctx) {
    for (var ia = 0; ia < task.n2; ia++)
        for (var ib = ia + 1; ib < task.n2; ib++) {
            var obj_xy_cell_a = task.f_n_to_xy(ia);
            var obj_xy_cell_b = task.f_n_to_xy(ib);
            //рисуй границу только между соседними клетками (критерий - единичное манхэтенское расстояние)
            if (obj_xy_cell_a.f_manhattan(obj_xy_cell_b) !== 1) { continue; };
            //рисуй границу только между разными областями (капиллярами)
            //... исключение - внутренняя граница
            if ((task.arr_zones[ia] === task.arr_zones[ib]) && !task.f_is_in_blocked_pair(ia, ib)) { continue; };
            var delta_direction = obj_xy_cell_b.f_subtract(obj_xy_cell_a);
            G.DRAW.f_draw_border_between_cells(left_top, obj_xy_cell_a, delta_direction, task.n_size, ctx);
        }
};

//рисуй один пузырёк (кружочек)
G.DRAW.f_draw_one_bubble_circle = function (left_top, nxy, n01248, ctx) {
    if (n01248 === 0) { return; };
    //в центре ячейки будет и круг, и текст (одна из цифр: 1,2,4,8)
    var cxy = left_top.f_calc_center(nxy);

    //радиус круга - не может быть меньше 1 - зависит от размеря ячейки и настройки пропорций внешнего вида
    var radius = G.VIEW.f_calc_border(left_top.CELL, G.VIEW.ratio_circle_in_cell * 0.5);
    //цвет пузырька
    var color_fill = G.RGB.arr_bubbles_by_01248[n01248];
    //толщина линии вычисляется в зависимости от пропорции внешного вида
    var line_width = G.VIEW.f_calc_border(left_top.CELL, G.VIEW.ratio_circle_line_width);
    // стиль круга (граница, обводка, толщина обводки)
    var obj_style_circle = new G.F_STYLE(color_fill, G.RGB.border_circles, line_width);
    G.DRAW.f_draw_circle(cxy, radius, obj_style_circle, ctx);
};
//рисуй один пузырёк (значение 0,1,2,4,8)
G.DRAW.f_draw_one_bubble_text = function (left_top, nxy, n01248, ctx) {
    if (n01248 === 0) { return; };
    //в центре ячейки будет и круг, и текст (одна из цифр: 1,2,4,8)
    var cxy = left_top.f_calc_center(nxy);

    //высота текста
    var font_h = G.VIEW.f_calc_border(left_top.CELL, G.VIEW.ratio_font);
    var font_stroke = G.VIEW.f_calc_border(font_h, G.VIEW.ratio_font_stroke);
    // стиль текста (граница, обводка, толщина обводки)
    var obj_style_text = new G.F_STYLE(G.RGB.fill_text, G.RGB.stroke_text, font_stroke);
    // выведи текст
    G.DRAW.f_draw_text(n01248 + "", cxy, font_h, obj_style_text, ctx);
};

//рисуй одну стрелочку
G.DRAW.f_draw_one_arrow = function (task, left_top, na_cell, nb_cell, ctx) {
    //центры ячеек
    var center_a = left_top.f_calc_center(task.f_n_to_xy(na_cell));
    var center_b = left_top.f_calc_center(task.f_n_to_xy(nb_cell));
    //сдвинь центры ячеек между собой
    var ca = center_a.f_interpolate(center_b, G.VIEW.arrow_cut_for_making_shorter);
    var cb = center_b.f_interpolate(center_a, G.VIEW.arrow_cut_for_making_shorter);

    var line_width = G.VIEW.f_calc_border(left_top.CELL, G.VIEW.arrow_line_width);
    var obj_style = new G.F_STYLE(G.RGB.arrow, G.RGB.arrow, line_width);
    G.DRAW.f_draw_arrow(ca, cb, obj_style, G.VIEW.arrow_cap_ratio, ctx);
};

//рисуй всю задачу
G.DRAW.f_draw_task = function (task, left_top, ctx = G.DRAW.ctx) {
    //нарисуй шахматную доску
    G.DRAW.f_draw_grid(left_top, G.F_NN(left_top.CELL), G.F_NN(left_top.N), G.RGB.dark_light, ctx);
    //рисуй все границы
    G.DRAW.f_draw_all_borders(task, left_top, ctx);

    //нарисуй все пузырьки (кружочки с текстом)
    for (var i_cell = 0; i_cell < task.n2; i_cell++) {
        G.DRAW.f_draw_one_bubble_circle(left_top, task.f_n_to_xy(i_cell), task.arr_bubbles[i_cell], ctx);
        G.DRAW.f_draw_one_bubble_text(left_top, task.f_n_to_xy(i_cell), task.arr_bubbles[i_cell], ctx);
    }

    //нарисуй все стрелочки (где возможные ходы)
    for (var ab of task.f_get_legal_moves())
        G.DRAW.f_draw_one_arrow(task, left_top, ab[0], ab[1], ctx);

    //если задача решена, то сверху пиши текст
    G.DRAW.f_draw_info_when_solved(task.f_is_solved());
};
G.DRAW.f_resize_and_redraw = function () {
    //обнови размеры перед рисованием всего остального
    G.DRAW.f_renew_sizes(G.TASKS.task_active.n_size, [1,1], G.VIEW.ratio_canvas_board_xy);
    G.DRAW.f_clear(G.RGB.empty_canvas, G.DRAW.ctx);

    G.DRAW.f_draw_task(G.TASKS.task_active, G.F_LEFT_TOP_wh());
};

window.onresize = function () { G.DRAW.f_resize_and_redraw(); };
window.onorientationchange = function () { G.DRAW.f_resize_and_redraw(); };

//рисуй новое задание (по заданному индексу, нумерация с единицы)
G.DRAW.f_draw_new_task = function (n_next_task) {
    G.EL.range_task.value = n_next_task;
    var str_info = G.DATA.ARRAY[n_next_task].task_and_page_in_book;

    G.EL.span_task.innerHTML = "№" + n_next_task + " из " + G.EL.f_amount();

    if (str_info) {
    //var n_picture = str_info.split(" ")[1].split("_")[1];
    var n_page = str_info.split(" ")[2];
    var n_answer = str_info.split(" ")[3];
    G.EL.span_book.innerHTML = "Эта задача на стр. " + n_page + ",";
    G.EL.span_answer.innerHTML = "ответ на стр. " + n_answer + ".";
    } else {
        G.EL.span_book.innerHTML = "Эта дополнительная задача."
        G.EL.span_answer.innerHTML = "Основные задачи в книге."
    }

    G.VIEW.f_renew_task(n_next_task);
    G.DRAW.f_resize_and_redraw();
};


//нажатие на холст - если задача решена - следующий уровень, (если не решена - делай ход - если возможен)
G.DRAW.canvas.addEventListener('mousedown', function (event) {
    //предыдущая задача решена - перейди к следующей задаче
    if (G.TASKS.task_active.f_is_solved()) {
        G.DRAW.f_draw_new_task(G.EL.f_next_task_from_1());
        return;
    };

    // Получаем координаты относительно canvas
    var rect = G.DRAW.canvas.getBoundingClientRect();
    var x = event.offsetX || (event.clientX - rect.left) || 0;
    var y = event.offsetY || (event.clientY - rect.top) || 0;
    var xy_mouse = new G.F_XY(x, y);
    var LEFT_TOP_and_CELL = G.DRAW.f_default_LEFT_TOP_and_CELL(G.TASKS.task_active.n_size);

    G.TASKS.task_active.f_do_move_by_mouse_change(xy_mouse, LEFT_TOP_and_CELL);
    G.DRAW.f_resize_and_redraw();
});

//предыдущий уровень
G.EL.button_minus.addEventListener('mousedown', function () {
    var n_next_task = G.EL.f_previous_task_from_1();
    G.DRAW.f_draw_new_task(n_next_task);
});

//следующий уровень
G.EL.button_plus.addEventListener('mousedown', function () {
    var n_next_task = G.EL.f_next_task_from_1();
    G.DRAW.f_draw_new_task(n_next_task);
});

//ползунок - если меняется, то меняется и решаемая задача
G.EL.range_task.addEventListener('input', function() {
    var n_next_task = +this.value;
    G.DRAW.f_draw_new_task(n_next_task);
});

G.DRAW.f_draw_new_task(1);
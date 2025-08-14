G.DRAW.f_resize_and_redraw = function () {
    //обнови размеры перед рисованием всего остального
    G.DRAW.f_renew_sizes(G.TASKS.task_active.n_size);
    G.DRAW.f_clear(G.RGB.empty_canvas, G.DRAW.ctx);

    G.DRAW.f_draw_task(G.TASKS.task_active, G.F_LEFT_TOP_wh());
};
G.DRAW.f_resize_and_redraw();
window.onresize = function() {G.DRAW.f_resize_and_redraw(); };
window.onorientationchange = function () {G.DRAW.f_resize_and_redraw(); };

G.DRAW.canvas.onclick = function (event) {
    if (G.TASKS.task_active.f_is_solved()) {
        let n_next_task = (+G.EL.input_number.value) + 1;
        if (n_next_task > (+G.EL.input_number.max)) {n_next_task = 1; };

        G.EL.input_number.value = n_next_task;
        G.VIEW.f_renew_task(n_next_task - 1);
        G.DRAW.f_resize_and_redraw();
        return
    };

    // Получаем координаты относительно canvas
    const rect = G.DRAW.canvas.getBoundingClientRect();
    const x = event.offsetX || (event.clientX - rect.left) || 0;
    const y = event.offsetY || (event.clientY - rect.top) || 0;
    const xy_mouse = new G.F_XY(x, y);
    const LEFT_TOP_and_CELL = G.DRAW.f_default_LEFT_TOP_and_CELL(G.TASKS.task_active.n_size);

    G.TASKS.task_active.f_do_move_by_mouse_change(xy_mouse, LEFT_TOP_and_CELL);
    G.DRAW.f_resize_and_redraw();
};

G.EL.button_submit.onclick = function () {
    let new_task_number =(+G.EL.input_number.value) - 1;
    G.VIEW.f_renew_task(new_task_number);
    G.DRAW.f_resize_and_redraw();
};
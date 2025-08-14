//холст для рисования
G.DRAW.canvas = document.getElementById('id-my-game');
G.DRAW.ctx = G.DRAW.canvas.getContext('2d', { willReadFrequently: true });
// Получаем коэффициент масштабирования устройства
G.DRAW.f_dpr = function () { return (window.devicePixelRatio || 1); };


//обнови размеры доски
G.DRAW.f_renew_sizes = function (n_cells, MY_RATIO_AB = [1,1], MAX_CLIENT_XY = new G.F_XY(0.9, 0.9)) {
    let DOC_WH_100 = new G.F_XY(document.documentElement.clientWidth, document.documentElement.clientHeight);
    let DOC_WH = DOC_WH_100.f_scale_both(MAX_CLIENT_XY);
    let n_01_div = (DOC_WH.x > DOC_WH.y) ? 0 : 1;
    let ratio = MY_RATIO_AB[n_01_div] / MY_RATIO_AB[1 - n_01_div];
    // Задаем желаемый размер канваса в CSS-пикселях
    G.DRAW.wh = DOC_WH.f_set_ratio(ratio);

    let int_x = Math.floor(G.DRAW.wh.x);
    let mult = MY_RATIO_AB[0] * MY_RATIO_AB[1] * n_cells;
    for (let ix = int_x; ix > (int_x - mult); ix-=1) {
        if (ix % (MY_RATIO_AB[0] * n_cells)) {continue;}
        let iy = Math.round(ix / ratio);
        G.DRAW.wh = new G.F_XY(ix, iy);
    };

    G.DRAW.canvas.style.width = G.DRAW.wh.x + 'px';
    G.DRAW.canvas.style.height = G.DRAW.wh.y + 'px';
    // Устанавливаем реальное разрешение канваса в пикселях
    G.DRAW.canvas.width = G.DRAW.wh.x * G.DRAW.f_dpr();
    G.DRAW.canvas.height = G.DRAW.wh.y * G.DRAW.f_dpr();

    // Масштабируем контекст, чтобы компенсировать devicePixelRatio
    G.DRAW.ctx.setTransform(1, 0, 0, 1, 0, 0); // сброс transform
    G.DRAW.ctx.scale(G.DRAW.f_dpr(), G.DRAW.f_dpr());
};

//закрась прямоугольную область попиксельно (либо только рамку)
G.DRAW.f_draw_rect = function (xy_left_top, xy_sizes, obj_style, ctx) {
    obj_style.f_set_ctx_style(ctx);
    ctx.fillRect(xy_left_top.x, xy_left_top.y, xy_sizes.x, xy_sizes.y);
    ctx.strokeRect(xy_left_top.x, xy_left_top.y, xy_sizes.x, xy_sizes.y);
};

G.DRAW.f_clear = function (color_clear, ctx) {
    let obj_style = new G.F_STYLE(color_clear, color_clear, 1);
    G.DRAW.f_draw_rect(G.F_NN(), G.DRAW.wh, obj_style, ctx);
};

//рисуй шахматную сеточку без границ (цветные области прижаты друг к другу плотно)
G.DRAW.f_draw_grid = function (xy_board_left_top, xy_sizes, nxy, rgba_dark_light, ctx) {
    for (let iy = 0; iy < nxy.y; iy++)
        for (let ix = 0; ix < nxy.x; ix++) {
            //левая верхняя точка (пиксель)
            let xy_cell_left_top = xy_board_left_top.f_calc_left_top(new G.F_XY(ix, iy));
            //тёмный или светлый цвет (так, чтобы левый нижний угол был тёмным)
            let rgba = rgba_dark_light[((ix + iy) + (nxy.y + 1)) % 2];
            let style = new G.F_STYLE(rgba, rgba, 0);
            G.DRAW.f_draw_rect(xy_cell_left_top, xy_sizes, style, ctx);
        };
};

G.DRAW.f_draw_circle = function (cxy, radius, obj_style, ctx) {
    obj_style.f_set_ctx_style(ctx);

    // Рисуем круг (от 0 до 360 градусов)
    ctx.beginPath();
    ctx.arc(cxy.x, cxy.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
};

G.DRAW.f_draw_text = function (my_text, cxy, font_h, obj_style, ctx) {
    obj_style.f_set_ctx_style(ctx);

    ctx.font = font_h + 'px ' + G.VIEW.font_family;
    ctx.textAlign = 'center'; // Выравнивание по центру
    ctx.textBaseline = 'middle'; // Вертикальное выравнивание

    ctx.fillText(my_text, cxy.x, cxy.y);
    ctx.strokeText(my_text, cxy.x, cxy.y);
};

G.DRAW.f_draw_line = function (axy, bxy, obj_style, ctx) {
    obj_style.f_set_ctx_style(ctx);
    ctx.beginPath();
    ctx.moveTo(axy.x, axy.y);
    ctx.lineTo(bxy.x, bxy.y);
    ctx.stroke();
};

G.DRAW.f_draw_arrow = function (axy, bxy, obj_style, ratio, ctx) {
    let sq = axy.f_diagonal(bxy);
    let b1 = bxy.f_interpolate(sq[0], ratio);
    let b2 = bxy.f_interpolate(sq[1], ratio);
    for (let start of [axy, b1, b2])
        G.DRAW.f_draw_line(start, bxy, obj_style, ctx);
};




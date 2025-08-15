//толщина половины внутренней стенки (если 0.5, то клетки будут не видны)
G.VIEW.ratio_border_50 = 0.07;

//какую долю квадратика составляет диаметр круга 
G.VIEW.ratio_circle_in_cell = 0.7;
//какую долю квадратика составляет толщина линии круга 
G.VIEW.ratio_circle_line_width = 0.05;

//какую долю квадратика составляет высота шрифта 
G.VIEW.ratio_font = 0.6;
//какую часть всего поля составляет информационный текст (задача решена)
G.VIEW.ratio_font_info = 0.15;
//какую долю шрифта обводка шрифта
G.VIEW.ratio_font_stroke = 1 / 30;
//какую долю шрифта обводка шрифта
G.VIEW.ratio_font_stroke_info = 1 / 30;

//если 0.5, то от стрелки ничего не останется
//на столько укороти стрелку
G.VIEW.arrow_cut_for_making_shorter = 0.3;
//хвосты стрелки (доля от стороны описанного квадрата)
G.VIEW.arrow_cap_ratio = 0.75;
G.VIEW.arrow_line_width = 0.1;

//считай толщину стенки по известному размеру квадратной ячейки
G.VIEW.f_calc_border = function (cell, ratio = G.VIEW.ratio_border_50) {
    //округли вниз до целого числа
    var low_integer_bound = Math.floor(cell * ratio);
    //толщина стенки должна быть такой
    return low_integer_bound;
};
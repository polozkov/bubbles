//двухзначное шестнадцатиричное число переведи в десятичную систему 0..255
G.RGB.f_to_byte = function (nn_hex) { return parseInt(nn_hex.toUpperCase(), 16); };
//в строке выбери len цифр (по умолчанию две) и переведи из 16-ричной системы в 10-тичную
G.RGB.f_sub_to = function (str, i_from, len = 2) { return G.RGB.f_to_byte(str.slice(i_from, i_from + len)); };
//переведи цвет #RRGGBB => в массив из четырёх байтов (альфа-канал по умолчанию полностью непрозрачный)
G.RGB.f_hex_to_rgba = function (s, a = 255) { return [G.RGB.f_sub_to(s, 1), G.RGB.f_sub_to(s, 3), G.RGB.f_sub_to(s, 5), a]; };

G.RGB.C_BLACK = [0,0,0,255];
G.RGB.C_RED = [255,0,0,255];
G.RGB.C_WHITE = [255,255,255,255];
G.RGB.C_NONE = [0,0,0,0];

G.RGB.C_SMALL_SQUARE_KNOTS = [0,0,0,0];


G.RGB.arrow = G.RGB.f_hex_to_rgba('#66FF66');;
//задай цвета и переведи их в RGBA(r,g,b,a) массив из 4 элементов r,g,b,a in [0..255]
G.RGB.dark_light = ['#b58863', '#f0d9b5'].map(s => G.RGB.f_hex_to_rgba(s));
//цвет для границ доски (обводка по рамке доски)
G.RGB.border_board = G.RGB.C_BLACK;
G.RGB.border_circles = G.RGB.C_BLACK;

G.RGB.stroke_text = G.RGB.C_BLACK;
G.RGB.fill_text = G.RGB.f_hex_to_rgba('#000000', 255);

G.RGB.stroke_text_info = G.RGB.C_BLACK;
G.RGB.fill_text_info = G.RGB.f_hex_to_rgba('#FFFF00', 212);

//цвет для очистки холста
G.RGB.empty_canvas = G.RGB.C_WHITE;

G.RGB.clear_when_solved = G.RGB.f_hex_to_rgba('#009900', 128);

G.RGB.arr_bubbles = ["#000000", "#FF0000", "#3914AF", "#00CC00", "#FFD300"].map(s => G.RGB.f_hex_to_rgba(s));
G.RGB.arr_01248 = [0, 1, 2, 0, 3, 0, 0, 0, 4];
G.RGB.arr_bubbles_by_01248 = G.RGB.arr_01248.map(n => G.RGB.arr_bubbles[n]);
G.DATA.f_to_arr = str => str.split("").filter(s => (s !== " ")).map(hex => parseInt(hex, 16));
G.DATA.ARRAY = [
    null,
    {
        arr_bubbles: [0,0,1,0, 2,1,2,0, 0,1,1,2, 0,2,0,0],
        arr_zones:   [0,1,2,2, 0,1,3,3, 4,4,5,6, 7,7,5,6],
        task_and_page_in_book: "my1 task_1 44 52",
    },
    {
        arr_bubbles: [0,0,0,0, 2,2,1,1, 1,1,2,2, 0,0,0,0],
        arr_zones:   [0,0,0,0, 0,1,2,0, 0,1,2,0, 0,1,2,0],
        task_and_page_in_book: "my2 task_2 44 52",
    },
    {
        arr_bubbles: [0,1,0,1, 2,4,4,0, 0,4,2,2, 1,2,1,4],
        arr_zones:   [0,1,1,2, 0,0,1,2, 3,3,1,2, 3,3,1,2],
        task_and_page_in_book: "my3 task_8 44 52",
    },
    {
        arr_bubbles: [0,2,0,0,0, 1,2,0,1,1, 0,0,0,0,2, 0,2,0,0,0, 0,1,1,0,2],
        arr_zones:   [0,0,1,2,2, 0,1,1,1,2, 1,1,3,1,1, 1,4,3,5,1, 4,4,3,5,5],
        task_and_page_in_book: "my4 task_19 45 53",
    },
    {
        arr_bubbles: [2,1,2,0,4, 0,4,1,4,0, 0,0,1,2,0, 0,0,1,1,0, 4,4,2,0,2],
        arr_zones:   [0,0,1,1,2, 0,0,1,1,2, 3,4,4,4,2, 3,5,5,6,6, 3,5,5,6,6],
        task_and_page_in_book: "my5 task_20 45 53",
    },
    {
        arr_bubbles: [1,0,4,0,0, 4,0,2,0,2, 2,4,1,0,1, 2,0,1,2,4, 0,0,1,0,4],
        arr_zones:   [0,0,0,1,1, 0,2,2,2,1, 3,4,4,4,1, 3,5,5,5,6, 3,3,6,6,6],
        task_and_page_in_book: "my6 task_21 45 53",
    },
    {
        arr_bubbles: [1,0,0,0,2, 0,4,2,4,0, 0,1,2,1,0, 4,0,4,0,4, 1,2,0,2,1],
        arr_zones:   [0,0,0,1,1, 0,2,2,2,1, 0,2,3,2,1, 0,2,3,2,3, 0,0,3,3,3],
        task_and_page_in_book: "my7 task_22 45 53",
    },
    {
        arr_bubbles: [0,0,0,0,2,0, 0,1,0,2,0,1, 1,1,0,0,0,2, 0,0,0,0,1,2, 0,0,2,0,0,0, 2,0,0,0,0,1],
        arr_zones:   [0,1,1,2,2,2, 0,1,3,3,3,3, 0,1,3,4,4,3, 5,1,1,5,4,6, 5,5,5,5,4,6, 7,7,7,4,4,6],
        task_and_page_in_book: "my8 task_23 46 53",
    },
    {
        arr_bubbles: [0,0,2,0,0,1, 1,1,0,0,0,0, 1,0,0,2,0,0, 2,0,0,0,2,2, 1,0,0,1,0,0, 0,0,0,0,0,2],
        arr_zones:   [0,0,0,1,2,3, 1,1,1,1,2,3, 4,4,5,5,2,3, 6,4,5,5,2,2, 6,4,7,7,7,7, 6,4,7,8,8,8],
        task_and_page_in_book: "my9 task_24 46 53",
    },

    {
        arr_bubbles: G.DATA.f_to_arr("000000 000024 124100 040412 002240 412110"),
        arr_zones:   G.DATA.f_to_arr("011112 013312 044352 443352 433552 335522"),
        task_and_page_in_book: "my10 task_25 46 53",
    },
    {        
        arr_bubbles: G.DATA.f_to_arr("241100 000200 200024 100421 014000 042401"),
        arr_zones:   G.DATA.f_to_arr("011232 001232 444232 454222 454677 454667"),
        task_and_page_in_book: "my11 task_26 46 53",
    },
    {
        arr_bubbles: G.DATA.f_to_arr("0800120 4000084 4020100 0881242 1204010 0048028 2184010"),
        arr_zones:   G.DATA.f_to_arr("0011112 3344412 3546478 9566678 95A6A7B CDAAABB CDDDDEE"),
        task_and_page_in_book: "my12 task_28 46 53",
    },
];

G.VIEW.f_renew_task = function (n_new_task_index = 1) {
    G.VIEW.n_task = n_new_task_index;
    //как располагаются зоны в пузырьках (будут нарисованы по квадратной таблице)
    G.VIEW.test_arr_bubbles = G.DATA.ARRAY[G.VIEW.n_task].arr_bubbles.slice();
    G.VIEW.test_arr_zones = G.DATA.ARRAY[G.VIEW.n_task].arr_zones.slice();

    G.TASKS.task_active = new G.F_TASK(G.VIEW.test_arr_bubbles, G.VIEW.test_arr_zones);
};

G.VIEW.f_renew_task();


G.DATA.ARRAY = [
    {
        arr_bubbles: [0,0,1,0, 2,1,2,0, 0,1,1,2, 0,2,0,0],
        arr_zones:   [0,1,2,2, 0,1,3,3, 4,4,5,6, 7,7,5,6],
    },
    {
        arr_bubbles: [0,0,0,0, 2,2,1,1, 1,1,2,2, 0,0,0,0],
        arr_zones:   [0,0,0,0, 0,1,2,0, 0,1,2,0, 0,1,2,0],
    },
    {
        arr_bubbles: [0,1,0,1, 2,4,4,0, 0,4,2,2, 1,2,1,4],
        arr_zones:   [0,1,1,2, 0,0,1,2, 3,3,1,2, 3,3,1,2],
    },
    {
        arr_bubbles: [0,2,0,0,0, 1,2,0,1,1, 0,0,0,0,2, 0,2,0,0,0, 0,1,1,0,2],
        arr_zones:   [0,0,1,2,2, 0,1,1,1,2, 1,1,3,1,1, 1,4,3,5,1, 4,4,3,5,5],
    },
    {
        arr_bubbles: [2,1,2,0,4, 0,4,1,4,0, 0,0,1,2,0, 0,0,1,1,0, 4,4,2,0,2],
        arr_zones:   [0,0,1,1,2, 0,0,1,1,2, 3,4,4,4,2, 3,5,5,6,6, 3,5,5,6,6],
    },
];

G.VIEW.f_renew_task = function (n_new_task_index = 0) {
    G.VIEW.n_task = n_new_task_index;
    //как располагаются зоны в пузырьках (будут нарисованы по квадратной таблице)
    G.VIEW.test_arr_bubbles = G.DATA.ARRAY[G.VIEW.n_task].arr_bubbles.slice();
    G.VIEW.test_arr_zones = G.DATA.ARRAY[G.VIEW.n_task].arr_zones.slice();

    G.TASKS.task_active = new G.F_TASK(G.VIEW.test_arr_bubbles, G.VIEW.test_arr_zones);
};

G.VIEW.f_renew_task();


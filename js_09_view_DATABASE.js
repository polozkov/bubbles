G.DATA.f_to_arr = str => str.split("").filter(s => (s !== " ")).map(hex => parseInt(hex, 16));
G.DATA.ARRAY = [
    null,
    {
        arr_bubbles: [0,0,1,0, 2,1,2,0, 0,1,1,2, 0,2,0,0],
        arr_zones:   [0,1,2,2, 0,1,3,3, 4,4,5,6, 7,7,5,6],
        task_and_page_in_book: "my_1 task_1 44 52", arr_pairs: [],
    },
    {
        arr_bubbles: [0,0,0,0, 2,2,1,1, 1,1,2,2, 0,0,0,0],
        arr_zones:   [0,0,0,0, 0,1,2,0, 0,1,2,0, 0,1,2,0],
        task_and_page_in_book: "my_2 task_2 44 52", arr_pairs: [],
    },
    {
        arr_bubbles: [0,2,1,0, 1,1,0,2, 0,2,1,0, 0,0,0,2],
        arr_zones:   [0,0,0,0, 1,1,1,1, 1,2,3,1, 2,2,3,1],
        task_and_page_in_book: "my_3 task_3 44 52", arr_pairs: [],
    },
    {
        arr_bubbles: [2,0,0,2, 0,1,0,0, 1,0,1,1, 0,2,2,0],
        arr_zones:   [0,0,1,2, 0,1,1,2, 0,3,3,2, 0,0,3,2],
        task_and_page_in_book: "my_4 task_4 44 52", arr_pairs: [],
    },
    {
        arr_bubbles: [0,0,2,0, 2,2,1,1, 0,1,2,0, 1,0,0,0],
        arr_zones:   [0,0,1,2, 0,1,1,2, 3,1,4,4, 3,1,1,1],
        task_and_page_in_book: "my_5 task_5 44 52", arr_pairs: [],
    },
    {
        arr_bubbles: [0,0,2,0, 0,1,1,0, 0,0,2,0, 1,2,1,2],
        arr_zones:   [0,0,0,1, 2,2,0,1, 3,3,0,1, 3,1,1,1],
        task_and_page_in_book: "my_6 task_6 44 52", arr_pairs: [],
    },
    {
        arr_bubbles: [2,1,2,0, 0,1,0,0, 0,1,2,0, 2,0,0,1],
        arr_zones:   [0,0,1,1, 0,2,2,3, 4,4,3,3, 4,4,5,5],
        task_and_page_in_book: "my_7 task_7 44 52", arr_pairs: [],
    },
    {
        arr_bubbles: [0,1,0,1, 2,4,4,0, 0,4,2,2, 1,2,1,4],
        arr_zones:   [0,1,1,2, 0,0,1,2, 3,3,1,2, 3,3,1,2],
        task_and_page_in_book: "my8 task_8 44 52", arr_pairs: [],
    },
    {
        arr_bubbles: [1,1,0,1, 0,0,0,1, 0,0,0,0, 1,1,1,1],
        arr_zones:   [0,0,1,1, 0,2,2,2, 3,2,4,4, 3,3,4,4],
        task_and_page_in_book: "my9 task_9 44 52", arr_pairs: [],
    },
//-----------------------------------------------------------------------
    {
        arr_bubbles: G.DATA.f_to_arr("20020 00100 00020 10001 01212"),
        arr_zones:   G.DATA.f_to_arr("01112 00002 33332 34432 44422"),
        task_and_page_in_book: "my10 task_10 45 53", arr_pairs: [[16,21]],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("00012 02002 21101 10000 20000"),
        arr_zones:   G.DATA.f_to_arr("00011 02013 02013 02113 44443"),
        task_and_page_in_book: "my11 task_11 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("00002 00201 00110 01220 12000"),
        arr_zones:   G.DATA.f_to_arr("00012 34012 34012 34412 33222"),
        task_and_page_in_book: "my12 task_12 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("11000 02200 00100 02102 20001"),
        arr_zones:   G.DATA.f_to_arr("01111 01231 02231 03334 04444"),
        task_and_page_in_book: "my13 task_13 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("02014 04000 21241 10210 44020"),
        arr_zones:   G.DATA.f_to_arr("01222 01111 00000 33444 35554"),
        task_and_page_in_book: "my14 task_14 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("02210 01020 00010 00200 01120"),
        arr_zones:   G.DATA.f_to_arr("00122 03142 33544 65557 66577"),
        task_and_page_in_book: "my15 task_15 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("02210 01020 00010 00200 01120"),
        arr_zones:   G.DATA.f_to_arr("00000 01020 11322 43335 44355"),
        task_and_page_in_book: "my16 task_16 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("12010 00020 00002 00101 01220"),
        arr_zones:   G.DATA.f_to_arr("00000 01110 11211 31214 33244"),
        task_and_page_in_book: "my17 task_17 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("12100 00000 02102 00201 10002"),
        arr_zones:   G.DATA.f_to_arr("00000 01110 11211 13241 33244"),
        task_and_page_in_book: "my18 task_18 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: [0,2,0,0,0, 1,2,0,1,1, 0,0,0,0,2, 0,2,0,0,0, 0,1,1,0,2],
        arr_zones:   [0,0,1,2,2, 0,1,1,1,2, 1,1,3,1,1, 1,4,3,5,1, 4,4,3,5,5],
        task_and_page_in_book: "my19 task_19 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("21204 04140 00120 00110 44202"),
        arr_zones:   G.DATA.f_to_arr("00112 00112 34442 35566 35566"),
        task_and_page_in_book: "my20 task_20 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: [1,0,4,0,0, 4,0,2,0,2, 2,4,1,0,1, 2,0,1,2,4, 0,0,1,0,4],
        arr_zones:   [0,0,0,1,1, 0,2,2,2,1, 3,4,4,4,1, 3,5,5,5,6, 3,3,6,6,6],
        task_and_page_in_book: "my21 task_21 45 53", arr_pairs: [],
    },
    {
        arr_bubbles: G.DATA.f_to_arr("10002 04240 01210 40404 12021"),
        arr_zones:   G.DATA.f_to_arr("00011 02221 02321 02323 00333"),
        task_and_page_in_book: "my22 task_22 45 53", arr_pairs: [],
    },
//-----------------------------------------------------------------------
    {
        arr_bubbles: [0,0,0,0,2,0, 0,1,0,2,0,1, 1,1,0,0,0,2, 0,0,0,0,1,2, 0,0,2,0,0,0, 2,0,0,0,0,1],
        arr_zones:   [0,1,1,2,2,2, 0,1,3,3,3,3, 0,1,3,4,4,3, 5,1,1,5,4,6, 5,5,5,5,4,6, 7,7,7,4,4,6],
        task_and_page_in_book: "my23 task_23 46 53", arr_pairs: [],
    },
    {
        arr_bubbles: [0,0,2,0,0,1, 1,1,0,0,0,0, 1,0,0,2,0,0, 2,0,0,0,2,2, 1,0,0,1,0,0, 0,0,0,0,0,2],
        arr_zones:   [0,0,0,1,2,3, 1,1,1,1,2,3, 4,4,5,5,2,3, 6,4,5,5,2,2, 6,4,7,7,7,7, 6,4,7,8,8,8],
        task_and_page_in_book: "my24 task_24 46 53", arr_pairs: [[14,15]],
    },

    {
        arr_bubbles: G.DATA.f_to_arr("000000 000024 124100 040412 002240 412110"),
        arr_zones:   G.DATA.f_to_arr("011112 013312 044352 443352 433552 335522"),
        task_and_page_in_book: "my25 task_25 46 53", arr_pairs: [],
    },
    {        
        arr_bubbles: G.DATA.f_to_arr("241100 000200 200024 100421 014000 042401"),
        arr_zones:   G.DATA.f_to_arr("011232 001232 444232 454222 454677 454667"),
        task_and_page_in_book: "my26 task_26 46 53", arr_pairs: [],
    },

    {
        arr_bubbles: G.DATA.f_to_arr("111000 011010 000010 001010 100001 001000"),
        arr_zones:   G.DATA.f_to_arr("012222 013455 013466 788496 788494 444444"),
        task_and_page_in_book: "my27 task_27 46 53", arr_pairs: [],
    },

    {
        arr_bubbles: G.DATA.f_to_arr("0800120 4000084 4020100 0881242 1204010 0048028 2184010"),
        arr_zones:   G.DATA.f_to_arr("0011112 3344412 3546478 9566678 95A6A7B CDAAABB CDDDDEE"),
        task_and_page_in_book: "my28 task_28 46 53", arr_pairs: [],
    }

    //-----------------------------------------------------------------------
];

G.VIEW.f_renew_task = function (n_new_task_index = 1) {
    G.VIEW.n_task = n_new_task_index;
    //как располагаются зоны в пузырьках (будут нарисованы по квадратной таблице)
    G.VIEW.test_arr_bubbles = G.DATA.ARRAY[G.VIEW.n_task].arr_bubbles.slice();
    G.VIEW.test_arr_zones = G.DATA.ARRAY[G.VIEW.n_task].arr_zones.slice();
    G.VIEW.test_arr_pairs = G.DATA.ARRAY[G.VIEW.n_task].arr_pairs.map(ab => [ab[0], ab[1]]);

    G.TASKS.task_active = new G.F_TASK(G.VIEW.test_arr_bubbles, G.VIEW.test_arr_zones, G.VIEW.test_arr_pairs);
};

G.VIEW.f_renew_task();
G.EL.range_task.max = G.DATA.ARRAY.length - 1;


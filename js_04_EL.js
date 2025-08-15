G.EL.button_minus = document.getElementById("id-my-button-minus");
G.EL.button_plus = document.getElementById("id-my-button-plus");

G.EL.span_task = document.getElementById("id-my-span-task");
G.EL.range_task = document.getElementById("id-my-range-task");

G.EL.span_book = document.getElementById("id-my-span-book");
G.EL.span_answer = document.getElementById("id-my-span-answer");

//какой сейчас уровень (задача)
G.EL.f_range_from_1 = () => (+G.EL.range_task.value);
//сколько всего уровней (задач)
G.EL.f_amount = () => (+G.EL.range_task.max);

//номер следующей задачи
G.EL.f_next_task_from_1 = (n_from_1 = G.EL.f_range_from_1()) => (((n_from_1) >= G.EL.f_amount()) ? 1 : (n_from_1+1));
//номер предыдущей задачи
G.EL.f_previous_task_from_1 = (n_from_1 = G.EL.f_range_from_1()) => ((n_from_1 <= 1) ? G.EL.f_amount() : (n_from_1-1));
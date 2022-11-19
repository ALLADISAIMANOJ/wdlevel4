/* eslint-disable no-undef */

let todoList = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

const dateToday = new Date();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

const today = formattedDate(dateToday);

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const today = new Date();
    const initDay = 60 * 60 * 24 * 1000;
    const initTodos = [
      {
        title: "Submit Record",
        completed: false,
        dueDate: new Date(today.getTime() - 2 * initDay).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "propose a Girlfriend",
        completed: false,
        dueDate: new Date(today.getTime() - 4 * initDay).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "Submit Record",
        completed: false,
        dueDate: new Date(today.getTime() - 2 * initDay).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "Participate in today Codechef contest",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Buy car",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Pay college fee",
        completed: false,
        dueDate: new Date(today.getTime() + 2 * initDay).toLocaleDateString(
          "en-CA"
        ),
      },
    ];
    initTodos.map(add);
  });
  test("Should add a new todo", () => {
    const initItems = all.length;

    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(initItems + 1);
  });

  test("Should mark a todo as complete(Mark as read)", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should retrieve overdue items", () => {
    overDueTodos = overdue();
    expect(
      overDueTodos.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("Should retrieve due today items", () => {
    dueTodayTodos = dueToday();
    expect(
      dueTodayTodos.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("Should retrieve due later items", () => {
    dueLaterTodos = dueLater();
    expect(
      dueLaterTodos.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});

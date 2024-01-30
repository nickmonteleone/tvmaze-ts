import React from "react";

import Todo from "./Todo";

/** Shows the top todo.
 *
 * Props:
 * - todos
 *
 * TodoApp -> TopTodo
 */

function TopTodo({ todos }) {
  if (todos.length === 0) return null;

  // lowest-priority # is the highest priority
  let top = todos.reduce(
      (acc, cur) => cur.priority < acc.priority ? cur : acc, todos[0]);

  return <Todo todo={top} />;
}

export default TopTodo;
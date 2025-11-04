"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { useTodoStore } from "../../store/todo";

const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const { todos, addTodo, toggleTodo } = useTodoStore();

  const handleAdd = () => {
    if (!text.trim() || !date) return;
    addTodo(text, date);
    setText("");
  };

  // filter todos by selected date
  const filteredTodos = todos.filter(
    (todo) =>
      date && format(todo.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Todo List</h1>

      {/* DATE PICKER */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full justify-start">
            <CalendarIcon className="mr-2" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      {/* ADD TODO */}
      <div className="flex gap-2 mt-4">
        <Input
          placeholder="Add a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>

      {/* LIST */}
      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {filteredTodos.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center mt-4">
              No todos for this date.
            </p>
          ) : (
            filteredTodos.map((todo) => (
              <Card key={todo.id} className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-sm text-muted-foreground ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </label>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;

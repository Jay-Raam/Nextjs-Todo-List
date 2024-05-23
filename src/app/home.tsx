"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "./globals.css";

interface Todo {
  id: number;
  text: string;
  date: string;
}

const LOCAL_STORAGE_KEY = "task-list";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedList = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedList ? JSON.parse(storedList) : [];
  });
  const [newTodo, setNewTodo] = useState<string>("");

  // Use useRef to reference the input element
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() !== "") {
      const newTodos = [
        ...todos,
        { id: Date.now(), text: newTodo, date: new Date().toLocaleString() },
      ];
      setTodos(newTodos);
      setNewTodo("");

      // Focus the input element after adding a new todo
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="max-w-[1200px] mx-auto my-0 p-[32px]">
      <form
        onSubmit={addTodo}
        className="flex justify-center items-center gap-[20px] mt-[30px] mb-[30px]"
      >
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="w-[300px]"
          ref={inputRef}
        />
        <Button
          type="submit"
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "This task so easy do...",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Add
        </Button>
      </form>

      <ul className="p-0 flex justify-center items-center gap-[30px] flex-wrap mx-auto my-0">
        {todos.map((todo) => (
          <Card key={todo.id}>
            <li className="Main-gal_01 flex justify-center items-center flex-col mb-2 p-[20px] gap-[20px]">
              <div>
                <CardTitle>
                  <span>{todo.text}</span>
                </CardTitle>
                <CardDescription>{todo.date}</CardDescription>
              </div>
              <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
            </li>
          </Card>
        ))}
      </ul>
    </div>
  );
}

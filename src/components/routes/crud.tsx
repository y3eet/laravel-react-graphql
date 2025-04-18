import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { useTodos } from "@/hooks/use-todo";

const Crud = () => {
  const { todos, loading, createTodo, updateTodo, deleteTodo } = useTodos();
  const [todo, setTodo] = useState("");
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-sm items-center space-x-2 my-5">
        <Input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="Todo"
        />
        <Button loading={loading} onClick={() => createTodo(todo)} type="submit">
          Add
        </Button>
      </div>

      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          onDelete={(id) => {
            deleteTodo(id);
          }}
          onEdit={(id, newTitle) => {
            console.log({ id, newTitle });
            updateTodo(id, undefined, newTitle);
            toast("Edited Todo", {
              description: `Todo with id ${id} has been updated.`,
            });
          }}
          onCompleteChange={(id, completed) => {
            updateTodo(id, completed);
          }}
        />
      ))}
    </div>
  );
};

export default Crud;

function TodoCard({
  id,
  title,
  completed = false,
  onDelete,
  onEdit,
  onCompleteChange,
}: {
  id: number;
  title: string;
  completed?: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onCompleteChange: (id: number, completed: boolean) => void;
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [disabled, setDisabled] = useState(false);
  return (
    <Card className="mb-3 overflow-hidden w-96 bg-default">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <Checkbox
            disabled={disabled}
            checked={completed}
            onCheckedChange={(e) => {
              onCompleteChange(id, Boolean(e));
            }}
          />
          <p
            className={`text-sm font-medium ${
              completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {title}
          </p>
        </div>
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={disabled}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-blue-500 hover:text-blue-600 rounded-full"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Todo</DialogTitle>
                <DialogDescription>Make changes to your todo item here.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="todo-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="todo-title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      onEdit(id, newTitle);
                    }}
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            disabled={disabled}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive/90 rounded-full"
            onClick={() => {
              setDisabled(true);
              onDelete(id);
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

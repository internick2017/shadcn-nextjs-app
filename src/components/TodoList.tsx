"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Trash2, Calendar as CalendarIcon, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"

import { TodoItem } from "@/types/todo"

// Re-export for backward compatibility
export type { TodoItem }

interface TodoListProps {
  className?: string
}

import { todos } from "@/data/todos"

const initialTodos: TodoItem[] = todos

export function TodoList({ className }: TodoListProps) {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos)
  const [newTodo, setNewTodo] = useState("")
  const [newTodoPriority, setNewTodoPriority] = useState<"low" | "medium" | "high">("medium")
  const [newTodoDueDate, setNewTodoDueDate] = useState<Date | undefined>(undefined)

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        priority: newTodoPriority,
        dueDate: newTodoDueDate ? format(newTodoDueDate, "yyyy-MM-dd") : undefined,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setTodos([todo, ...todos])
      setNewTodo("")
      setNewTodoDueDate(undefined)
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const updateTodoDueDate = (id: string, date: Date | undefined) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { 
        ...todo, 
        dueDate: date ? format(date, "yyyy-MM-dd") : undefined 
      } : todo
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "default"
      case "low": return "secondary"
      default: return "outline"
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Todo List</CardTitle>
            <CardDescription>
              {completedCount} of {totalCount} tasks completed
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            {totalCount - completedCount} pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new todo */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="flex-1"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Badge variant={getPriorityColor(newTodoPriority)} className="text-xs">
                  {newTodoPriority}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
              <div className="space-y-1">
                {["high", "medium", "low"].map((priority) => (
                  <Button
                    key={priority}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setNewTodoPriority(priority as any)}
                  >
                    <Badge variant={getPriorityColor(priority)} className="text-xs mr-2">
                      {priority}
                    </Badge>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4" />
                {newTodoDueDate ? format(newTodoDueDate, "MMM dd") : "Due date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={newTodoDueDate}
                onSelect={setNewTodoDueDate}
                initialFocus
              />
              {newTodoDueDate && (
                <div className="p-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setNewTodoDueDate(undefined)}
                  >
                    Clear date
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          <Button onClick={addTodo} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Todo list */}
        <ScrollArea className="h-[300px] w-full">
          <div className="space-y-2 pr-4">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No tasks yet. Add one above!
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    todo.completed ? "bg-muted/50" : "bg-background"
                  } hover:bg-muted/80 transition-colors`}
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      todo.completed ? "line-through text-muted-foreground" : ""
                    }`}>
                      {todo.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getPriorityColor(todo.priority)} className="text-xs">
                        {todo.priority}
                      </Badge>
                      {todo.dueDate && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                            >
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              <span>{format(new Date(todo.dueDate), "MMM dd, yyyy")}</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(todo.dueDate)}
                              onSelect={(date) => updateTodoDueDate(todo.id, date)}
                              initialFocus
                            />
                            <div className="p-3 border-t">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => updateTodoDueDate(todo.id, undefined)}
                              >
                                Remove date
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                      <div className="space-y-1">
                        {!todo.dueDate && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                              >
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                Add due date
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={undefined}
                                onSelect={(date) => updateTodoDueDate(todo.id, date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-destructive hover:text-destructive"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 
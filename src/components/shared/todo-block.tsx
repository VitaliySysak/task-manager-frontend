import React from "react";
import { cn } from "@/src/lib/utils";
import { TodoList } from "./todo-list";
import { CreateTodo } from "./create-todo";
import { CiSearch } from "react-icons/ci";
import { Search } from "./search";
import { getUserTasks } from "@/src/services/tasks";
import { Task } from "@/@types/user-tasks";

interface Props {
  className?: string;
}

export const TodoBlock: React.FC<Props> = ({ className }) => {
  const [toggleAll, setToggleAll] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const fetchTasks = async (title?: string) => {
    const data = await getUserTasks(title);
    setTasks(data);
  };

  React.useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  return (
    <section
      className={cn(
        "top-6/17 sm:top-1/2 sm:gap-8 h-[36rem] sm:h-[40rem] lg:h-[48rem] ",
        "gap-4 flex flex-col w-[clamp(20rem,80vw,42rem)] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      )}>
      <header className="flex justify-between items-center mb-2 sm:mb-6">
        <h1 className="text-4xl sm:text-6xl font-[600] text-white tracking-[1rem]">TODO</h1>
        <Search onSearch={fetchTasks} />
      </header>
      <CreateTodo
        setToggleAll={setToggleAll}
        toggleAll={toggleAll}
        onTaskAdded={triggerRefresh}
        className="h-16 lg:h-20 rounded-md"
      />
      <TodoList
        filtredTasks={tasks}
        onTaskChange={triggerRefresh}
        className="h-84 flex-1 rounded-md overflow-y-auto scrollbar"
        refreshKey={refreshKey}
      />
    </section>
  );
};

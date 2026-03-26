import { useState } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Task1 from "./pages/Task1";
import Task2 from "./pages/Task2";
import Task3 from "./pages/Task3";

type ActiveTask = "task1" | "task2" | "task3";

export default function App() {
  const [activeTask, setActiveTask] = useState<ActiveTask>("task1");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar activeTask={activeTask} onTaskChange={setActiveTask} />
      <main className="flex-1 max-w-screen-xl mx-auto w-full">
        {activeTask === "task1" && <Task1 />}
        {activeTask === "task2" && <Task2 />}
        {activeTask === "task3" && <Task3 />}
      </main>
      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/Config";
import { MdDelete, MdEdit } from "react-icons/md";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    const taskRef = collection(db, "tasks");
    const unsubscribe = onSnapshot(taskRef, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const taskDocRef = doc(db, "tasks", taskId);
      await deleteDoc(taskDocRef);
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleUpdate = async (taskId) => {
    try {
      const taskDocRef = doc(db, "tasks", taskId);
      await updateDoc(taskDocRef, {
        title: editedTitle,
        description: editedDescription,
      });
      console.log("Task updated successfully");
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  return (
    <div className="mt-5 px-3">
      <h2 className="text-xl font-semibold mb-2">Task List</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="border p-3 mb-2">
            {editingTask === task.id ? (
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="block w-full mb-2 p-1 border rounded"
                />
                <input
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="block w-full mb-2 p-1 border rounded"
                />
                <div className="flex items-center justify-between border">
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="block bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="block bg-gray-400 text-white  rounded mt-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold">Title: {task.title}</h3>
                <p>Description: {task.description}</p>
                <div className="flex items-center justify-center gap-5 mt-2">
                  <MdDelete
                    className="text-2xl text-red-600 cursor-pointer"
                    onClick={() => handleDelete(task.id)}
                  />
                  <MdEdit
                    className="text-2xl text-blue-950 cursor-pointer"
                    onClick={() => handleEdit(task)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

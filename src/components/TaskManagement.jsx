import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/Config";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const TaskManagement = () => {
  const navigate = useNavigate()
  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("title is required")
      .min(3, "title must be at least 3 characters long"),
    description: Yup.string()
      .required("Email is required")
      // .min(3, "title must be at least 3 characters long"),
  });

  const handleTask = async (values, { resetForm }) => {
    try {
      const taskRef = collection(db, "tasks");
      await addDoc(taskRef, {
        title: values.title,
        description: values.description,
        createdAt: new Date(),
      });
  
      console.log("Task added successfully!");
      resetForm();
      navigate("/tasklist")
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <div className="flex justify-center bg-blue-950 h-screen px-2 sm:px-0">
      <div className="w-[400px] h-[300px]">
        <h1 className="mt-10 mb-2 text-xl font-semibold text-white">
        Task Management
        </h1>
        <div className="w-full border border-white sm:border-black rounded px-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleTask}
          >
            {({ isSubmitting }) => (
              <Form>
                <label className="block text-xl text-white">Title</label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  className="block w-full px-2 py-1 mt-2 mb-2 rounded"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <label className="block text-xl text-white">Description</label>
                <Field
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  className="block w-full px-2 py-1 mt-2 mb-2 rounded"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block bg-black text-white text-base font-semibold px-4 py-1 rounded w-full mb-2"
                >
                  {isSubmitting ? "Sending..." : "Send task"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;

"use client";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
export const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {
  const [name, setName] = useState("");
  // for fetching all categories
  const [categories, setCategories] = useState([]);
  // for update and delete
  const [updatingCategory, setUpdatingCategory] = useState(null);
  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });
      if (response.ok) {
        toast.success("Category created successfully");
        const newlyCreatedCategory = await response.json();
        setName("");
        setCategories([newlyCreatedCategory, ...categories]);
      } else {
        const errorData = await response.json();
        toast.error(errorData.err);
      }
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error occurred while creating the category");
    }
  };
  const fetchCategories = async () => {
    try {
      // '/category' not '/categories'
      const response = await fetch(`${process.env.API}/category`);

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
      } else {
        setCategories(data);
      }
    } catch (err) {
      toast.error("An error occurred while fetching categories");
    }
  };
  const updateCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatingCategory),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedCategory = await response.json();
      // Update the categories state with the updated category
      setCategories((prevCategories) =>
        prevCategories.map((c) =>
          c._id === updatedCategory._id ? updatedCategory : c
        )
      );
      // Clear the categoryUpdate state
      setUpdatingCategory(null);
      toast.success("Category updated successfully");
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error occurred while updating the category");
    }
  };
  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const deletedCategory = await response.json();
      // Category deleted successfully, now update the categories state
      setCategories((prevCategories) =>
        prevCategories.filter((c) => c._id !== deletedCategory._id)
      );
      // Clear the categoryUpdate state
      setUpdatingCategory(null);
      toast.success("Category deleted successfully");
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error occurred while deleting the category");
    }
  };

  const fetchCategoriesPublic = async () => {
    try {
      // '/category' not '/categories'
      const response = await fetch(`${process.env.API}/categories`);

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
      } else {
        setCategories(data);
      }
    } catch (err) {
      toast.error("An error occurred while fetching categories");
    }
  };
  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        createCategory,
        categories,
        setCategories,
        fetchCategories,
        fetchCategoriesPublic,
        updatingCategory,
        setUpdatingCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);

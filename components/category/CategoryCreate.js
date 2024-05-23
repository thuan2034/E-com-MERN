"use client";
import { useCategory } from "@/context/category";
export default function AdminCreateCategory() {
  // context
  const {
    name,
    setName,
    updatingCategory,
    setUpdatingCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();
  return (
    <>
      <p>Create Category</p>
      <input
        type="text"
        autofocus="autofocus"
        value={updatingCategory ? updatingCategory.name : name}
        onChange={(e) =>
          updatingCategory
            ? setUpdatingCategory({ ...updatingCategory, name: e.target.value })
            : setName(e.target.value)
        }
        className="form-control p-2 my-2"
      />
      {/* <pre>{JSON.stringify(categoryUpdate, null, 4)}</pre> */}
      <div className="d-flex justify-content-between">
        <button
          className={`btn bg-${
            updatingCategory ? "info" : "primary"
          } text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingCategory ? updateCategory() : createCategory();
            // window.location.reload();
          }}
        >
          {updatingCategory ? "Update" : "Create"}
        </button>

        {updatingCategory && (
          <>
            <button
              className={`btn bg-danger text-light`}
              onClick={(e) => {
                e.preventDefault();
                deleteCategory();
              }}
            >
              Delete
            </button>
            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingCategory(null)}
            >
              Clear
            </button>
          </>
        )}
      </div>
    </>
  );
}

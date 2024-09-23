import React from "react";

export default function CategoryForm({
  handleSubmit,
  value,
  setValue,
  actions,
}) {
  return (
    <form
      className="flex w-full flex-col space-y-3 mt-8"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full py-3 px-4 bg-white rounded-md border"
        type="search"
        placeholder="Add a new category"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="flex lg:w-fit w-full justify-center rounded-md bg-red-600 py-3 mt-4 lg:py-2 px-4 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
        type="submit"
      >
        {actions}
      </button>
    </form>
  );
}

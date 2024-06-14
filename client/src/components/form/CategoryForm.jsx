import React from "react";

export default function CategoryForm({ handleSubmit, value, setValue, actions }) {
  return (
    <div>
      <form
        className="flex w-full flex-col space-y-3 mt-8"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full py-2 px-4 bg-slate-50 rounded-md border"
          type="search"
          placeholder="Add a new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
          type="submit"
        >
          {actions}
        </button>
      </form>
    </div>
  );
}

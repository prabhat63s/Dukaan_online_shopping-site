import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="flex w-full  border rounded-md bg-slate-50"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full lg:py-2 py-3 px-4 bg-slate-50 "
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="px-2" type="submit">
          <BiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

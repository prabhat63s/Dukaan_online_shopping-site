import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`https://dukaan-online-shopping-site.onrender.com/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data,  keyword: "" });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-full lg:py-2 p-4 pl-10 w-96"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <FiSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

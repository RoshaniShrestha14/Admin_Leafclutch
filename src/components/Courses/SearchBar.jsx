import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Check, Filter, Plus, Search } from "lucide-react";

const SearchBar = ({
  searchValue,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  filterOptions,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLabel = filterOptions.find((option) => option.value === selectedFilter)?.label || "All";

  return (
    <div className="courses-topbar__actions">
      <label className="courses-search" htmlFor="courses-search-input">
        <Search size={20} />
        <input
          id="courses-search-input"
          type="text"
          placeholder="Search courses..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="courses-filter-wrap" ref={menuRef}>
        <button type="button" className="courses-filter-btn" onClick={() => setOpen((prev) => !prev)}>
          <Filter size={18} /> Filter: {selectedLabel}
        </button>

        {open && (
          <div className="courses-filter-menu" role="menu" aria-label="Filter courses">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`courses-filter-option${selectedFilter === option.value ? " active" : ""}`}
                onClick={() => {
                  onFilterChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {selectedFilter === option.value && <Check size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>

      <NavLink to="/add-course" className="courses-add-btn">
        <Plus size={18} /> Add New Course
      </NavLink>
    </div>
  );
};

export default SearchBar;
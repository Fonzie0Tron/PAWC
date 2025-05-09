import React from "react";

const Filter = ({ categories, filterType, onFilterChange }) => {
    return (
        <div className="filter-group">
            <label>Filtrar por tipo:</label>
            <select value={filterType} onChange={onFilterChange}>
                <option value="all">Todos</option>
                {categories.sort().map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
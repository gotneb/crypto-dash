const SortSelector = ({ sortBy, onSortChange }) => {
    return ( 
        <div className="controls">
            <label htmlFor="sort">Sort By: </label>
            <select 
              id="sort" 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="market_cap_desc">Market Cap (Desc)</option>
                <option value="market_cap_asc">Market Cap (Asc)</option>
                <option value="price_desc">Price (Desc)</option>
                <option value="price_asc">Price (Asc)</option>
                <option value="change_desc">24h Change (Desc)</option>
                <option value="change_asc">24h Change (Asc)</option>
            </select>
        </div>
     );
}
 
export default SortSelector;
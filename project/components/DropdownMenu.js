
function DropdownMenu(
    {
        onCategorySelect
    }) {
    return (
        <select onChange={(e) => onCategorySelect(e.target.value)}>
            <option value={'all'}>Show all</option>
            <option value={1}>X Universe</option>
            <option value={2}>Elite: Dangerous</option>
            <option value={3}>Starpoint Gemini</option>
            <option value={4}>EVE Online</option>
        </select>
    );
}

export default DropdownMenu;
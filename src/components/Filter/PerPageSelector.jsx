
const PerPageSelector = ({ value, onChange, options = [10, 30, 50] }) => {
  return (
    <select
  value={value}
  onChange={(e) => onChange(Number(e.target.value))}
  className="
    bg-[#282f35]
    border border-[#303f50]
    text-white
    rounded-lg
    py-2 px-3
    pr-10
    text-sm
    focus:outline-none
    focus:border-accent/20
    hover:border-main/30
    transition-colors
    duration-200
    cursor-pointer
    appearance-none
    bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23bd7809%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
    bg-no-repeat
    bg-[length:16px_16px]
    bg-[position:right_12px_center]
  "
>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#282f35] text-white">
          {opt}
        </option>
      ))}
    </select>
  );
};

export default PerPageSelector;
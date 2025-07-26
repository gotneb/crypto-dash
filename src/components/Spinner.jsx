import { BarLoader } from "react-spinners";

// Center
const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      <BarLoader
        color={color}
        size={size}
        aria-label="Loading..."
        cssOverride={override}
      />
    </div>
  );
};

export default Spinner;

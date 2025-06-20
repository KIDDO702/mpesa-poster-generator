import { useState } from "react";
import PaybillForm from "./PaybillForm";
import TillForm from "./TillForm";
import PochiForm from "./PochiForm";
function LipaNaMpesaForm() {
  const [selectedOption, setSelectedOption] = useState<string>("paybill");

  const options = [
    { value: "paybill", label: "Paybill" },
    { value: "till", label: "Till Number" },
    { value: "pochi", label: "Pochi La Biashara" },
  ];

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col gap-2 md:flex-row">
          {options.map(({ value, label }) => {
          const isSelected = selectedOption === value;
          return (
            <label
              key={value}
              className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium
              ${isSelected
                ? "bg-mpesa-green text-white border-mpesa-green"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700"}
                transition duration-200 capitalize`}
            > 
              <input
                type="radio"
                value={value}
                checked={isSelected}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="hidden"
              />
                {label}
              </label>
          );
          })}
        </div>

        <div>
          {selectedOption === "paybill" && <PaybillForm />}
          {selectedOption === "till" && <TillForm />}
          {selectedOption === "pochi" && <PochiForm />}
        </div>
      </div>
    </>
  );
}

export default LipaNaMpesaForm;
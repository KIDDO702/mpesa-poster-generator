import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Props = {
  onGenerate: (data: {
    phoneNumber: string;
    receiverName: string;
  } | null) => void;
};

type Inputs = {
  phoneNumber: string,
  receiverName: string,
};

/**
 * Renders a form component for sending money, allowing users to input
 * a phone number and receiver's name. Utilizes react-hook-form for
 * form handling and validation. Once submitted, it triggers the
 * onGenerate callback with the form data or null when reset.
 *
 * @param {Object} props - The component props
 * @param {function} props.onGenerate - Callback function invoked with the
 * form data on submission or null on reset.
 */
function SendMoneyForm({ onGenerate }: Props) {

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const enrichedData = {
      ...data,
      templateType: "send-money" as const,
    };
    onGenerate(enrichedData);
  };
  

  const phoneValue = watch("phoneNumber");
  const nameValue = watch("receiverName");
  const hasInput = phoneValue?.trim() || nameValue?.trim();

  const handleReset = () => {
    reset();
    onGenerate(null);
  } 
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <label htmlFor="phoneNumber" className="league-spartan-medium text-slate-600 dark:text-slate-300">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="0712345678"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^(07\d{8}|011\d{7})$/,
                message: "Enter a valid Safaricom number (07XXXXXXXX or 011XXXXXXX)",
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 
              placeholder:dark:text-slate-400
              focus:outline-2 focus:outline-offset-2 focus:outline-mpesa-green
              ${errors.phoneNumber 
                ? "border-mpesa-red" 
                : "border-slate-200 dark:border-slate-700"}
            `}
          />

          { errors.phoneNumber && (<p className="mt-1 text-sm text-mpesa-red">{errors.phoneNumber.message}</p>) }
        </div>
        <div className="w-full mt-7">
          <label htmlFor="receiverName">Reciever Name</label>
          <input
            type="text"
            id="receiverName"
            placeholder="Italeta Jina Gani ?"
            {...register("receiverName", {
              required: "Receiver name is required",
              maxLength: {
                value: 25,
                message: "Name should not exceed 25 characters",
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 
              placeholder:dark:text-slate-400
              focus:outline-2 focus:outline-offset-2 focus:outline-mpesa-green
              ${errors.receiverName 
                ? "border-mpesa-red" 
                : "border-slate-200 dark:border-slate-700"}
            `}
          />

          { errors.receiverName && (<p className="mt-1 text-sm text-mpesa-red">{errors.receiverName.message}</p>) }
        </div>
        <div className="mt-8 flex justify-between">
          <button type="submit" className="px-3 py-2 rounded-lg bg-mpesa-green text-mpesa-white hover:bg-mpesa-red">
            Generate Poster
          </button>
          
          { hasInput && (
            <button type="button" onClick={handleReset} className="px-3 py-2 rounded-lg bg-mpesa-red text-mpesa-white hover:bg-mpesa-green">
              Clear
            </button>
          ) }
        </div>
      </form>
    </>
  )
}

export default SendMoneyForm
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Props = {
  onGenerate: (data: {
    agentNumber: string;
    storeNumber: string;
    agentName: string;
  }|null ) => void;
};

type Inputs = {
  agentNumber: string;
  storeNumber: string;
  agentName: string;
};

function WithdrawAgentForm({ onGenerate }: Props) {

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();

  const onSubmit:SubmitHandler<Inputs> = (data) => {
    const enrichedData = {
      ...data,
      templateType: "withdraw-agent" as const,
    };
    console.log("Validated Data:", enrichedData);
    onGenerate(enrichedData);
  }

  const agentNumber = watch("agentNumber");
  const storeNumber = watch("storeNumber");
  const agentName = watch("agentName");
  const hasInput = agentNumber?.trim() || storeNumber?.trim() || agentName?.trim();

  const handleReset = () => {
    reset();
    onGenerate(null);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <label htmlFor="agentNumber" className="league-spartan-medium text-slate-600 dark:text-slate-300">Agent Number</label>
          <input type="text" 
            id="agentNumber" 
            placeholder="123456"
            {...register("agentNumber", {
              required: "Agent number is required",
              pattern: {
                value: /^\d+$/, // Only digits allowed, no spaces or letters
                message: "Enter a valid agent number",
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 
              placeholder:dark:text-slate-400
              focus:outline-2 focus:outline-offset-2 focus:outline-mpesa-green
              ${errors.agentNumber 
                ? "border-mpesa-red" 
                : "border-slate-200 dark:border-slate-700"}
            `} />
          { errors.agentNumber && (<p className="mt-1 text-sm text-mpesa-red">{errors.agentNumber.message}</p>) }
        </div>
        <div className="w-full mt-7">
          <label htmlFor="store-number" className="league-spartan-medium text-slate-600 dark:text-slate-300">Store Number</label>
          <input 
            type="text" 
            id="storeNumber" 
            placeholder="123456"
            {...register("storeNumber", {
              required: "Store number is required",
              pattern: {
                value: /^\d+$/, // Only digits allowed, no spaces or letters
                message: "Enter a valid store number",
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 
              placeholder:dark:text-slate-400
              focus:outline-2 focus:outline-offset-2 focus:outline-mpesa-green
              ${errors.storeNumber 
                ? "border-mpesa-red" 
                : "border-slate-200 dark:border-slate-700"}
            `} 
          />
          { errors.storeNumber && (<p className="mt-1 text-sm text-mpesa-red">{errors.storeNumber.message}</p>) }
        </div>
        <div className="w-full mt-7">
          <label htmlFor="receiverName">Agent Name</label>
          <input 
            type="text" 
            id="receiverName" 
            placeholder="Italeta Jina Gani ?"
            {...register("agentName", {
              required: "Agent name is required",
              maxLength: {
                value: 50,
                message: "Name should not exceed 50 characters",
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 
              placeholder:dark:text-slate-400
              focus:outline-2 focus:outline-offset-2 focus:outline-mpesa-green
              ${errors.agentName 
                ? "border-mpesa-red" 
                : "border-slate-200 dark:border-slate-700"}
            `}
          />
          { errors.agentName && (<p className="mt-1 text-sm text-mpesa-red">{errors.agentName.message}</p>) }
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

export default WithdrawAgentForm
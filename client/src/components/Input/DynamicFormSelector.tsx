import { useState } from "react";
import ActionSelector from "./ActionSelector";
import SendMoneyForm from "./SendMoneyForm";
import WithdrawAgentForm from "./WithdrawAgentForm";
import LipaNaMpesaForm from "./LipaNaMpesa/LipaNaMpesaForm";

type Props = {
  onGenerate: (data: any) => void;
};


function DynamicFormSelector({ onGenerate }: Props) {

  const [selectedAction, setSelectedAction] = useState<string>("send-money");

  return (
    <>
    <div className="w-full px-5 border-2 rounded-lg py-7 border-mpesa-green">
        <ActionSelector value={selectedAction} onChange={setSelectedAction} />
        
        <div className="transition-all duration-300 ease-in-out mt-7">
            { selectedAction === "send-money" && <SendMoneyForm onGenerate={onGenerate} /> }
            { selectedAction === "withdraw" && <WithdrawAgentForm /> }  
            { selectedAction === "lipa-na-mpesa" && <LipaNaMpesaForm /> }
        </div>
    </div>
    </>
  )
}

export default DynamicFormSelector
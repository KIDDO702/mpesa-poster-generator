import { useState } from "react";
import DynamicFormSelector from "../Input/DynamicFormSelector";
import Preview from "./Preview";

type PosterFormData = {
    templateType: "send-money" | "withdraw-agent" | "lipa-na-mpesa";
    templateId: string;
    phoneNumber?: string;
    receiverName?: string;
    agentNumber?: string;
    storeNumber?: string;
    agentName?: string;
  };

function PosterBuilder() {
    const [formData, setFormData] = useState<PosterFormData | null>(null);

  return (
    <>
        <div className="flex flex-col lg:flex-row items-start w-[90%] mx-auto lg:space-x-4 py-10">
            <div className="lg:w-[30%] w-full">
                <DynamicFormSelector onGenerate={setFormData} />
            </div>        
            <div className="lg:w-[70%] w-full mt-7 lg:mt-0">
                <Preview formData={formData} />
            </div>
        </div>
    </>
  )
}

export default PosterBuilder
import { useState } from "react";
import TemplateSelector from "../Templates/TemplateSelector";
import { templateRegistry } from "../Templates/templateRegistry";

type Props = {
  formData: {
    phoneNumber: string;
    receiverName: string;
  } | null;
};

function Preview({ formData }: Props) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("classic-send-money");
  const templateType = "send-money"; // For now, hardcoded

  if (!formData) {
    return <div 
      className="p-5 overflow-auto text-center border-2 border-dashed rounded-md shadow-sm tw-full bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
        No preview yet.
    </div>;
  }

  const selectedTemplate = templateRegistry[templateType].find(
    (template) => template.id === selectedTemplateId
  );

  const TemplateComponent = selectedTemplate?.component;
   
  return (
    <>
      <div className="w-full py-7 overflow-auto border-2 border-dashed rounded-md shadow-sm bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md"
         style={{ height: "500px" }}>
    
        {/* Poster Preview Centered */}
        <div className="flex justify-center overflow-hidden max-h-[320px] sm:max-h-[400px] md:max-h-[480px]">
          <div className="scale-[0.33] sm:scale-[0.4] md:scale-[0.6] origin-top transform">
            <div id="poster-preview" className="w-[1123px] h-[794px]">
              {TemplateComponent && <TemplateComponent {...formData} />}
            </div>
          </div>
        </div>


        {/* Template Selector BELOW, centered */}
        <div className="mt-5 flex justify-center">
          <TemplateSelector
            templateType={templateType}
            selectedTemplateId={selectedTemplateId}
            onSelect={(id) => setSelectedTemplateId(id)}
            formData={formData}
          />
        </div>
      </div>
    </>
  )
}

export default Preview
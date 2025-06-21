import { useState, useEffect } from "react";
import TemplateSelector from "../Templates/TemplateSelector";
import { templateRegistry } from "../Templates/templateRegistry";
// import ClassicWithdrawAgent from "../Templates/WithdrawAgent/ClassicWithdrawAgent";

type Props = {
  formData:
    | {
        templateType: "send-money" | "withdraw-agent" | "lipa-na-mpesa";
        [key: string]: string | number | boolean; // allows extra fields like phoneNumber, agentName, etc.
      }
    | null;
};
function Preview({ formData }: Props) {
  const templateType = formData?.templateType;
  const availableTemplates = templateType ? templateRegistry[templateType] || [] : [];

  const [selectedTemplateId, setSelectedTemplateId] = useState(
    availableTemplates[0]?.id || ""
  );

  useEffect(() => {
    // Reset template when templateType changes
    if (templateType) {
      const defaultId = templateRegistry[templateType]?.[0]?.id || "";
      setSelectedTemplateId(defaultId);
    }
  }, [templateType]);

  if (!formData) {
    return <div 
      className="p-5 overflow-auto text-center border-2 border-dashed rounded-md shadow-sm tw-full bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
        No preview yet.
    </div>;
  }

  const selectedTemplate = availableTemplates.find(
    (template) => template.id === selectedTemplateId
  );

  const TemplateComponent = selectedTemplate?.component;
   
  return (
    <>
      <div className="w-full py-7 overflow-auto border-2 border-dashed rounded-md shadow-sm bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md"
         style={{ height: "500px" }}>
    
        {/* Poster Preview Centered */}
        <div className="flex justify-center sm:max-h-[400px] max-h-[500px]">
          <div className="scale-[0.33] sm:scale-[0.4] md:scale-[0.6] origin-top transform">
            <div id="poster-preview" className="w-[1123px] h-[794px]">
              {TemplateComponent && <TemplateComponent {...formData} />}
              {/* <ClassicWithdrawAgent agentNumber="12345" storeNumber="67890" agentName="John Doe" /> */}
            </div>
          </div>
        </div>


        {/* Template Selector BELOW, centered */}
        <div className="mt-28 flex justify-center">
          <TemplateSelector
            templateType={templateType ?? "send-money"}
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
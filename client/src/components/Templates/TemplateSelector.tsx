import { templateRegistry } from "./templateRegistry"

type Props = {
  templateType: string;
  selectedTemplateId: string;
  onSelect: (templateId: string) => void;
  formData: any;
};

function TemplateSelector({ templateType, selectedTemplateId, onSelect, formData }: Props) {
  const templates = templateRegistry[templateType] || [];
  return (
    <div className="mt-6">
      <h2 className="mb-4 text-center text-lg font-semibold text-slate-700 dark:text-slate-200">
        Select a Template
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {templates.map((template) => {
          const TemplateComponent = template.component;
          const isSelected = template.id === selectedTemplateId;

          return (
            <div
              key={template.id}
              className={`cursor-pointer border-2 rounded-md p-2 transition-transform duration-200 ${
                isSelected
                  ? "border-mpesa-red scale-105 shadow-md"
                  : "border-transparent hover:border-mpesa-green"
              }`}
              onClick={() => onSelect(template.id)}
            >
              <div
                className={`w-[280px] h-[200px] bg-white rounded-md overflow-hidden border ${
                isSelected ? "border-red-500 shadow-lg" : "border-slate-300 hover:border-slate-500"
                } cursor-pointer transition`}
                onClick={() => onSelect(template.id)}
              >
                {/* Scaled poster preview */}
                <div className="scale-[0.25] origin-top-left">
                  <div className="w-[1123px] h-[794px]">
                    <TemplateComponent {...formData} />
                  </div>
                </div>
              </div>
              <div>
                {/* Template name */}
                <p className="text-center text-base font-medium text-slate-700 dark:text-slate-300 mt-2">
                  {template.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TemplateSelector
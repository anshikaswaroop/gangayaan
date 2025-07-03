
import { Button } from "@/components/ui/button";
import { Satellite, CloudRain, Map, FileText, HelpCircle } from "lucide-react";

interface QuickFiltersProps {
  onCategorySelect: (category: string) => void;
}

const QuickFilters = ({ onCategorySelect }: QuickFiltersProps) => {
  const categories = [
    { key: 'missions', label: 'Missions', icon: Satellite },
    { key: 'weather', label: 'Weather Products', icon: CloudRain },
    { key: 'maps', label: 'Maps', icon: Map },
    { key: 'docs', label: 'Docs', icon: FileText },
    { key: 'faqs', label: 'FAQs', icon: HelpCircle }
  ];

  return (
    <div className="w-full bg-white py-8 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-space-navy mb-6 text-center">
          Quick Access Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.key}
                onClick={() => onCategorySelect(category.key)}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 h-auto border-2 border-isro-blue text-isro-blue hover:bg-isro-blue hover:text-white transition-all duration-200 hover:scale-105"
              >
                <IconComponent className="h-5 w-5" />
                <span className="font-medium">{category.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;

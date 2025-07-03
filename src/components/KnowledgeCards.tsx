
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Satellite, Calendar, Download, FileText, CloudRain, MapPin, HelpCircle } from "lucide-react";

interface KnowledgeCardsProps {
  category: string | null;
}

const KnowledgeCards = ({ category }: KnowledgeCardsProps) => {
  const missionData = [
    {
      id: 1,
      title: "INSAT-3D",
      mission: "Meteorological Satellite",
      launchDate: "July 26, 2013",
      products: ["Imager", "Sounder", "DRT", "SaR"],
      description: "Advanced meteorological observations and disaster warning",
      downloadLink: "#insat3d-data"
    },
    {
      id: 2,
      title: "Megha-Tropiques",
      mission: "Indo-French Joint Mission",
      launchDate: "October 12, 2011",
      products: ["MADRAS", "SCARAB", "SAPHIR"],
      description: "Tropical weather and climate monitoring satellite",
      downloadLink: "#megha-data"
    },
    {
      id: 3,
      title: "OceanSat-2",
      mission: "Ocean Color Monitor",
      launchDate: "September 23, 2009",
      products: ["OCM", "ROSA", "Ku-band Scatterometer"],
      description: "Ocean color and wind vector measurements",
      downloadLink: "#oceansat-data"
    }
  ];

  const weatherData = [
    {
      id: 1,
      title: "Rainfall Products",
      type: "Weather Data",
      description: "Real-time and historical rainfall data from multiple satellites",
      format: "NetCDF, HDF5",
      downloadLink: "#rainfall-data"
    },
    {
      id: 2,
      title: "Temperature Analysis",
      type: "Weather Data", 
      description: "Surface and atmospheric temperature measurements",
      format: "GRIB2, NetCDF",
      downloadLink: "#temp-data"
    }
  ];

  const mapData = [
    {
      id: 1,
      title: "Land Use Maps",
      type: "Geospatial",
      description: "High-resolution land use and land cover maps",
      format: "GeoTIFF, Shapefile",
      downloadLink: "#landuse-maps"
    },
    {
      id: 2,
      title: "Vegetation Index",
      type: "Geospatial",
      description: "NDVI and other vegetation indices",
      format: "GeoTIFF, NetCDF",
      downloadLink: "#vegetation-maps"
    }
  ];

  const docData = [
    {
      id: 1,
      title: "User Manual - INSAT Data",
      type: "Documentation",
      description: "Complete guide for accessing and using INSAT satellite data",
      format: "PDF",
      downloadLink: "#insat-manual"
    },
    {
      id: 2,
      title: "API Documentation",
      type: "Technical Guide",
      description: "REST API documentation for data access",
      format: "PDF, HTML",
      downloadLink: "#api-docs"
    }
  ];

  const faqData = [
    {
      id: 1,
      question: "How do I download satellite data?",
      answer: "Register on MOSDAC portal, browse datasets, and use the download links provided.",
      category: "Data Access"
    },
    {
      id: 2,
      question: "What formats are available?",
      answer: "We provide data in NetCDF, HDF5, GeoTIFF, and other standard formats.",
      category: "Data Formats"
    },
    {
      id: 3,
      question: "Is there an API available?",
      answer: "Yes, we provide REST APIs for programmatic access to our datasets.",
      category: "Technical"
    }
  ];

  const renderMissionCards = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {missionData.map((mission) => (
        <Card key={mission.id} className="border-l-4 border-l-isro-blue hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Satellite className="h-5 w-5 text-isro-blue" />
              <CardTitle className="text-lg text-isro-blue">{mission.title}</CardTitle>
            </div>
            <Badge variant="secondary" className="w-fit">{mission.mission}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span><strong>Launch:</strong> {mission.launchDate}</span>
            </div>
            <div className="text-sm">
              <strong className="text-gray-700">Products:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {mission.products.map((product, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{product}</Badge>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">{mission.description}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-isro-blue text-isro-blue hover:bg-isro-blue hover:text-white"
              asChild
            >
              <a href={mission.downloadLink}>
                <Download className="h-4 w-4 mr-2" />
                Access Data
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderWeatherCards = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {weatherData.map((item) => (
        <Card key={item.id} className="border-l-4 border-l-isro-orange hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="h-5 w-5 text-isro-orange" />
              <CardTitle className="text-lg text-isro-blue">{item.title}</CardTitle>
            </div>
            <Badge variant="secondary" className="w-fit">{item.type}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="text-sm">
              <strong className="text-gray-700">Format:</strong> {item.format}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-isro-orange text-isro-orange hover:bg-isro-orange hover:text-white"
              asChild
            >
              <a href={item.downloadLink}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMapCards = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mapData.map((item) => (
        <Card key={item.id} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg text-isro-blue">{item.title}</CardTitle>
            </div>
            <Badge variant="secondary" className="w-fit">{item.type}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="text-sm">
              <strong className="text-gray-700">Format:</strong> {item.format}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              asChild
            >
              <a href={item.downloadLink}>
                <Download className="h-4 w-4 mr-2" />
                View Maps
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderDocCards = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {docData.map((doc) => (
        <Card key={doc.id} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-lg text-isro-blue">{doc.title}</CardTitle>
            </div>
            <Badge variant="secondary" className="w-fit">{doc.type}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">{doc.description}</p>
            <div className="text-sm">
              <strong className="text-gray-700">Format:</strong> {doc.format}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              asChild
            >
              <a href={doc.downloadLink}>
                <FileText className="h-4 w-4 mr-2" />
                View Document
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFaqCards = () => (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
      {faqData.map((faq) => (
        <Card key={faq.id} className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg text-isro-blue">{faq.question}</CardTitle>
            </div>
            <Badge variant="secondary" className="w-fit">{faq.category}</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{faq.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (!category) return null;

  const getCategoryTitle = () => {
    switch (category) {
      case 'missions': return 'Satellite Missions';
      case 'weather': return 'Weather Products';
      case 'maps': return 'Maps & Geospatial Data';
      case 'docs': return 'Documentation';
      case 'faqs': return 'Frequently Asked Questions';
      default: return 'Knowledge Base';
    }
  };

  const renderContent = () => {
    switch (category) {
      case 'missions': return renderMissionCards();
      case 'weather': return renderWeatherCards();
      case 'maps': return renderMapCards();
      case 'docs': return renderDocCards();
      case 'faqs': return renderFaqCards();
      default: return renderMissionCards();
    }
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-space-navy mb-4">{getCategoryTitle()}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of satellite data, missions, and resources
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default KnowledgeCards;

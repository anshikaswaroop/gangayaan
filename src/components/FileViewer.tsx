
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Download, ExternalLink, Eye } from "lucide-react";

interface FileItem {
  id: string;
  title: string;
  type: 'PDF' | 'DOCX' | 'XLSX';
  size: string;
  description: string;
  downloadUrl: string;
  previewUrl?: string;
}

const FileViewer = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const sampleFiles: FileItem[] = [
    {
      id: '1',
      title: 'Satellite Rainfall Algorithm Documentation',
      type: 'PDF',
      size: '2.4 MB',
      description: 'Comprehensive guide to satellite-based rainfall estimation algorithms and methodologies used in ISRO missions.',
      downloadUrl: '#pdf-download-1',
      previewUrl: '#pdf-preview-1'
    },
    {
      id: '2',
      title: 'MOSDAC Data User Manual',
      type: 'PDF',
      size: '8.1 MB',
      description: 'Complete user manual for accessing, downloading, and processing meteorological and oceanographic data.',
      downloadUrl: '#pdf-download-2',
      previewUrl: '#pdf-preview-2'
    },
    {
      id: '3',
      title: 'Mission Parameters Spreadsheet',
      type: 'XLSX',
      size: '1.2 MB',
      description: 'Detailed specifications and parameters for all active ISRO Earth observation missions.',
      downloadUrl: '#xlsx-download-1'
    },
    {
      id: '4',
      title: 'Data Product Catalog',
      type: 'DOCX',
      size: '3.8 MB',
      description: 'Catalog of all available data products with formats, processing levels, and access information.',
      downloadUrl: '#docx-download-1'
    }
  ];

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5" />;
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'XLSX':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'DOCX':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-space-navy mb-2 text-center">
          Documents & Resources
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Access technical documentation, user manuals, and data catalogs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleFiles.map((file) => (
            <Card key={file.id} className="shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-isro-blue">
                  <div className={`p-2 rounded-lg border ${getFileColor(file.type)}`}>
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{file.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getFileColor(file.type)}`}>
                        {file.type}
                      </span>
                      <span className="text-sm text-gray-500">{file.size}</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {file.description}
                </p>
                
                <div className="flex gap-2">
                  {file.previewUrl && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-isro-blue text-isro-blue hover:bg-isro-blue hover:text-white"
                          onClick={() => setSelectedFile(file)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            {file.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <div className="bg-gray-100 p-8 rounded-lg text-center">
                            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-4">
                              Document preview would be displayed here
                            </p>
                            <p className="text-sm text-gray-500">
                              In a real implementation, this would show the actual document content
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  <Button 
                    className="flex-1 bg-isro-blue hover:bg-isro-blue/90 text-white" 
                    asChild
                  >
                    <a href={file.downloadUrl}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            variant="outline"
            className="border-isro-blue text-isro-blue hover:bg-isro-blue hover:text-white"
            asChild
          >
            <a href="#all-documents">
              <ExternalLink className="h-4 w-4 mr-2" />
              Browse All Documents
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileViewer;

// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-[#0153A5] text-white text-sm">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-semibold">SEARCH</label>
          <input
            type="text"
            placeholder="Search..."
            className="p-1 px-2 text-black rounded"
          />
          <button className="bg-white p-1 rounded-full">🔍</button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">FOLLOW US</span>
          <img src="fb.png" alt="ISRO" className="h-4 mx-auto" />
          <img src="yb.png" alt="ISRO" className="h-6 mx-auto" />
          <a href="#" aria-label="Facebook"></a>
          
          <a href="#" aria-label="YouTube"></a>
        
        </div>
      </div>

      {/* Middle Row */}
      <div className="bg-[#004a90] border-t border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-center gap-4 text-xs">
          <a href="#" className="hover:underline">Feedback</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Copyright Policy</a>
          <a href="#" className="hover:underline">Data Access Policy</a>
          <a href="#" className="hover:underline">Hyperlink Policy</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Website Policies</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <a href="#" className="hover:underline">FAQs</a>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bg-white py-3 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-4 items-center justify-center">
        <a href="https://www.isro.gov.in" target="_blank" rel="noopener noreferrer">
        <img src="isro.png" alt="ISRO" className="h-14 hover:opacity-80 transition" />
        </a>

        <a href="https://www.sac.gov.in" target="_blank" rel="noopener noreferrer">
         <img src="public/Space_Applications_Centre_logo.png" alt="SAC" className="h-14 hover:opacity-80 transition" />
        </a>
        <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer">
         <img src="India.gov.in.webp" alt="India.gov.in" className="h-14 hover:opacity-80 transition" />
        </a>
        <a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer">
         <img src="my gov.png" alt="MyGov" className="h-14 hover:opacity-80 transition" />
        </a>
        <a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer">
         <img src="download.png" alt="Digital India" className="h-14 hover:opacity-80 transition" />
        </a>
        <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer">
         <img src="data-gov.png" alt="Data.gov.in" className="h-14 hover:opacity-80 transition" />
        </a>
        </div>
        <p className="text-center text-xs text-black mt-2">
          "Ver 3.0; Last reviewed and updated on 06 Jul, 2025 & Served By: Web-Srv-Pri"
        </p>
      </div>
    </footer>
  );
};

export default Footer;

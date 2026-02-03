
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image as ImageIcon, Download } from 'lucide-react';
import { GalleryImage } from './types';

const IMAGE_URLS = [
  "https://i.postimg.cc/bwSs3jsJ/grok-image-1769992354718.jpg",
  "https://i.postimg.cc/L8gnNMn4/grok-image-1769992356426.jpg",
  "https://i.postimg.cc/L8gnNMn8/grok-image-1769992362297.jpg",
  "https://i.postimg.cc/Mpfvd8vv/grok-image-1769992366807.jpg",
  "https://i.postimg.cc/W1qhXPhz/grok-image-1769992382527.jpg",
  "https://i.postimg.cc/x1NctScQ/grok-image-1769992386235.jpg",
  "https://i.postimg.cc/YCLhbwhp/grok-image-1769992388704.jpg",
  "https://i.postimg.cc/K83RJy4d/grok-image-1769992390359.jpg",
  "https://i.postimg.cc/Dw48BKm9/grok-image-1769992392763.jpg",
  "https://i.postimg.cc/52Q6nM6d/grok-image-1769992394366.jpg",
  "https://i.postimg.cc/Nj25pw5w/grok-image-1769992396679.jpg",
  "https://i.postimg.cc/wjR70d3n/grok-image-1769992398561.jpg",
  "https://i.postimg.cc/Z5vCVh0D/grok-image-1769992402965.jpg",
  "https://i.postimg.cc/Mpfvd8X3/grok-image-1769992429481.jpg",
  "https://i.postimg.cc/fTrVcbTn/grok-image-1769992431430.jpg",
  "https://i.postimg.cc/P5vP2kNc/grok-image-1769992433103.jpg",
  "https://i.postimg.cc/YCLhbwjP/grok-image-1769992434849.jpg",
  "https://i.postimg.cc/ZKMW8qKk/grok-image-1769992438179.jpg",
  "https://i.postimg.cc/qM5Ns7BP/grok-image-1769992439816.jpg",
  "https://i.postimg.cc/FsRfkSvc/grok-image-1769992441394.jpg",
  "https://i.postimg.cc/DyZW4Ghr/grok-image-1769992443842.jpg",
  "https://i.postimg.cc/kX4VRSCy/grok-image-1769992445622.jpg",
  "https://i.postimg.cc/HsxJ8MmX/grok-image-1769992449316.jpg",
  "https://i.postimg.cc/vHN4rm87/grok-image-1769992464731.jpg",
  "https://i.postimg.cc/KvH1PYcP/grok-image-1769992469239.jpg",
  "https://i.postimg.cc/QxyFQMN1/grok-image-1769992471034.jpg",
  "https://i.postimg.cc/NfzK60GT/grok-image-1769992473299.jpg",
  "https://i.postimg.cc/yYbDmN6n/grok-image-1769992476617.jpg",
  "https://i.postimg.cc/gkTxV0c1/grok-image-1769992478429.jpg",
  "https://i.postimg.cc/J42sNh79/grok-image-1769992480797.jpg",
  "https://i.postimg.cc/4NSY634S/grok-image-1769992482427.jpg",
  "https://i.postimg.cc/hPjJQmn7/grok-image-1769992485012.jpg",
  "https://i.postimg.cc/Yq94LF7v/grok-image-1769992486811.jpg",
  "https://i.postimg.cc/c4HKt3W4/grok-image-1769992499592.jpg",
  "https://i.postimg.cc/kX4VRSCg/grok-image-1769992501750.jpg",
  "https://i.postimg.cc/5N0HQzJj/grok-image-1769992506371.jpg",
  "https://i.postimg.cc/286qLWYy/grok-image-1769992508026.jpg",
  "https://i.postimg.cc/8P5FfvGk/grok-image-1769992511682.jpg",
  "https://i.postimg.cc/c1TgJmpJ/grok-image-1769992513303.jpg",
  "https://i.postimg.cc/fTL3Sdsh/grok-image-1769992515820.jpg",
  "https://i.postimg.cc/SNsXY944/grok-image-1769992517528.jpg",
  "https://i.postimg.cc/fTL3Sdsz/grok-image-1769992539535.jpg",
  "https://i.postimg.cc/HW3cL2qs/grok-image-1769992543960.jpg",
  "https://i.postimg.cc/1RMnzHkS/grok-image-1769992547134.jpg",
  "https://i.postimg.cc/dQnk0BbM/grok-image-1769992550308.jpg",
  "https://i.postimg.cc/FFGdKZ2M/grok-image-1769992552013.jpg",
  "https://i.postimg.cc/PfKpq4gf/grok-image-1769992556257.jpg",
  "https://i.postimg.cc/ZYjBqcGb/grok-image-1769992557953.jpg",
  "https://i.postimg.cc/L4vYsTrG/grok-image-1769992560315.jpg",
  "https://i.postimg.cc/FFGdKZ22/grok-image-1769992562203.jpg",
  "https://i.postimg.cc/Df5JzgtN/grok-image-1769992567774.jpg",
  "https://i.postimg.cc/dQnk0Bzp/grok-image-1769992576820.jpg",
  "https://i.postimg.cc/c1TgJmVc/grok-image-1769992642785.jpg",
  "https://i.postimg.cc/7PXGLVpV/grok-image-1769992644582.jpg",
  "https://i.postimg.cc/CMJBKNWv/grok-image-1769992648628.jpg",
  "https://i.postimg.cc/T2QLP9Z4/grok-image-1769992650968.jpg",
  "https://i.postimg.cc/kGjBhJQt/grok-image-1769992653350.jpg",
  "https://i.postimg.cc/GtMHSLF8/grok-image-1769992655750.jpg",
  "https://i.postimg.cc/2yHVXkQq/grok-image-1769992657796.jpg",
  "https://i.postimg.cc/j28LkxHR/grok-image-1769992662604.jpg",
  "https://i.postimg.cc/L54JTYZx/grok-image-1769992664414.jpg",
  "https://i.postimg.cc/8ck7HJry/grok-image-1769992666879.jpg",
  "https://i.postimg.cc/RhCWR6H4/grok-image-1769992668668.jpg",
  "https://i.postimg.cc/wMW7bqhP/grok-image-1769992671707.jpg",
  "https://i.postimg.cc/RhCWR6nd/grok-image-1769992673461.jpg",
  "https://i.postimg.cc/J07sqDB2/grok-image-1769992675942.jpg",
  "https://i.postimg.cc/T12K9LDM/grok-image-1769992678428.jpg",
  "https://i.postimg.cc/T1kpHdVX/grok-image-1769992680309.jpg",
  "https://i.postimg.cc/BbZjgL1B/grok-image-1769992682990.jpg",
  "https://i.postimg.cc/Gt34Q8sY/grok-image-1769992684714.jpg",
  "https://i.postimg.cc/yx6DPgSm/grok-image-1769992687166.jpg",
  "https://i.postimg.cc/brYZTD2H/grok-image-1769992688865.jpg",
  "https://i.postimg.cc/5y9X3YF3/grok-image-1769992692812.jpg",
  "https://i.postimg.cc/PxQLYzNS/grok-image-1769992696099.jpg",
  "https://i.postimg.cc/LX3qLBhN/grok-image-1769992697865.jpg",
  "https://i.postimg.cc/j54WPQCc/grok-image-1769992700550.jpg",
  "https://i.postimg.cc/QtJB1kVk/grok-image-1769992702430.jpg",
  "https://i.postimg.cc/PxQLYzNQ/grok-image-1769992705439.jpg",
  "https://i.postimg.cc/tTN1Wt75/grok-image-1769992707154.jpg",
  "https://i.postimg.cc/MTmcVbXY/grok-image-1769992708995.jpg",
  "https://i.postimg.cc/LX3qLBhz/grok-image-1769992711268.jpg",
  "https://i.postimg.cc/hj1JTbhm/grok-image-1769992712896.jpg",
  "https://i.postimg.cc/gJHw8qr6/grok-image-1769992718257.jpg",
  "https://i.postimg.cc/267qhF3b/grok-image-1769992719893.jpg",
  "https://i.postimg.cc/sX4B7913/grok-image-1769992721646.jpg",
  "https://i.postimg.cc/Hx9JX4jW/grok-image-1769992724010.jpg",
  "https://i.postimg.cc/d1j7rmDV/grok-image-1769992725635.jpg",
  "https://i.postimg.cc/zBFLKS33/grok-image-1769992728078.jpg",
  "https://i.postimg.cc/RFL3KQq4/grok-image-1769992734299.jpg",
  "https://i.postimg.cc/xC2JXFjk/grok-image-1769992736014.jpg",
  "https://i.postimg.cc/hjBzX34f/grok-image-1769992737777.jpg",
  "https://i.postimg.cc/50VYXk90/grok-image-1769992740101.jpg",
  "https://i.postimg.cc/pTHhm1VP/grok-image-1769992742529.jpg",
  "https://i.postimg.cc/xC2JXFjf/grok-image-1769992744158.jpg",
  "https://i.postimg.cc/sXrQM0ff/grok-image-1769992753281.jpg",
  "https://i.postimg.cc/FR4dYnF9/grok-image-1769992755559.jpg",
  "https://i.postimg.cc/JnLDsdrS/grok-image-1769992758319.jpg"
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- Sub-component: Individual Image Card ---
const ImageCard: React.FC<{ 
  image: GalleryImage; 
  onDownload: (e: React.MouseEvent, url: string, name: string) => void;
  isDownloading: boolean;
  priority?: boolean;
}> = ({ image, onDownload, isDownloading, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    // tabindex=0 allows the div to focus (on click/tap), revealing the button via group-focus-within
    <div 
      className="masonry-item relative group mb-3 md:mb-6 break-inside-avoid outline-none" 
      tabIndex={0}
    >
      <div className="relative w-full rounded-xl overflow-hidden bg-gray-100">
        
        {/* Static Skeleton - Placeholder used until image loads */}
        {!isLoaded && (
          <div className="w-full h-64 bg-gray-200" />
        )}

        {/* 
           Image:
           - Removed 'hidden' class which causes display:none and prevents loading in some browsers.
           - Used opacity-0 absolute positioning to hide it while loading but keep it in DOM.
           - Added eager loading support for initial items.
        */}
        <img 
          src={image.url} 
          alt={image.name}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-auto block object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100 relative' : 'opacity-0 absolute top-0 left-0 w-full h-full'}`}
        />
        
        {/* Download Button */}
        <button
          onClick={(e) => onDownload(e, image.url, image.name)}
          disabled={isDownloading}
          className={`
            absolute bottom-2 right-2 w-8 h-8 rounded-full 
            bg-white/90 hover:bg-white text-black 
            flex items-center justify-center 
            shadow-md transition-all duration-200 z-10
            ${isLoaded ? 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100' : 'hidden'}
            ${isDownloading ? 'opacity-100 cursor-wait' : ''}
          `}
          title="Download"
        >
          {isDownloading ? (
            <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <Download size={14} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  );
};

const BATCH_SIZE = 15;

const App: React.FC = () => {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Create Objects
    const rawImages: GalleryImage[] = IMAGE_URLS.map((url, index) => ({
      id: String(index + 1),
      url: url,
      name: `Image-${index + 1}`,
      description: 'Gallery image',
      tags: ['gallery'],
      createdAt: Date.now(),
      size: 0,
      type: 'image/jpeg'
    }));

    // 2. Shuffle
    const shuffled = shuffleArray(rawImages);
    setAllImages(shuffled);
    
    // 3. Initial Load
    setDisplayedImages(shuffled.slice(0, BATCH_SIZE));
  }, []);

  // Infinite Scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setDisplayedImages((prev) => {
        if (prev.length >= allImages.length) return prev;
        const nextBatch = allImages.slice(prev.length, prev.length + BATCH_SIZE);
        return [...prev, ...nextBatch];
      });
    }
  }, [allImages]);

  useEffect(() => {
    const option = { root: null, rootMargin: "200px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
  }, [handleObserver, displayedImages.length]);

  const handleDownload = async (e: React.MouseEvent, url: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const imageId = allImages.find(img => img.url === url)?.id;
    if (imageId) setDownloadingId(imageId);

    try {
      const response = await fetch(url, { method: 'GET', mode: 'cors' });
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(url, '_blank');
    } finally {
      if (imageId) setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-3 py-3 md:px-8 md:py-8">
      {/* Masonry Grid */}
      <div className="masonry-grid">
        {displayedImages.map((image, index) => (
          <ImageCard 
            key={image.id}
            image={image}
            onDownload={handleDownload}
            isDownloading={downloadingId === image.id}
            priority={index < 6}
          />
        ))}
      </div>

      {/* Loader */}
      <div ref={loaderRef} className="w-full py-12 flex justify-center opacity-0">
        <div className="h-4 w-4" /> 
      </div>

      {/* Empty State */}
      {displayedImages.length === 0 && allImages.length === 0 && (
         <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
           <ImageIcon size={40} className="mb-3" />
         </div>
      )}
    </div>
  );
};

export default App;

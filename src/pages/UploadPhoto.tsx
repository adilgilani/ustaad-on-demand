import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadPhoto = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const state = loc.state as any;
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
  };

  return (
    <div className="phone-frame pb-20">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-heading font-bold">Show us what happened</h1>
          <p className="text-xs text-muted-foreground font-body">A photo helps the Ustaad understand your problem faster</p>
        </div>
      </div>

      <div className="px-4 mt-6">
        {!uploaded ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleUpload}
            className="w-full h-52 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 flex flex-col items-center justify-center gap-3"
          >
            <Camera size={40} className="text-primary" />
            <div className="text-center">
              <p className="text-sm font-heading font-semibold text-foreground">Take a Photo</p>
              <p className="text-xs text-muted-foreground">or Upload from Gallery</p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full h-52 rounded-2xl bg-muted flex flex-col items-center justify-center gap-2 relative"
          >
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-muted to-border" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle2 size={48} className="text-success" />
            </div>
          </motion.div>
        )}

        <button
          onClick={() => navigate('/map-offers', { state })}
          className="w-full mt-4 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-base"
        >
          Search Nearby Ustaads
        </button>

        {!uploaded && (
          <button
            onClick={() => navigate('/map-offers', { state })}
            className="w-full mt-2 py-2 text-sm text-muted-foreground font-body"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadPhoto;

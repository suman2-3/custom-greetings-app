import { useContext, useRef, useState } from "react";
import html2canvas from "html2canvas";

import { UserContext } from "../context/UserContext";
import PremiumModal from "./PremiumModal";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";

function GreetingCard({ item }) {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const previewRef = useRef();

  const createImageBlob = (canvas) =>
    new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });

  const createPersonalizedFile = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    });

    const blob = await createImageBlob(canvas);
    if (!blob) {
      throw new Error("Failed to generate image");
    }

    return new File([blob], `${item.title.replace(/\s+/g, "_")}.png`, {
      type: "image/png",
    });
  };

  const handleShare = async (event) => {
    event.stopPropagation();

    if (item.isPremium) {
      setShowModal(true);
      return;
    }

    setIsSharing(true);
    setStatus("Preparing your personalized card...");

    try {
      const file = await createPersonalizedFile();

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: item.title,
          text: `A personalized greeting card from ${user?.name || "Guest"}`,
        });
        setStatus("Shared successfully!");
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = `${item.title.replace(/\s+/g, "_")}.png`;
        link.click();
        setStatus("Image downloaded successfully.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Unable to share. A download is starting instead.");
    } finally {
      setIsSharing(false);
      window.setTimeout(() => setStatus(""), 3200);
    }
  };

  const handleDownload = async (event) => {
    event.stopPropagation();

    if (item.isPremium) {
      setShowModal(true);
      return;
    }

    setIsSharing(true);
    setStatus("Preparing download...");

    try {
      const file = await createPersonalizedFile();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
      setStatus("Image downloaded successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Unable to download this card.");
    } finally {
      setIsSharing(false);
      window.setTimeout(() => setStatus(""), 3200);
    }
  };

  const handleSocialShare = (event, channel) => {
    event.stopPropagation();

    if (item.isPremium) {
      setShowModal(true);
      return;
    }

    const text = encodeURIComponent(
      `A personalized greeting card from ${user?.name || "Guest"}: ${item.title}`,
    );

    if (channel === "whatsapp") {
      window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
      return;
    }

    window.location.href = `mailto:?subject=${encodeURIComponent(
      item.title,
    )}&body=${text}`;
  };

  const handleNativeShare = (event) => {
    event.stopPropagation();
    handleShare(event);
  };

  const defaultPhoto = user?.photo || DEFAULT_AVATAR;
  const statusLabel = item.isPremium ? "Premium" : "Free";

  return (
    <>
      <div
        onClick={() => {
          if (item.isPremium) {
            setShowModal(true);
          }
        }}
        className="group bg-white rounded-3xl shadow-lg overflow-hidden transition hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
      >
        <div ref={previewRef} className="relative overflow-hidden h-72 bg-slate-900">
          <img
            src={item.image}
            alt={item.title}
            crossOrigin="anonymous"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          <div className="absolute top-4 left-4 rounded-full border-4 border-white overflow-hidden w-16 h-16 bg-white">
            <img
              src={defaultPhoto}
              alt="profile"
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute top-4 right-4 rounded-full bg-white/90 text-xs text-slate-800 px-3 py-1 font-semibold">
            {item.category}
          </div>

          <div
            className={`absolute top-16 right-4 rounded-full px-3 py-1 text-xs font-semibold ${
              item.isPremium
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {statusLabel}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-lg font-semibold">{user?.name || "Guest"}</p>
            <p className="mt-2 text-sm leading-6">{item.previewText}</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{item.description}</p>
          </div>

          <div className="flex flex-col gap-3">
            <span
              className={`inline-flex w-max rounded-full text-sm font-semibold px-4 py-2 ${
                item.isPremium
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {statusLabel}
            </span>

            <button
              type="button"
              onClick={handleShare}
              disabled={isSharing}
              className="w-full rounded-2xl bg-green-600 text-white py-3 text-sm font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {item.isPremium
                ? "View Premium Details"
                : isSharing
                  ? "Creating image..."
                  : "Share"}
            </button>

            {!item.isPremium && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isSharing}
                  className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  Download
                </button>
                <button
                  type="button"
                  onClick={(event) => handleSocialShare(event, "whatsapp")}
                  className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Apps
                </button>
                <button
                  type="button"
                  onClick={(event) => handleSocialShare(event, "email")}
                  className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Email
                </button>
              </div>
            )}

            {status && <p className="text-sm text-slate-600">{status}</p>}
          </div>
        </div>
      </div>

      {showModal && <PremiumModal closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default GreetingCard;

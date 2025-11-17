"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
    images: string[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, isOpen, onClose }: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        setCurrentIndex(initialIndex);
        setZoom(1);
    }, [initialIndex, isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            } else if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentIndex]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setZoom(1);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setZoom(1);
    };

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.5, 1));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl h-[90vh] p-0 bg-black/95 border-0">
                <div className="relative w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
                        <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-medium">
                                {currentIndex + 1} / {images.length}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={zoom <= 1} className="text-white hover:bg-white/20">
                                <ZoomOut className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={zoom >= 3} className="text-white hover:bg-white/20">
                                <ZoomIn className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                        <img
                            src={images[currentIndex]}
                            alt={`Image ${currentIndex + 1}`}
                            className="max-w-full max-h-full object-contain transition-transform duration-200"
                            style={{ transform: `scale(${zoom})` }}
                        />
                    </div>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <Button variant="ghost" size="icon" onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12">
                                <ChevronLeft className="h-8 w-8" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12">
                                <ChevronRight className="h-8 w-8" />
                            </Button>
                        </>
                    )}

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="flex items-center justify-center gap-2 overflow-x-auto">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setCurrentIndex(idx);
                                            setZoom(1);
                                        }}
                                        className={cn(
                                            "relative flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-all",
                                            currentIndex === idx ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

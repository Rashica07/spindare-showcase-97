"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Track {
  isPlaying: boolean;
  notConfigured?: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  url?: string;
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  const fetchTrack = async () => {
    try {
      const res = await fetch("/api/spotify");
      const data: Track = await res.json();
      setTrack(data);
    } catch {
      setTrack({ isPlaying: false });
    }
  };

  useEffect(() => {
    fetchTrack();
    const id = setInterval(fetchTrack, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!track || track.notConfigured) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-4 sm:left-6 z-40 max-w-[260px] sm:max-w-[300px]"
      >
        <div className="glass rounded-2xl border border-border/60 p-3 shadow-2xl backdrop-blur-xl">
          {track.isPlaying && track.albumArt ? (
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="relative shrink-0">
                <Image
                  src={track.albumArt}
                  alt={track.album ?? "Album art"}
                  width={44}
                  height={44}
                  className="rounded-lg"
                />
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-[6px]">▶</span>
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-green-400 font-semibold flex items-center gap-1 mb-0.5">
                  <Music2 className="w-2.5 h-2.5" /> Now Playing
                </p>
                <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {track.title}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
            </a>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                <Music2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-semibold mb-0.5">Spotify</p>
                <p className="text-xs text-foreground font-medium">Not playing</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

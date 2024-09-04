import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();

  const seekBg = useRef();
  const seekBar = useRef();
  const seekVolume = useRef();
  const seekVolumeBg = useRef();

  const [mute, setMute] = useState(false);

  const [track, setTrack] = useState(songsData[1]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const play = () => {
    audioRef.current.play();

    setPlayerStatus(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  };

  const playWidthId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayerStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  };
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const onMute = () => {
    if (mute) {
      audioRef.current.volume = 1;
      seekVolume.current.style.width = 100 + "%";
      setMute(false);
    } else if (!mute) {
      audioRef.current.volume = 0;
      seekVolume.current.style.width = 0 + "%";
      setMute(true);
    }
  };
  const seekVolumeHandle = (e) => {
    seekVolume.current.style.width =
      (e.nativeEvent.offsetX / seekVolumeBg.current.offsetWidth) * 100 + "%";
    const newVolume = e.nativeEvent.offsetX / seekVolumeBg.current.offsetWidth;
    audioRef.current.volume = newVolume;
  };
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWidthId,
    next,
    previous,
    seekSong,
    onMute,
    mute,
    seekVolume,
    seekVolumeBg,
    seekVolumeHandle,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

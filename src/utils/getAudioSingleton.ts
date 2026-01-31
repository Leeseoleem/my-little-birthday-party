let audioSingleton: HTMLAudioElement | null = null;

export function getAudioSingleton(): HTMLAudioElement {
  if (!audioSingleton) {
    audioSingleton = new Audio();
    audioSingleton.preload = "auto";
  }

  return audioSingleton;
}

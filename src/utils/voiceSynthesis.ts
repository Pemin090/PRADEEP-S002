/**
 * Web Speech API Voice Synthesizer for Tamil (தமிழ்) and English (English).
 * Includes audio alert chimes and robust cross-browser safety guards.
 */

// Keep active utterance in module scope to prevent Chromium garbage collection bug
let activeUtterance: SpeechSynthesisUtterance | null = null;
let keepAliveTimer: number | null = null;

/**
 * Play a pleasant, gentle chime tone using Web Audio API as an immediate
 * audio confirmation for farmers even if TTS voice packs are not installed.
 */
export function playChime(): void {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    // Harmonious dual chime (E5 -> G#5) resembling a gentle water droplet alert
    const tones = [
      { freq: 659.25, time: 0 },
      { freq: 830.61, time: 0.12 }
    ];

    tones.forEach(({ freq, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.08, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + 0.3);
    });

    // Close audio context after playback to conserve system resources
    setTimeout(() => {
      try {
        ctx.close().catch(() => {});
      } catch {
        // ignore
      }
    }, 600);
  } catch {
    // AudioContext might be disallowed before user interaction or in restricted iframe
  }
}

/**
 * Speak an advisory message with Tamil or English voice.
 * Returns a cancel function to stop speech immediately.
 */
export function speakAdvisory(
  text: string,
  lang: 'ta' | 'en',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): () => void {
  // Play friendly chime immediately on tap
  playChime();

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onStart) onStart();
    const timeout = setTimeout(() => {
      if (onEnd) onEnd();
    }, 2000);
    return () => clearTimeout(timeout);
  }

  let isIntentionallyCancelled = false;

  const cleanup = () => {
    if (keepAliveTimer !== null) {
      clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
    activeUtterance = null;
  };

  try {
    // Cancel any previous speech
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch {
    // Safe ignore
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;

    utterance.rate = lang === 'ta' ? 0.88 : 0.95;
    utterance.pitch = 1.0;

    // Pick best available voice safely
    const selectBestVoice = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          if (lang === 'ta') {
            const tamilVoice = voices.find(
              v =>
                v.lang.toLowerCase().startsWith('ta') ||
                v.name.toLowerCase().includes('tamil') ||
                v.name.toLowerCase().includes('valluvar')
            );
            if (tamilVoice) {
              utterance.voice = tamilVoice;
              utterance.lang = tamilVoice.lang;
            } else {
              // Fallback to Indian English or regional voice if Tamil TTS pack is not installed
              const indianVoice = voices.find(
                v =>
                  v.lang.toLowerCase().includes('in') ||
                  v.name.toLowerCase().includes('india')
              );
              if (indianVoice) {
                utterance.voice = indianVoice;
              }
              utterance.lang = 'ta-IN';
            }
          } else {
            const englishVoice = voices.find(
              v =>
                v.lang.toLowerCase().includes('en-in') ||
                v.name.toLowerCase().includes('india') ||
                v.lang.toLowerCase().startsWith('en')
            );
            if (englishVoice) {
              utterance.voice = englishVoice;
              utterance.lang = englishVoice.lang;
            } else {
              utterance.lang = 'en-IN';
            }
          }
        } else {
          utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
        }
      } catch {
        utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      }
    };

    selectBestVoice();

    utterance.onstart = () => {
      if (!isIntentionallyCancelled && onStart) {
        onStart();
      }
    };

    utterance.onend = () => {
      cleanup();
      if (!isIntentionallyCancelled && onEnd) {
        onEnd();
      }
    };

    utterance.onerror = (e) => {
      cleanup();

      // Normal cancellations, interruptions, or voice switches should NEVER be logged as errors
      if (
        isIntentionallyCancelled ||
        e.error === 'canceled' ||
        e.error === 'interrupted'
      ) {
        if (onEnd) onEnd();
        return;
      }

      // If speech synthesis is restricted or language pack is missing, gracefully notify UI
      if (
        e.error === 'not-allowed' ||
        e.error === 'language-unavailable' ||
        e.error === 'voice-unavailable'
      ) {
        if (onEnd) onEnd();
        if (onError) onError();
        return;
      }

      // For any other unexpected speech event, gracefully finish
      if (onEnd) onEnd();
      if (onError) onError();
    };

    // Chromium bug workaround: speech synthesis can pause unexpectedly during long sentences
    keepAliveTimer = window.setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    }, 2000);

    window.speechSynthesis.speak(utterance);

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch {
    cleanup();
    if (onEnd) onEnd();
    if (onError) onError();
  }

  // Return cancel function
  return () => {
    isIntentionallyCancelled = true;
    cleanup();
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Safe ignore
    }
    if (onEnd) onEnd();
  };
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (!canSpeak()) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang.toLowerCase().startsWith("et")) ??
    voices.find((v) => v.lang.toLowerCase().includes("et")) ??
    null
  );
}

export function warmVoices() {
  if (!canSpeak()) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}

export function stopSpeak() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

export function speak(text: string, rate = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (!canSpeak() || !text.trim()) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "et-EE";
    utter.rate = Math.min(1.15, Math.max(0.6, rate));
    utter.pitch = 1;
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    utter.onend = finish;
    utter.onerror = finish;
    const ms = Math.min(8000, 450 + text.length * 140);
    window.setTimeout(finish, ms);
    window.speechSynthesis.speak(utter);
  });
}

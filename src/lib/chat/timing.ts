/** Natural typing delay before showing a bot reply. Caps at ~2.5s. */
export function typingDelayMs(text: string): number {
  const len = text.replace(/\s+/g, ' ').trim().length;
  let min = 1100;
  let max = 1800;
  if (len < 70) {
    min = 700;
    max = 1100;
  } else if (len > 220) {
    min = 1800;
    max = 2500;
  }
  return Math.round(min + Math.random() * (max - min));
}

export function remainingDisplayDelay(startedAt: number, text: string): number {
  const target = typingDelayMs(text);
  const elapsed = Date.now() - startedAt;
  return Math.max(0, Math.min(800, target - elapsed));
}

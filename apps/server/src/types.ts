export interface Player {
  id: string;
  name: string;
  persona: string;
}

export interface GuessMap {
  [socketId: string]: number;
}

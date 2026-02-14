export interface NormalizedInput {
  movement: {
    x: number;
    y: number;
  };
  look: {
    dx: number;
    dy: number;
  };
  actions: {
    interact: boolean;
    sprint: boolean;
    crouch: boolean;
  };
}

export interface InputSource {
  getInput(): NormalizedInput;
  reset(): void;
}

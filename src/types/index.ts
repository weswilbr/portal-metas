export interface StateData {
  name: string;
  lpEntries: number[];
}

export interface RegionData {
  name: string;
  states: StateData[];
}

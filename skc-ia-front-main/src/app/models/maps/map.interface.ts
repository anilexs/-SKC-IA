import { RegionMapValo } from "./region.interface";

export interface MapValo {
    uuid: string;
    displayName: string;
    urlName: string;
    xMultiplier: number;
    yMultiplier: number;
    xScalarToAdd: number;
    yScalarToAdd: number
    callouts: RegionMapValo[];
}
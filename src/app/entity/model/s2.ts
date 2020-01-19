
export interface ModelInterval {
    readonly lo: number;
    readonly hi: number;
}

export interface ModelCell {
    readonly id: string;
    readonly latitude: ModelInterval;
    readonly longitude: ModelInterval;
}

export interface ModelLatLng {
    readonly latitude: number;
    readonly longitude: number;
}

export interface ModelCap {
    readonly center: ModelLatLng;
    readonly radius: number;
}

export interface ModelLocation { }
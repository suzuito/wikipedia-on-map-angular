
export interface ModelInterval {
    readonly lo: number;
    readonly hi: number;
}

export interface ModelCell {
    readonly id: string;
    readonly latitude: ModelInterval;
    readonly longitude: ModelInterval;
    readonly center: ModelLatLng;
    readonly boundLoop: ModelLoop;
}

export interface ModelLatLng {
    readonly latitude: number;
    readonly longitude: number;
}

export interface ModelCap {
    readonly center: ModelLatLng;
    readonly radius: number;
}

export interface ModelLocation {
    readonly id: string;
    readonly name: string;
    readonly latitude: number;
    readonly longitude: number;
}

export interface ModelLoop {
    readonly points: Array<ModelLatLng>;
}

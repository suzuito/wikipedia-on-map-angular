
export interface ModelInterval {
    readonly lo: number;
    readonly hi: number;
}

export interface ModelCell {
    readonly id: string;
    readonly latitude: ModelInterval;
    readonly longitude: ModelInterval;
}
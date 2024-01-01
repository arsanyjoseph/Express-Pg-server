export type OmitProp<T, P> = Omit<T, P>

export type OmitId<T> = OmitProp<T, "id">
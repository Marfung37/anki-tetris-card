type RegexMatchedString<Pattern extends string> = `${string & { __brand: Pattern }}`;

export type Piece = 'T' | 'I' | 'L' | 'J' | 'S' | 'Z' | 'O';
export type Mino = Piece & '_' | 'X';
export type Queue = RegexMatchedString<'^[TILJSZO]+$'>;
export type Fumen = RegexMatchedString<'^v115@[A-Za-z0-9+/?]+$'>;

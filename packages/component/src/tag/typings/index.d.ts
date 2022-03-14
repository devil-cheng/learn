declare module 'color-parse' {
    type RGB = {
        r: number;
        g: number;
        b: number;
    };
    type HSL = {
        h: number;
        s: number;
        l: number;
    };
    type HEX = string;
    type RGBArray = [red: number, green: number, blue: number];
    type Color = HEX | RGB | HSL | RGBArray;
    declare function colorParse(color: Color): { space: string; values: RGBArray; alpha: number };
    export = colorParse;
}

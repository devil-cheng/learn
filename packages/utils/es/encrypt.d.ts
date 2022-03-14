export declare const getDecrypt: (params: any, secrets: string) => any;
export declare const getSign: (timestamp: number, apiKeys: string, params: any) => string;
export declare const encrypt: (data: any, secrets?: string) => string;
export declare const decrypt: (params: any, secrets?: string, encryption?: boolean) => any;

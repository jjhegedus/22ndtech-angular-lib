export declare class ConfigService {
    title: string;
    private configured;
    private config;
    constructor();
    getConfig(callback: any, configPath?: string, initializationTime?: number): any;
}

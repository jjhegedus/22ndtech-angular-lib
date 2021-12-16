import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConfigService } from '../config/config.service';
export declare class ContextService {
    private configService;
    title: string;
    private config;
    selectedCategory: BehaviorSubject<string>;
    constructor(configService: ConfigService);
    setSelectedCategory(newSelectedCategory: string): void;
}

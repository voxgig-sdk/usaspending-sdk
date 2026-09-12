import { UsaspendingEntityBase } from '../UsaspendingEntityBase';
import type { UsaspendingSDK } from '../UsaspendingSDK';
import type { Control } from '../types';
import type { Search, SearchCreateData } from '../UsaspendingTypes';
declare class SearchEntity extends UsaspendingEntityBase<Search> {
    constructor(client: UsaspendingSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    create(this: any, reqdata?: SearchCreateData, ctrl?: Control): Promise<SearchEntity>;
}
export { SearchEntity };

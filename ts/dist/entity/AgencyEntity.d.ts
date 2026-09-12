import { UsaspendingEntityBase } from '../UsaspendingEntityBase';
import type { UsaspendingSDK } from '../UsaspendingSDK';
import type { Control } from '../types';
import type { Agency, AgencyListMatch } from '../UsaspendingTypes';
declare class AgencyEntity extends UsaspendingEntityBase<Agency> {
    constructor(client: UsaspendingSDK, entopts: any);
    make(this: AgencyEntity): AgencyEntity;
    list(this: any, reqmatch?: AgencyListMatch, ctrl?: Control): Promise<AgencyEntity[]>;
}
export { AgencyEntity };

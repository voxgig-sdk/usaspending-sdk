import { UsaspendingEntityBase } from '../UsaspendingEntityBase';
import type { UsaspendingSDK } from '../UsaspendingSDK';
import type { Control } from '../types';
import type { Spending, SpendingListMatch } from '../UsaspendingTypes';
declare class SpendingEntity extends UsaspendingEntityBase<Spending> {
    constructor(client: UsaspendingSDK, entopts: any);
    make(this: SpendingEntity): SpendingEntity;
    list(this: any, reqmatch?: SpendingListMatch, ctrl?: Control): Promise<SpendingEntity[]>;
}
export { SpendingEntity };

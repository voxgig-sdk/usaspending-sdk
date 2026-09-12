import { UsaspendingEntityBase } from '../UsaspendingEntityBase';
import type { UsaspendingSDK } from '../UsaspendingSDK';
import type { Control } from '../types';
import type { Award, AwardListMatch } from '../UsaspendingTypes';
declare class AwardEntity extends UsaspendingEntityBase<Award> {
    constructor(client: UsaspendingSDK, entopts: any);
    make(this: AwardEntity): AwardEntity;
    list(this: any, reqmatch?: AwardListMatch, ctrl?: Control): Promise<AwardEntity[]>;
}
export { AwardEntity };

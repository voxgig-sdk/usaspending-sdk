import { UsaspendingEntityBase } from '../UsaspendingEntityBase';
import type { UsaspendingSDK } from '../UsaspendingSDK';
import type { Control } from '../types';
import type { Account, AccountListMatch } from '../UsaspendingTypes';
declare class AccountEntity extends UsaspendingEntityBase<Account> {
    constructor(client: UsaspendingSDK, entopts: any);
    make(this: AccountEntity): AccountEntity;
    list(this: any, reqmatch?: AccountListMatch, ctrl?: Control): Promise<AccountEntity[]>;
}
export { AccountEntity };

import { AccountEntity } from './entity/AccountEntity';
import { AgencyEntity } from './entity/AgencyEntity';
import { AwardEntity } from './entity/AwardEntity';
import { SearchEntity } from './entity/SearchEntity';
import { SpendingEntity } from './entity/SpendingEntity';
export type * from './UsaspendingTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { UsaspendingEntityBase } from './UsaspendingEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class UsaspendingSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Account(entopts?: Record<string, any>): AccountEntity;
    Agency(entopts?: Record<string, any>): AgencyEntity;
    Award(entopts?: Record<string, any>): AwardEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    Spending(entopts?: Record<string, any>): SpendingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): UsaspendingSDK;
    tester(testopts?: any, sdkopts?: any): UsaspendingSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof UsaspendingSDK;
export { stdutil, config, BaseFeature, UsaspendingEntityBase, UsaspendingSDK, SDK, };

import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AdjustInventoryData {
  query?: {
    inventory?: {
      id: UUIDString;
      quantity: number;
    } & Inventory_Key;
    users: ({
      id: UUIDString;
    } & User_Key)[];
  };
  inventory_update?: Inventory_Key | null;
  inventoryTransaction_insert: InventoryTransaction_Key;
}

export interface AdjustInventoryVariables {
  inventoryId: UUIDString;
  newQuantity: number;
  reason: string;
}

export interface CreateJobData {
  job_insert: Job_Key;
}

export interface CreateJobVariables {
  jobNumber: string;
  inventoryItemId: UUIDString;
  requiredQuantity: number;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username: string;
}

export interface GetAllInventoryData {
  inventories: ({
    id: UUIDString;
    resinName: string;
    sku: string;
    warehouseLocation: string;
    quantity: number;
    createdDate: TimestampString;
    updatedDate: TimestampString;
  } & Inventory_Key)[];
}

export interface GetAllJobsData {
  jobs: ({
    id: UUIDString;
    jobNumber: string;
    inventoryItem: {
      id: UUIDString;
      resinName: string;
      sku: string;
      warehouseLocation: string;
    } & Inventory_Key;
    requiredQuantity: number;
    pickedQuantity: number;
    status: string;
    createdDate: TimestampString;
    updatedDate: TimestampString;
  } & Job_Key)[];
}

export interface GetCurrentUserData {
  users: ({
    id: UUIDString;
    username: string;
    role: string;
    createdDate: TimestampString;
  } & User_Key)[];
}

export interface GetInventoryBySearchData {
  inventories: ({
    id: UUIDString;
    resinName: string;
    sku: string;
    warehouseLocation: string;
    quantity: number;
    createdDate: TimestampString;
    updatedDate: TimestampString;
  } & Inventory_Key)[];
}

export interface GetInventoryBySearchVariables {
  search: string;
}

export interface GetInventoryTransactionsData {
  inventoryTransactions: ({
    id: UUIDString;
    inventoryItem: {
      id: UUIDString;
      resinName: string;
      sku: string;
      warehouseLocation: string;
    } & Inventory_Key;
    job?: {
      id: UUIDString;
      jobNumber: string;
    } & Job_Key;
    user: {
      id: UUIDString;
      username: string;
      role: string;
    } & User_Key;
    transactionType: string;
    quantity: number;
    previousQuantity: number;
    newQuantity: number;
    reason?: string | null;
    createdDate: TimestampString;
  } & InventoryTransaction_Key)[];
}

export interface GetJobByNumberData {
  jobs: ({
    id: UUIDString;
    jobNumber: string;
    inventoryItem: {
      id: UUIDString;
      resinName: string;
      sku: string;
      warehouseLocation: string;
      quantity: number;
    } & Inventory_Key;
    requiredQuantity: number;
    pickedQuantity: number;
    status: string;
    createdDate: TimestampString;
    updatedDate: TimestampString;
  } & Job_Key)[];
}

export interface GetJobByNumberVariables {
  jobNumber: string;
}

export interface InventoryTransaction_Key {
  id: UUIDString;
  __typename?: 'InventoryTransaction_Key';
}

export interface Inventory_Key {
  id: UUIDString;
  __typename?: 'Inventory_Key';
}

export interface Job_Key {
  id: UUIDString;
  __typename?: 'Job_Key';
}

export interface ProcessCompletePickData {
  query?: {
    job?: {
      id: UUIDString;
      pickedQuantity: number;
      requiredQuantity: number;
      status: string;
      inventoryItem: {
        id: UUIDString;
        quantity: number;
      } & Inventory_Key;
    } & Job_Key;
    users: ({
      id: UUIDString;
    } & User_Key)[];
  };
  job_update?: Job_Key | null;
  inventory_update?: Inventory_Key | null;
  inventoryTransaction_insert: InventoryTransaction_Key;
}

export interface ProcessCompletePickVariables {
  jobId: UUIDString;
  requestedQuantity: number;
}

export interface ReceiveExistingInventoryData {
  query?: {
    inventory?: {
      id: UUIDString;
      quantity: number;
    } & Inventory_Key;
    users: ({
      id: UUIDString;
    } & User_Key)[];
  };
  inventory_update?: Inventory_Key | null;
  inventoryTransaction_insert: InventoryTransaction_Key;
}

export interface ReceiveExistingInventoryVariables {
  inventoryId: UUIDString;
  quantity: number;
}

export interface ReceiveNewInventoryData {
  query?: {
    users: ({
      id: UUIDString;
    } & User_Key)[];
  };
  inv: Inventory_Key;
  inventoryTransaction_insert: InventoryTransaction_Key;
}

export interface ReceiveNewInventoryVariables {
  resinName: string;
  sku: string;
  warehouseLocation: string;
  quantity: number;
}

export interface RecordOverPickData {
  query?: {
    job?: {
      id: UUIDString;
      pickedQuantity: number;
      requiredQuantity: number;
      status: string;
      inventoryItem: {
        id: UUIDString;
        quantity: number;
      } & Inventory_Key;
    } & Job_Key;
    users: ({
      id: UUIDString;
    } & User_Key)[];
  };
  job_update?: Job_Key | null;
  inventoryTransaction_insert: InventoryTransaction_Key;
}

export interface RecordOverPickVariables {
  jobId: UUIDString;
  quantity: number;
}

export interface RecordShortPickData {
  query?: {
    job?: {
      id: UUIDString;
      pickedQuantity: number;
      requiredQuantity: number;
      status: string;
      inventoryItem: {
        id: UUIDString;
        quantity: number;
      } & Inventory_Key;
    } & Job_Key;
    users: ({
      id: UUIDString;
    } & User_Key)[];
  };
  job_update?: Job_Key | null;
  inventoryTransaction_insert: InventoryTransaction_Key;
}

export interface RecordShortPickVariables {
  jobId: UUIDString;
  quantity: number;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetInventoryBySearchRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInventoryBySearchVariables): QueryRef<GetInventoryBySearchData, GetInventoryBySearchVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetInventoryBySearchVariables): QueryRef<GetInventoryBySearchData, GetInventoryBySearchVariables>;
  operationName: string;
}
export const getInventoryBySearchRef: GetInventoryBySearchRef;

export function getInventoryBySearch(vars: GetInventoryBySearchVariables, options?: ExecuteQueryOptions): QueryPromise<GetInventoryBySearchData, GetInventoryBySearchVariables>;
export function getInventoryBySearch(dc: DataConnect, vars: GetInventoryBySearchVariables, options?: ExecuteQueryOptions): QueryPromise<GetInventoryBySearchData, GetInventoryBySearchVariables>;

interface GetAllInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllInventoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllInventoryData, undefined>;
  operationName: string;
}
export const getAllInventoryRef: GetAllInventoryRef;

export function getAllInventory(options?: ExecuteQueryOptions): QueryPromise<GetAllInventoryData, undefined>;
export function getAllInventory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllInventoryData, undefined>;

interface ReceiveNewInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReceiveNewInventoryVariables): MutationRef<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReceiveNewInventoryVariables): MutationRef<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;
  operationName: string;
}
export const receiveNewInventoryRef: ReceiveNewInventoryRef;

export function receiveNewInventory(vars: ReceiveNewInventoryVariables): MutationPromise<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;
export function receiveNewInventory(dc: DataConnect, vars: ReceiveNewInventoryVariables): MutationPromise<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;

interface ReceiveExistingInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReceiveExistingInventoryVariables): MutationRef<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReceiveExistingInventoryVariables): MutationRef<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;
  operationName: string;
}
export const receiveExistingInventoryRef: ReceiveExistingInventoryRef;

export function receiveExistingInventory(vars: ReceiveExistingInventoryVariables): MutationPromise<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;
export function receiveExistingInventory(dc: DataConnect, vars: ReceiveExistingInventoryVariables): MutationPromise<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;

interface CreateJobRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJobVariables): MutationRef<CreateJobData, CreateJobVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateJobVariables): MutationRef<CreateJobData, CreateJobVariables>;
  operationName: string;
}
export const createJobRef: CreateJobRef;

export function createJob(vars: CreateJobVariables): MutationPromise<CreateJobData, CreateJobVariables>;
export function createJob(dc: DataConnect, vars: CreateJobVariables): MutationPromise<CreateJobData, CreateJobVariables>;

interface GetJobByNumberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetJobByNumberVariables): QueryRef<GetJobByNumberData, GetJobByNumberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetJobByNumberVariables): QueryRef<GetJobByNumberData, GetJobByNumberVariables>;
  operationName: string;
}
export const getJobByNumberRef: GetJobByNumberRef;

export function getJobByNumber(vars: GetJobByNumberVariables, options?: ExecuteQueryOptions): QueryPromise<GetJobByNumberData, GetJobByNumberVariables>;
export function getJobByNumber(dc: DataConnect, vars: GetJobByNumberVariables, options?: ExecuteQueryOptions): QueryPromise<GetJobByNumberData, GetJobByNumberVariables>;

interface GetAllJobsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllJobsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllJobsData, undefined>;
  operationName: string;
}
export const getAllJobsRef: GetAllJobsRef;

export function getAllJobs(options?: ExecuteQueryOptions): QueryPromise<GetAllJobsData, undefined>;
export function getAllJobs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllJobsData, undefined>;

interface RecordShortPickRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordShortPickVariables): MutationRef<RecordShortPickData, RecordShortPickVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordShortPickVariables): MutationRef<RecordShortPickData, RecordShortPickVariables>;
  operationName: string;
}
export const recordShortPickRef: RecordShortPickRef;

export function recordShortPick(vars: RecordShortPickVariables): MutationPromise<RecordShortPickData, RecordShortPickVariables>;
export function recordShortPick(dc: DataConnect, vars: RecordShortPickVariables): MutationPromise<RecordShortPickData, RecordShortPickVariables>;

interface RecordOverPickRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordOverPickVariables): MutationRef<RecordOverPickData, RecordOverPickVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordOverPickVariables): MutationRef<RecordOverPickData, RecordOverPickVariables>;
  operationName: string;
}
export const recordOverPickRef: RecordOverPickRef;

export function recordOverPick(vars: RecordOverPickVariables): MutationPromise<RecordOverPickData, RecordOverPickVariables>;
export function recordOverPick(dc: DataConnect, vars: RecordOverPickVariables): MutationPromise<RecordOverPickData, RecordOverPickVariables>;

interface ProcessCompletePickRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProcessCompletePickVariables): MutationRef<ProcessCompletePickData, ProcessCompletePickVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ProcessCompletePickVariables): MutationRef<ProcessCompletePickData, ProcessCompletePickVariables>;
  operationName: string;
}
export const processCompletePickRef: ProcessCompletePickRef;

export function processCompletePick(vars: ProcessCompletePickVariables): MutationPromise<ProcessCompletePickData, ProcessCompletePickVariables>;
export function processCompletePick(dc: DataConnect, vars: ProcessCompletePickVariables): MutationPromise<ProcessCompletePickData, ProcessCompletePickVariables>;

interface AdjustInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdjustInventoryVariables): MutationRef<AdjustInventoryData, AdjustInventoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdjustInventoryVariables): MutationRef<AdjustInventoryData, AdjustInventoryVariables>;
  operationName: string;
}
export const adjustInventoryRef: AdjustInventoryRef;

export function adjustInventory(vars: AdjustInventoryVariables): MutationPromise<AdjustInventoryData, AdjustInventoryVariables>;
export function adjustInventory(dc: DataConnect, vars: AdjustInventoryVariables): MutationPromise<AdjustInventoryData, AdjustInventoryVariables>;

interface GetInventoryTransactionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetInventoryTransactionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetInventoryTransactionsData, undefined>;
  operationName: string;
}
export const getInventoryTransactionsRef: GetInventoryTransactionsRef;

export function getInventoryTransactions(options?: ExecuteQueryOptions): QueryPromise<GetInventoryTransactionsData, undefined>;
export function getInventoryTransactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetInventoryTransactionsData, undefined>;


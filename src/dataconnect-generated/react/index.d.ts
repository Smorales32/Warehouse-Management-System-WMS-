import { CreateUserData, CreateUserVariables, GetCurrentUserData, GetInventoryBySearchData, GetInventoryBySearchVariables, GetAllInventoryData, ReceiveNewInventoryData, ReceiveNewInventoryVariables, ReceiveExistingInventoryData, ReceiveExistingInventoryVariables, CreateJobData, CreateJobVariables, GetJobByNumberData, GetJobByNumberVariables, GetAllJobsData, RecordShortPickData, RecordShortPickVariables, RecordOverPickData, RecordOverPickVariables, ProcessCompletePickData, ProcessCompletePickVariables, AdjustInventoryData, AdjustInventoryVariables, GetInventoryTransactionsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useGetInventoryBySearch(vars: GetInventoryBySearchVariables, options?: useDataConnectQueryOptions<GetInventoryBySearchData>): UseDataConnectQueryResult<GetInventoryBySearchData, GetInventoryBySearchVariables>;
export function useGetInventoryBySearch(dc: DataConnect, vars: GetInventoryBySearchVariables, options?: useDataConnectQueryOptions<GetInventoryBySearchData>): UseDataConnectQueryResult<GetInventoryBySearchData, GetInventoryBySearchVariables>;

export function useGetAllInventory(options?: useDataConnectQueryOptions<GetAllInventoryData>): UseDataConnectQueryResult<GetAllInventoryData, undefined>;
export function useGetAllInventory(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllInventoryData>): UseDataConnectQueryResult<GetAllInventoryData, undefined>;

export function useReceiveNewInventory(options?: useDataConnectMutationOptions<ReceiveNewInventoryData, FirebaseError, ReceiveNewInventoryVariables>): UseDataConnectMutationResult<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;
export function useReceiveNewInventory(dc: DataConnect, options?: useDataConnectMutationOptions<ReceiveNewInventoryData, FirebaseError, ReceiveNewInventoryVariables>): UseDataConnectMutationResult<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;

export function useReceiveExistingInventory(options?: useDataConnectMutationOptions<ReceiveExistingInventoryData, FirebaseError, ReceiveExistingInventoryVariables>): UseDataConnectMutationResult<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;
export function useReceiveExistingInventory(dc: DataConnect, options?: useDataConnectMutationOptions<ReceiveExistingInventoryData, FirebaseError, ReceiveExistingInventoryVariables>): UseDataConnectMutationResult<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;

export function useCreateJob(options?: useDataConnectMutationOptions<CreateJobData, FirebaseError, CreateJobVariables>): UseDataConnectMutationResult<CreateJobData, CreateJobVariables>;
export function useCreateJob(dc: DataConnect, options?: useDataConnectMutationOptions<CreateJobData, FirebaseError, CreateJobVariables>): UseDataConnectMutationResult<CreateJobData, CreateJobVariables>;

export function useGetJobByNumber(vars: GetJobByNumberVariables, options?: useDataConnectQueryOptions<GetJobByNumberData>): UseDataConnectQueryResult<GetJobByNumberData, GetJobByNumberVariables>;
export function useGetJobByNumber(dc: DataConnect, vars: GetJobByNumberVariables, options?: useDataConnectQueryOptions<GetJobByNumberData>): UseDataConnectQueryResult<GetJobByNumberData, GetJobByNumberVariables>;

export function useGetAllJobs(options?: useDataConnectQueryOptions<GetAllJobsData>): UseDataConnectQueryResult<GetAllJobsData, undefined>;
export function useGetAllJobs(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllJobsData>): UseDataConnectQueryResult<GetAllJobsData, undefined>;

export function useRecordShortPick(options?: useDataConnectMutationOptions<RecordShortPickData, FirebaseError, RecordShortPickVariables>): UseDataConnectMutationResult<RecordShortPickData, RecordShortPickVariables>;
export function useRecordShortPick(dc: DataConnect, options?: useDataConnectMutationOptions<RecordShortPickData, FirebaseError, RecordShortPickVariables>): UseDataConnectMutationResult<RecordShortPickData, RecordShortPickVariables>;

export function useRecordOverPick(options?: useDataConnectMutationOptions<RecordOverPickData, FirebaseError, RecordOverPickVariables>): UseDataConnectMutationResult<RecordOverPickData, RecordOverPickVariables>;
export function useRecordOverPick(dc: DataConnect, options?: useDataConnectMutationOptions<RecordOverPickData, FirebaseError, RecordOverPickVariables>): UseDataConnectMutationResult<RecordOverPickData, RecordOverPickVariables>;

export function useProcessCompletePick(options?: useDataConnectMutationOptions<ProcessCompletePickData, FirebaseError, ProcessCompletePickVariables>): UseDataConnectMutationResult<ProcessCompletePickData, ProcessCompletePickVariables>;
export function useProcessCompletePick(dc: DataConnect, options?: useDataConnectMutationOptions<ProcessCompletePickData, FirebaseError, ProcessCompletePickVariables>): UseDataConnectMutationResult<ProcessCompletePickData, ProcessCompletePickVariables>;

export function useAdjustInventory(options?: useDataConnectMutationOptions<AdjustInventoryData, FirebaseError, AdjustInventoryVariables>): UseDataConnectMutationResult<AdjustInventoryData, AdjustInventoryVariables>;
export function useAdjustInventory(dc: DataConnect, options?: useDataConnectMutationOptions<AdjustInventoryData, FirebaseError, AdjustInventoryVariables>): UseDataConnectMutationResult<AdjustInventoryData, AdjustInventoryVariables>;

export function useGetInventoryTransactions(options?: useDataConnectQueryOptions<GetInventoryTransactionsData>): UseDataConnectQueryResult<GetInventoryTransactionsData, undefined>;
export function useGetInventoryTransactions(dc: DataConnect, options?: useDataConnectQueryOptions<GetInventoryTransactionsData>): UseDataConnectQueryResult<GetInventoryTransactionsData, undefined>;

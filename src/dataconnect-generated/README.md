# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*GetInventoryBySearch*](#getinventorybysearch)
  - [*GetAllInventory*](#getallinventory)
  - [*GetJobByNumber*](#getjobbynumber)
  - [*GetAllJobs*](#getalljobs)
  - [*GetInventoryTransactions*](#getinventorytransactions)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*ReceiveNewInventory*](#receivenewinventory)
  - [*ReceiveExistingInventory*](#receiveexistinginventory)
  - [*CreateJob*](#createjob)
  - [*RecordShortPick*](#recordshortpick)
  - [*RecordOverPick*](#recordoverpick)
  - [*ProcessCompletePick*](#processcompletepick)
  - [*AdjustInventory*](#adjustinventory)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  users: ({
    id: UUIDString;
    username: string;
    role: string;
    createdDate: TimestampString;
  } & User_Key)[];
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetInventoryBySearch
You can execute the `GetInventoryBySearch` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getInventoryBySearch(vars: GetInventoryBySearchVariables, options?: ExecuteQueryOptions): QueryPromise<GetInventoryBySearchData, GetInventoryBySearchVariables>;

interface GetInventoryBySearchRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInventoryBySearchVariables): QueryRef<GetInventoryBySearchData, GetInventoryBySearchVariables>;
}
export const getInventoryBySearchRef: GetInventoryBySearchRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInventoryBySearch(dc: DataConnect, vars: GetInventoryBySearchVariables, options?: ExecuteQueryOptions): QueryPromise<GetInventoryBySearchData, GetInventoryBySearchVariables>;

interface GetInventoryBySearchRef {
  ...
  (dc: DataConnect, vars: GetInventoryBySearchVariables): QueryRef<GetInventoryBySearchData, GetInventoryBySearchVariables>;
}
export const getInventoryBySearchRef: GetInventoryBySearchRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInventoryBySearchRef:
```typescript
const name = getInventoryBySearchRef.operationName;
console.log(name);
```

### Variables
The `GetInventoryBySearch` query requires an argument of type `GetInventoryBySearchVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInventoryBySearchVariables {
  search: string;
}
```
### Return Type
Recall that executing the `GetInventoryBySearch` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInventoryBySearchData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetInventoryBySearch`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInventoryBySearch, GetInventoryBySearchVariables } from '@dataconnect/generated';

// The `GetInventoryBySearch` query requires an argument of type `GetInventoryBySearchVariables`:
const getInventoryBySearchVars: GetInventoryBySearchVariables = {
  search: ..., 
};

// Call the `getInventoryBySearch()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInventoryBySearch(getInventoryBySearchVars);
// Variables can be defined inline as well.
const { data } = await getInventoryBySearch({ search: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInventoryBySearch(dataConnect, getInventoryBySearchVars);

console.log(data.inventories);

// Or, you can use the `Promise` API.
getInventoryBySearch(getInventoryBySearchVars).then((response) => {
  const data = response.data;
  console.log(data.inventories);
});
```

### Using `GetInventoryBySearch`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInventoryBySearchRef, GetInventoryBySearchVariables } from '@dataconnect/generated';

// The `GetInventoryBySearch` query requires an argument of type `GetInventoryBySearchVariables`:
const getInventoryBySearchVars: GetInventoryBySearchVariables = {
  search: ..., 
};

// Call the `getInventoryBySearchRef()` function to get a reference to the query.
const ref = getInventoryBySearchRef(getInventoryBySearchVars);
// Variables can be defined inline as well.
const ref = getInventoryBySearchRef({ search: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInventoryBySearchRef(dataConnect, getInventoryBySearchVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventories);
});
```

## GetAllInventory
You can execute the `GetAllInventory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAllInventory(options?: ExecuteQueryOptions): QueryPromise<GetAllInventoryData, undefined>;

interface GetAllInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllInventoryData, undefined>;
}
export const getAllInventoryRef: GetAllInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllInventory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllInventoryData, undefined>;

interface GetAllInventoryRef {
  ...
  (dc: DataConnect): QueryRef<GetAllInventoryData, undefined>;
}
export const getAllInventoryRef: GetAllInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllInventoryRef:
```typescript
const name = getAllInventoryRef.operationName;
console.log(name);
```

### Variables
The `GetAllInventory` query has no variables.
### Return Type
Recall that executing the `GetAllInventory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllInventory } from '@dataconnect/generated';


// Call the `getAllInventory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllInventory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllInventory(dataConnect);

console.log(data.inventories);

// Or, you can use the `Promise` API.
getAllInventory().then((response) => {
  const data = response.data;
  console.log(data.inventories);
});
```

### Using `GetAllInventory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllInventoryRef } from '@dataconnect/generated';


// Call the `getAllInventoryRef()` function to get a reference to the query.
const ref = getAllInventoryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllInventoryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventories);
});
```

## GetJobByNumber
You can execute the `GetJobByNumber` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getJobByNumber(vars: GetJobByNumberVariables, options?: ExecuteQueryOptions): QueryPromise<GetJobByNumberData, GetJobByNumberVariables>;

interface GetJobByNumberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetJobByNumberVariables): QueryRef<GetJobByNumberData, GetJobByNumberVariables>;
}
export const getJobByNumberRef: GetJobByNumberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getJobByNumber(dc: DataConnect, vars: GetJobByNumberVariables, options?: ExecuteQueryOptions): QueryPromise<GetJobByNumberData, GetJobByNumberVariables>;

interface GetJobByNumberRef {
  ...
  (dc: DataConnect, vars: GetJobByNumberVariables): QueryRef<GetJobByNumberData, GetJobByNumberVariables>;
}
export const getJobByNumberRef: GetJobByNumberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getJobByNumberRef:
```typescript
const name = getJobByNumberRef.operationName;
console.log(name);
```

### Variables
The `GetJobByNumber` query requires an argument of type `GetJobByNumberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetJobByNumberVariables {
  jobNumber: string;
}
```
### Return Type
Recall that executing the `GetJobByNumber` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetJobByNumberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetJobByNumber`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getJobByNumber, GetJobByNumberVariables } from '@dataconnect/generated';

// The `GetJobByNumber` query requires an argument of type `GetJobByNumberVariables`:
const getJobByNumberVars: GetJobByNumberVariables = {
  jobNumber: ..., 
};

// Call the `getJobByNumber()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getJobByNumber(getJobByNumberVars);
// Variables can be defined inline as well.
const { data } = await getJobByNumber({ jobNumber: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getJobByNumber(dataConnect, getJobByNumberVars);

console.log(data.jobs);

// Or, you can use the `Promise` API.
getJobByNumber(getJobByNumberVars).then((response) => {
  const data = response.data;
  console.log(data.jobs);
});
```

### Using `GetJobByNumber`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getJobByNumberRef, GetJobByNumberVariables } from '@dataconnect/generated';

// The `GetJobByNumber` query requires an argument of type `GetJobByNumberVariables`:
const getJobByNumberVars: GetJobByNumberVariables = {
  jobNumber: ..., 
};

// Call the `getJobByNumberRef()` function to get a reference to the query.
const ref = getJobByNumberRef(getJobByNumberVars);
// Variables can be defined inline as well.
const ref = getJobByNumberRef({ jobNumber: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getJobByNumberRef(dataConnect, getJobByNumberVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobs);
});
```

## GetAllJobs
You can execute the `GetAllJobs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAllJobs(options?: ExecuteQueryOptions): QueryPromise<GetAllJobsData, undefined>;

interface GetAllJobsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllJobsData, undefined>;
}
export const getAllJobsRef: GetAllJobsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllJobs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllJobsData, undefined>;

interface GetAllJobsRef {
  ...
  (dc: DataConnect): QueryRef<GetAllJobsData, undefined>;
}
export const getAllJobsRef: GetAllJobsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllJobsRef:
```typescript
const name = getAllJobsRef.operationName;
console.log(name);
```

### Variables
The `GetAllJobs` query has no variables.
### Return Type
Recall that executing the `GetAllJobs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllJobsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllJobs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllJobs } from '@dataconnect/generated';


// Call the `getAllJobs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllJobs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllJobs(dataConnect);

console.log(data.jobs);

// Or, you can use the `Promise` API.
getAllJobs().then((response) => {
  const data = response.data;
  console.log(data.jobs);
});
```

### Using `GetAllJobs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllJobsRef } from '@dataconnect/generated';


// Call the `getAllJobsRef()` function to get a reference to the query.
const ref = getAllJobsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllJobsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobs);
});
```

## GetInventoryTransactions
You can execute the `GetInventoryTransactions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getInventoryTransactions(options?: ExecuteQueryOptions): QueryPromise<GetInventoryTransactionsData, undefined>;

interface GetInventoryTransactionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetInventoryTransactionsData, undefined>;
}
export const getInventoryTransactionsRef: GetInventoryTransactionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInventoryTransactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetInventoryTransactionsData, undefined>;

interface GetInventoryTransactionsRef {
  ...
  (dc: DataConnect): QueryRef<GetInventoryTransactionsData, undefined>;
}
export const getInventoryTransactionsRef: GetInventoryTransactionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInventoryTransactionsRef:
```typescript
const name = getInventoryTransactionsRef.operationName;
console.log(name);
```

### Variables
The `GetInventoryTransactions` query has no variables.
### Return Type
Recall that executing the `GetInventoryTransactions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInventoryTransactionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetInventoryTransactions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInventoryTransactions } from '@dataconnect/generated';


// Call the `getInventoryTransactions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInventoryTransactions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInventoryTransactions(dataConnect);

console.log(data.inventoryTransactions);

// Or, you can use the `Promise` API.
getInventoryTransactions().then((response) => {
  const data = response.data;
  console.log(data.inventoryTransactions);
});
```

### Using `GetInventoryTransactions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInventoryTransactionsRef } from '@dataconnect/generated';


// Call the `getInventoryTransactionsRef()` function to get a reference to the query.
const ref = getInventoryTransactionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInventoryTransactionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventoryTransactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryTransactions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  username: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  username: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ username: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  username: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ username: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## ReceiveNewInventory
You can execute the `ReceiveNewInventory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
receiveNewInventory(vars: ReceiveNewInventoryVariables): MutationPromise<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;

interface ReceiveNewInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReceiveNewInventoryVariables): MutationRef<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;
}
export const receiveNewInventoryRef: ReceiveNewInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
receiveNewInventory(dc: DataConnect, vars: ReceiveNewInventoryVariables): MutationPromise<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;

interface ReceiveNewInventoryRef {
  ...
  (dc: DataConnect, vars: ReceiveNewInventoryVariables): MutationRef<ReceiveNewInventoryData, ReceiveNewInventoryVariables>;
}
export const receiveNewInventoryRef: ReceiveNewInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the receiveNewInventoryRef:
```typescript
const name = receiveNewInventoryRef.operationName;
console.log(name);
```

### Variables
The `ReceiveNewInventory` mutation requires an argument of type `ReceiveNewInventoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReceiveNewInventoryVariables {
  resinName: string;
  sku: string;
  warehouseLocation: string;
  quantity: number;
}
```
### Return Type
Recall that executing the `ReceiveNewInventory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReceiveNewInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReceiveNewInventoryData {
  query?: {
    users: ({
      id: UUIDString;
    } & User_Key)[];
  };
  inv: Inventory_Key;
  inventoryTransaction_insert: InventoryTransaction_Key;
}
```
### Using `ReceiveNewInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, receiveNewInventory, ReceiveNewInventoryVariables } from '@dataconnect/generated';

// The `ReceiveNewInventory` mutation requires an argument of type `ReceiveNewInventoryVariables`:
const receiveNewInventoryVars: ReceiveNewInventoryVariables = {
  resinName: ..., 
  sku: ..., 
  warehouseLocation: ..., 
  quantity: ..., 
};

// Call the `receiveNewInventory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await receiveNewInventory(receiveNewInventoryVars);
// Variables can be defined inline as well.
const { data } = await receiveNewInventory({ resinName: ..., sku: ..., warehouseLocation: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await receiveNewInventory(dataConnect, receiveNewInventoryVars);

console.log(data.query);
console.log(data.inv);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
receiveNewInventory(receiveNewInventoryVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.inv);
  console.log(data.inventoryTransaction_insert);
});
```

### Using `ReceiveNewInventory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, receiveNewInventoryRef, ReceiveNewInventoryVariables } from '@dataconnect/generated';

// The `ReceiveNewInventory` mutation requires an argument of type `ReceiveNewInventoryVariables`:
const receiveNewInventoryVars: ReceiveNewInventoryVariables = {
  resinName: ..., 
  sku: ..., 
  warehouseLocation: ..., 
  quantity: ..., 
};

// Call the `receiveNewInventoryRef()` function to get a reference to the mutation.
const ref = receiveNewInventoryRef(receiveNewInventoryVars);
// Variables can be defined inline as well.
const ref = receiveNewInventoryRef({ resinName: ..., sku: ..., warehouseLocation: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = receiveNewInventoryRef(dataConnect, receiveNewInventoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.inv);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.inv);
  console.log(data.inventoryTransaction_insert);
});
```

## ReceiveExistingInventory
You can execute the `ReceiveExistingInventory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
receiveExistingInventory(vars: ReceiveExistingInventoryVariables): MutationPromise<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;

interface ReceiveExistingInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReceiveExistingInventoryVariables): MutationRef<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;
}
export const receiveExistingInventoryRef: ReceiveExistingInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
receiveExistingInventory(dc: DataConnect, vars: ReceiveExistingInventoryVariables): MutationPromise<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;

interface ReceiveExistingInventoryRef {
  ...
  (dc: DataConnect, vars: ReceiveExistingInventoryVariables): MutationRef<ReceiveExistingInventoryData, ReceiveExistingInventoryVariables>;
}
export const receiveExistingInventoryRef: ReceiveExistingInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the receiveExistingInventoryRef:
```typescript
const name = receiveExistingInventoryRef.operationName;
console.log(name);
```

### Variables
The `ReceiveExistingInventory` mutation requires an argument of type `ReceiveExistingInventoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReceiveExistingInventoryVariables {
  inventoryId: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `ReceiveExistingInventory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReceiveExistingInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ReceiveExistingInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, receiveExistingInventory, ReceiveExistingInventoryVariables } from '@dataconnect/generated';

// The `ReceiveExistingInventory` mutation requires an argument of type `ReceiveExistingInventoryVariables`:
const receiveExistingInventoryVars: ReceiveExistingInventoryVariables = {
  inventoryId: ..., 
  quantity: ..., 
};

// Call the `receiveExistingInventory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await receiveExistingInventory(receiveExistingInventoryVars);
// Variables can be defined inline as well.
const { data } = await receiveExistingInventory({ inventoryId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await receiveExistingInventory(dataConnect, receiveExistingInventoryVars);

console.log(data.query);
console.log(data.inventory_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
receiveExistingInventory(receiveExistingInventoryVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.inventory_update);
  console.log(data.inventoryTransaction_insert);
});
```

### Using `ReceiveExistingInventory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, receiveExistingInventoryRef, ReceiveExistingInventoryVariables } from '@dataconnect/generated';

// The `ReceiveExistingInventory` mutation requires an argument of type `ReceiveExistingInventoryVariables`:
const receiveExistingInventoryVars: ReceiveExistingInventoryVariables = {
  inventoryId: ..., 
  quantity: ..., 
};

// Call the `receiveExistingInventoryRef()` function to get a reference to the mutation.
const ref = receiveExistingInventoryRef(receiveExistingInventoryVars);
// Variables can be defined inline as well.
const ref = receiveExistingInventoryRef({ inventoryId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = receiveExistingInventoryRef(dataConnect, receiveExistingInventoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.inventory_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.inventory_update);
  console.log(data.inventoryTransaction_insert);
});
```

## CreateJob
You can execute the `CreateJob` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createJob(vars: CreateJobVariables): MutationPromise<CreateJobData, CreateJobVariables>;

interface CreateJobRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJobVariables): MutationRef<CreateJobData, CreateJobVariables>;
}
export const createJobRef: CreateJobRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createJob(dc: DataConnect, vars: CreateJobVariables): MutationPromise<CreateJobData, CreateJobVariables>;

interface CreateJobRef {
  ...
  (dc: DataConnect, vars: CreateJobVariables): MutationRef<CreateJobData, CreateJobVariables>;
}
export const createJobRef: CreateJobRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createJobRef:
```typescript
const name = createJobRef.operationName;
console.log(name);
```

### Variables
The `CreateJob` mutation requires an argument of type `CreateJobVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateJobVariables {
  jobNumber: string;
  inventoryItemId: UUIDString;
  requiredQuantity: number;
}
```
### Return Type
Recall that executing the `CreateJob` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateJobData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateJobData {
  job_insert: Job_Key;
}
```
### Using `CreateJob`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createJob, CreateJobVariables } from '@dataconnect/generated';

// The `CreateJob` mutation requires an argument of type `CreateJobVariables`:
const createJobVars: CreateJobVariables = {
  jobNumber: ..., 
  inventoryItemId: ..., 
  requiredQuantity: ..., 
};

// Call the `createJob()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createJob(createJobVars);
// Variables can be defined inline as well.
const { data } = await createJob({ jobNumber: ..., inventoryItemId: ..., requiredQuantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createJob(dataConnect, createJobVars);

console.log(data.job_insert);

// Or, you can use the `Promise` API.
createJob(createJobVars).then((response) => {
  const data = response.data;
  console.log(data.job_insert);
});
```

### Using `CreateJob`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createJobRef, CreateJobVariables } from '@dataconnect/generated';

// The `CreateJob` mutation requires an argument of type `CreateJobVariables`:
const createJobVars: CreateJobVariables = {
  jobNumber: ..., 
  inventoryItemId: ..., 
  requiredQuantity: ..., 
};

// Call the `createJobRef()` function to get a reference to the mutation.
const ref = createJobRef(createJobVars);
// Variables can be defined inline as well.
const ref = createJobRef({ jobNumber: ..., inventoryItemId: ..., requiredQuantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createJobRef(dataConnect, createJobVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.job_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.job_insert);
});
```

## RecordShortPick
You can execute the `RecordShortPick` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordShortPick(vars: RecordShortPickVariables): MutationPromise<RecordShortPickData, RecordShortPickVariables>;

interface RecordShortPickRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordShortPickVariables): MutationRef<RecordShortPickData, RecordShortPickVariables>;
}
export const recordShortPickRef: RecordShortPickRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordShortPick(dc: DataConnect, vars: RecordShortPickVariables): MutationPromise<RecordShortPickData, RecordShortPickVariables>;

interface RecordShortPickRef {
  ...
  (dc: DataConnect, vars: RecordShortPickVariables): MutationRef<RecordShortPickData, RecordShortPickVariables>;
}
export const recordShortPickRef: RecordShortPickRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordShortPickRef:
```typescript
const name = recordShortPickRef.operationName;
console.log(name);
```

### Variables
The `RecordShortPick` mutation requires an argument of type `RecordShortPickVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordShortPickVariables {
  jobId: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `RecordShortPick` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordShortPickData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `RecordShortPick`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordShortPick, RecordShortPickVariables } from '@dataconnect/generated';

// The `RecordShortPick` mutation requires an argument of type `RecordShortPickVariables`:
const recordShortPickVars: RecordShortPickVariables = {
  jobId: ..., 
  quantity: ..., 
};

// Call the `recordShortPick()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordShortPick(recordShortPickVars);
// Variables can be defined inline as well.
const { data } = await recordShortPick({ jobId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordShortPick(dataConnect, recordShortPickVars);

console.log(data.query);
console.log(data.job_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
recordShortPick(recordShortPickVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.job_update);
  console.log(data.inventoryTransaction_insert);
});
```

### Using `RecordShortPick`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordShortPickRef, RecordShortPickVariables } from '@dataconnect/generated';

// The `RecordShortPick` mutation requires an argument of type `RecordShortPickVariables`:
const recordShortPickVars: RecordShortPickVariables = {
  jobId: ..., 
  quantity: ..., 
};

// Call the `recordShortPickRef()` function to get a reference to the mutation.
const ref = recordShortPickRef(recordShortPickVars);
// Variables can be defined inline as well.
const ref = recordShortPickRef({ jobId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordShortPickRef(dataConnect, recordShortPickVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.job_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.job_update);
  console.log(data.inventoryTransaction_insert);
});
```

## RecordOverPick
You can execute the `RecordOverPick` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordOverPick(vars: RecordOverPickVariables): MutationPromise<RecordOverPickData, RecordOverPickVariables>;

interface RecordOverPickRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordOverPickVariables): MutationRef<RecordOverPickData, RecordOverPickVariables>;
}
export const recordOverPickRef: RecordOverPickRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordOverPick(dc: DataConnect, vars: RecordOverPickVariables): MutationPromise<RecordOverPickData, RecordOverPickVariables>;

interface RecordOverPickRef {
  ...
  (dc: DataConnect, vars: RecordOverPickVariables): MutationRef<RecordOverPickData, RecordOverPickVariables>;
}
export const recordOverPickRef: RecordOverPickRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordOverPickRef:
```typescript
const name = recordOverPickRef.operationName;
console.log(name);
```

### Variables
The `RecordOverPick` mutation requires an argument of type `RecordOverPickVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordOverPickVariables {
  jobId: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `RecordOverPick` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordOverPickData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `RecordOverPick`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordOverPick, RecordOverPickVariables } from '@dataconnect/generated';

// The `RecordOverPick` mutation requires an argument of type `RecordOverPickVariables`:
const recordOverPickVars: RecordOverPickVariables = {
  jobId: ..., 
  quantity: ..., 
};

// Call the `recordOverPick()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordOverPick(recordOverPickVars);
// Variables can be defined inline as well.
const { data } = await recordOverPick({ jobId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordOverPick(dataConnect, recordOverPickVars);

console.log(data.query);
console.log(data.job_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
recordOverPick(recordOverPickVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.job_update);
  console.log(data.inventoryTransaction_insert);
});
```

### Using `RecordOverPick`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordOverPickRef, RecordOverPickVariables } from '@dataconnect/generated';

// The `RecordOverPick` mutation requires an argument of type `RecordOverPickVariables`:
const recordOverPickVars: RecordOverPickVariables = {
  jobId: ..., 
  quantity: ..., 
};

// Call the `recordOverPickRef()` function to get a reference to the mutation.
const ref = recordOverPickRef(recordOverPickVars);
// Variables can be defined inline as well.
const ref = recordOverPickRef({ jobId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordOverPickRef(dataConnect, recordOverPickVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.job_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.job_update);
  console.log(data.inventoryTransaction_insert);
});
```

## ProcessCompletePick
You can execute the `ProcessCompletePick` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
processCompletePick(vars: ProcessCompletePickVariables): MutationPromise<ProcessCompletePickData, ProcessCompletePickVariables>;

interface ProcessCompletePickRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProcessCompletePickVariables): MutationRef<ProcessCompletePickData, ProcessCompletePickVariables>;
}
export const processCompletePickRef: ProcessCompletePickRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
processCompletePick(dc: DataConnect, vars: ProcessCompletePickVariables): MutationPromise<ProcessCompletePickData, ProcessCompletePickVariables>;

interface ProcessCompletePickRef {
  ...
  (dc: DataConnect, vars: ProcessCompletePickVariables): MutationRef<ProcessCompletePickData, ProcessCompletePickVariables>;
}
export const processCompletePickRef: ProcessCompletePickRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the processCompletePickRef:
```typescript
const name = processCompletePickRef.operationName;
console.log(name);
```

### Variables
The `ProcessCompletePick` mutation requires an argument of type `ProcessCompletePickVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ProcessCompletePickVariables {
  jobId: UUIDString;
  requestedQuantity: number;
}
```
### Return Type
Recall that executing the `ProcessCompletePick` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ProcessCompletePickData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ProcessCompletePick`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, processCompletePick, ProcessCompletePickVariables } from '@dataconnect/generated';

// The `ProcessCompletePick` mutation requires an argument of type `ProcessCompletePickVariables`:
const processCompletePickVars: ProcessCompletePickVariables = {
  jobId: ..., 
  requestedQuantity: ..., 
};

// Call the `processCompletePick()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await processCompletePick(processCompletePickVars);
// Variables can be defined inline as well.
const { data } = await processCompletePick({ jobId: ..., requestedQuantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await processCompletePick(dataConnect, processCompletePickVars);

console.log(data.query);
console.log(data.job_update);
console.log(data.inventory_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
processCompletePick(processCompletePickVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.job_update);
  console.log(data.inventory_update);
  console.log(data.inventoryTransaction_insert);
});
```

### Using `ProcessCompletePick`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, processCompletePickRef, ProcessCompletePickVariables } from '@dataconnect/generated';

// The `ProcessCompletePick` mutation requires an argument of type `ProcessCompletePickVariables`:
const processCompletePickVars: ProcessCompletePickVariables = {
  jobId: ..., 
  requestedQuantity: ..., 
};

// Call the `processCompletePickRef()` function to get a reference to the mutation.
const ref = processCompletePickRef(processCompletePickVars);
// Variables can be defined inline as well.
const ref = processCompletePickRef({ jobId: ..., requestedQuantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = processCompletePickRef(dataConnect, processCompletePickVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.job_update);
console.log(data.inventory_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.job_update);
  console.log(data.inventory_update);
  console.log(data.inventoryTransaction_insert);
});
```

## AdjustInventory
You can execute the `AdjustInventory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adjustInventory(vars: AdjustInventoryVariables): MutationPromise<AdjustInventoryData, AdjustInventoryVariables>;

interface AdjustInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdjustInventoryVariables): MutationRef<AdjustInventoryData, AdjustInventoryVariables>;
}
export const adjustInventoryRef: AdjustInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adjustInventory(dc: DataConnect, vars: AdjustInventoryVariables): MutationPromise<AdjustInventoryData, AdjustInventoryVariables>;

interface AdjustInventoryRef {
  ...
  (dc: DataConnect, vars: AdjustInventoryVariables): MutationRef<AdjustInventoryData, AdjustInventoryVariables>;
}
export const adjustInventoryRef: AdjustInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adjustInventoryRef:
```typescript
const name = adjustInventoryRef.operationName;
console.log(name);
```

### Variables
The `AdjustInventory` mutation requires an argument of type `AdjustInventoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdjustInventoryVariables {
  inventoryId: UUIDString;
  newQuantity: number;
  reason: string;
}
```
### Return Type
Recall that executing the `AdjustInventory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdjustInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdjustInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adjustInventory, AdjustInventoryVariables } from '@dataconnect/generated';

// The `AdjustInventory` mutation requires an argument of type `AdjustInventoryVariables`:
const adjustInventoryVars: AdjustInventoryVariables = {
  inventoryId: ..., 
  newQuantity: ..., 
  reason: ..., 
};

// Call the `adjustInventory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adjustInventory(adjustInventoryVars);
// Variables can be defined inline as well.
const { data } = await adjustInventory({ inventoryId: ..., newQuantity: ..., reason: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adjustInventory(dataConnect, adjustInventoryVars);

console.log(data.query);
console.log(data.inventory_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
adjustInventory(adjustInventoryVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.inventory_update);
  console.log(data.inventoryTransaction_insert);
});
```

### Using `AdjustInventory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adjustInventoryRef, AdjustInventoryVariables } from '@dataconnect/generated';

// The `AdjustInventory` mutation requires an argument of type `AdjustInventoryVariables`:
const adjustInventoryVars: AdjustInventoryVariables = {
  inventoryId: ..., 
  newQuantity: ..., 
  reason: ..., 
};

// Call the `adjustInventoryRef()` function to get a reference to the mutation.
const ref = adjustInventoryRef(adjustInventoryVars);
// Variables can be defined inline as well.
const ref = adjustInventoryRef({ inventoryId: ..., newQuantity: ..., reason: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adjustInventoryRef(dataConnect, adjustInventoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.inventory_update);
console.log(data.inventoryTransaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.inventory_update);
  console.log(data.inventoryTransaction_insert);
});
```


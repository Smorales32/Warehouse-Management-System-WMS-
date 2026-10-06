# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useGetCurrentUser, useGetInventoryBySearch, useGetAllInventory, useReceiveNewInventory, useReceiveExistingInventory, useCreateJob, useGetJobByNumber, useGetAllJobs, useRecordShortPick } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useGetCurrentUser();

const { data, isPending, isSuccess, isError, error } = useGetInventoryBySearch(getInventoryBySearchVars);

const { data, isPending, isSuccess, isError, error } = useGetAllInventory();

const { data, isPending, isSuccess, isError, error } = useReceiveNewInventory(receiveNewInventoryVars);

const { data, isPending, isSuccess, isError, error } = useReceiveExistingInventory(receiveExistingInventoryVars);

const { data, isPending, isSuccess, isError, error } = useCreateJob(createJobVars);

const { data, isPending, isSuccess, isError, error } = useGetJobByNumber(getJobByNumberVars);

const { data, isPending, isSuccess, isError, error } = useGetAllJobs();

const { data, isPending, isSuccess, isError, error } = useRecordShortPick(recordShortPickVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, getCurrentUser, getInventoryBySearch, getAllInventory, receiveNewInventory, receiveExistingInventory, createJob, getJobByNumber, getAllJobs, recordShortPick } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation GetInventoryBySearch:  For variables, look at type GetInventoryBySearchVars in ../index.d.ts
const { data } = await GetInventoryBySearch(dataConnect, getInventoryBySearchVars);

// Operation GetAllInventory: 
const { data } = await GetAllInventory(dataConnect);

// Operation ReceiveNewInventory:  For variables, look at type ReceiveNewInventoryVars in ../index.d.ts
const { data } = await ReceiveNewInventory(dataConnect, receiveNewInventoryVars);

// Operation ReceiveExistingInventory:  For variables, look at type ReceiveExistingInventoryVars in ../index.d.ts
const { data } = await ReceiveExistingInventory(dataConnect, receiveExistingInventoryVars);

// Operation CreateJob:  For variables, look at type CreateJobVars in ../index.d.ts
const { data } = await CreateJob(dataConnect, createJobVars);

// Operation GetJobByNumber:  For variables, look at type GetJobByNumberVars in ../index.d.ts
const { data } = await GetJobByNumber(dataConnect, getJobByNumberVars);

// Operation GetAllJobs: 
const { data } = await GetAllJobs(dataConnect);

// Operation RecordShortPick:  For variables, look at type RecordShortPickVars in ../index.d.ts
const { data } = await RecordShortPick(dataConnect, recordShortPickVars);


```
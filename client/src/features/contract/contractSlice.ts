/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Contract, ContractState } from "../../types/bidTypes";
import { ContractService } from "../../services/contractService";

const initialState: ContractState = {
  contracts: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchAllContracts = createAsyncThunk(
  "contract/fetchAllContracts",
  async (_, { rejectWithValue }) => {
    try {
      const contracts = await ContractService.fetchAllContracts();
      return contracts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createContract = createAsyncThunk(
  "contract/createContract",
  async (
    contractData: Omit<Contract, "id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const newContract = await ContractService.createContract(contractData);
      return newContract;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateContractAsync = createAsyncThunk(
  "contract/updateContract",
  async (
    { id, contractData }: { id: string; contractData: Partial<Contract> },
    { rejectWithValue }
  ) => {
    try {
      const updatedContract = await ContractService.updateContract(
        id,
        contractData
      );
      return updatedContract;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContract = createAsyncThunk(
  "contract/deleteContract",
  async (id: string, { rejectWithValue }) => {
    try {
      await ContractService.deleteContract(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    // Manual reducers for local state management
    setContracts: (state, action: PayloadAction<Contract[]>) => {
      state.contracts = action.payload;
      state.error = null;
    },
    addContract: (state, action: PayloadAction<Contract>) => {
      state.contracts.push(action.payload);
    },
    updateContract: (state, action: PayloadAction<Partial<Contract>>) => {
      const index = state.contracts.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.contracts[index] = {
          ...state.contracts[index],
          ...action.payload,
        };
      }
    },
    removeContract: (state, action: PayloadAction<string>) => {
      state.contracts = state.contracts.filter((c) => c.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Contracts
    builder
      .addCase(fetchAllContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = action.payload;
        state.error = null;
      })
      .addCase(fetchAllContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Contract
    builder
      .addCase(createContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts.push(action.payload);
        state.error = null;
      })
      .addCase(createContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Contract
    builder
      .addCase(updateContractAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContractAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contracts.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.contracts[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateContractAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Contract
    builder
      .addCase(deleteContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContract.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = state.contracts.filter(
          (c) => c.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setContracts,
  addContract,
  updateContract,
  removeContract,
  setLoading,
  setError,
  clearError,
} = contractSlice.actions;

export default contractSlice.reducer;

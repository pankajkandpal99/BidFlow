/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Bid, BidState } from "../../types/bidTypes";
import { BidService } from "../../services/bid.service";

const initialState: BidState = {
  bids: [],
  loading: false,
  error: null,
};

export const fetchAllBids = createAsyncThunk(
  "bid/fetchAllBids",
  async (_, { rejectWithValue }) => {
    try {
      const bids = await BidService.fetchAllBids();
      return bids;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBid = createAsyncThunk(
  "bid/createBid",
  async (
    bidData: Omit<Bid, "id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const newBid = await BidService.createBid(bidData);
      return newBid;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBidAsync = createAsyncThunk(
  "bid/updateBid",
  async (
    { id, bidData }: { id: string; bidData: Partial<Bid> },
    { rejectWithValue }
  ) => {
    try {
      const updatedBid = await BidService.updateBid(id, bidData);
      return updatedBid;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBid = createAsyncThunk(
  "bid/deleteBid",
  async (id: string, { rejectWithValue }) => {
    try {
      await BidService.deleteBid(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {
    // Manual reducers for local state management
    setBids: (state, action: PayloadAction<Bid[]>) => {
      state.bids = action.payload;
      state.error = null;
    },
    addBid: (state, action: PayloadAction<Bid>) => {
      state.bids.push(action.payload);
    },
    updateBid: (state, action: PayloadAction<Partial<Bid>>) => {
      const index = state.bids.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bids[index] = { ...state.bids[index], ...action.payload };
      }
    },
    removeBid: (state, action: PayloadAction<string>) => {
      state.bids = state.bids.filter((b) => b.id !== action.payload);
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
    // Fetch All Bids
    builder
      .addCase(fetchAllBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBids.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
        state.error = null;
      })
      .addCase(fetchAllBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Bid
    builder
      .addCase(createBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.loading = false;
        state.bids.push(action.payload);
        state.error = null;
      })
      .addCase(createBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Bid
    builder
      .addCase(updateBidAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBidAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bids.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.bids[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBidAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Bid
    builder
      .addCase(deleteBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBid.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = state.bids.filter((b) => b.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setBids,
  addBid,
  updateBid,
  removeBid,
  setLoading,
  setError,
  clearError,
} = bidSlice.actions;

export default bidSlice.reducer;

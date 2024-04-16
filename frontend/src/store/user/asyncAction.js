import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getCurrent = createAsyncThunk(
  "app/user",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCurrent();
    return response.mes;
  }
);


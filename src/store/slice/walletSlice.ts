import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
	account: string | null;
	status: 'connected' | 'disconnected' | 'error' | null;
}

const initialState: WalletState = {
	account: null,
	status: null,
};

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		setAccount: (state, action: PayloadAction<string>) => {
			state.account = action.payload;
			state.status = 'connected';
		},
		disconnect: (state) => {
			state.account = null;
			state.status = 'disconnected';
		},
		setError: (state) => {
			state.status = 'error';
		},
	},
});

export const { setAccount, disconnect, setError } = walletSlice.actions;
export default walletSlice.reducer;

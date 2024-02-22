import { FormFieldData } from '@/app/page';
import { getFormData, submitFormEdited } from '@/lib/form';
import { formDataValidationSchema } from '@/lib/validation';
import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'

export const initialFetch = createAsyncThunk((''), async () => {
    try {
        const res = await getFormData();
        
        return res.data;
    } catch (error) {
        return error
    }
});

export const submitFormData = createAsyncThunk(('/submit'), async (data: FormFieldData[] | null) => {
    try {
        if (data) {
            const obj = Object.fromEntries(data.map((field) => [field.fieldName, field.value]));

            const dynamicObjValidation = Object.fromEntries(data.map((field, index) => {
                if(index === 3){
                    return ['option', field.value]
                }
                return [field.fieldName, field.value]
            }));

            await formDataValidationSchema.validate(dynamicObjValidation, {
                abortEarly: true,
            });

            const res = await submitFormEdited(obj);

            if(!res.success) throw({ message: res.message});

            return res;
        }
    } catch (error) {
        throw (error)
    }
});

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        data: null,
        loading: false,
        notification: {
            type: '',
            message: '',
        }
    },
    reducers: {
        updateData: (state, action) => {
            const edited = state.data && state.data?.map((exist: FormFieldData) => {
                if (exist?.fieldName === action.payload.fieldName) return {
                    ...exist,
                    value: action.payload.value,
                }

                return {
                    ...exist,
                }
            });

            state.data = edited;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initialFetch.pending, (state) => {
            state.loading = true;
            state.notification = {
                type: '',
                message: '',
            }
        })
        builder.addCase(initialFetch.fulfilled, (state, action) => {
            state.data = action.payload;

            state.loading = false;
        })
        builder.addCase(initialFetch.rejected, (state, action) => {
            state.loading = false
            state.notification = {
                type: 'error',
                message: action.error.message
            }
        })
        builder.addCase(submitFormData.pending, (state) => {
            state.loading = true;
            state.notification = {
                type: '',
                message: '',
            }
        })
        builder.addCase(submitFormData.fulfilled, (state, action) => {
            state.notification = {
                type: 'success',
                message: action.payload.message
            }

            state.loading = false;
        })
        builder.addCase(submitFormData.rejected, (state, action) => {
            state.loading = false;
            if (action.error) {
                if(action.error.message?.includes('Option')){
                    const message = action.error.message.split('Option');
                    state.notification = {
                        type: 'error',
                        message: `${state.data[3]?.fieldName.split(/(?=[A-Z])/).join(" ")}${message[1]}`
                    }
                } else {
                    state.notification = {
                        type: 'error',
                        message: action.error.message
                    }
                }
            }
        })
    },
})


// export actions 
export const {
    updateData
} = formSlice.actions

// export reducer by default 
export default formSlice.reducer
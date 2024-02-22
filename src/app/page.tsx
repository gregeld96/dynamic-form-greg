'use client'
import { getFormData } from "@/lib/form";
import LoadingModal from "@/components/LoadingModal";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Alert, TextField } from "@mui/material";
import SelectForm from "@/components/SelectField";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { initialFetch, submitFormData, updateData } from "@/lib/store/reducer/form";

export interface FormFieldData {
  fieldName: string 
  type: string 
  value: string 
  options: string[] | undefined
}

export default function Home() {
  const formData = useAppSelector(state => state.form);
  const dispatch = useAppDispatch();

  function changeData(e: string, fieldName: string){
    dispatch(updateData({ value: e, fieldName }));
  }

  function handleSubmit() {
    dispatch(submitFormData(formData.data));
  }

  useEffect(() => {
    dispatch(initialFetch());
  }, [])

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-[50%] h-1/2">
        <p className="text-[32px] font-bold text-black">Dynamic Form</p>
        {
          formData.notification.type ? <Alert severity={formData.notification.type || 'success'}>{formData.notification.message}</Alert> : null
        }
        {
          formData.loading ? <LoadingModal open={true} /> : null
        }
        <div className="flex justify-center flex-col gap-5 mt-8">
          {
            formData.data && formData.data?.map((data : FormFieldData) => {
              if(data?.type === 'select') return <SelectForm key={data.fieldName} value={data?.value} label={data?.fieldName.split(/(?=[A-Z])/).join(" ")} list={data?.options} handleChange={(e) => changeData(e?.target?.value, data?.fieldName)} />
              if(data?.type === 'multiline') return <TextField key={data.fieldName} value={data?.value} label={data?.fieldName.split(/(?=[A-Z])/).join(" ")} multiline maxRows={4} className="capitalize" variant="outlined" onChange={(e) => changeData(e?.target?.value, data?.fieldName)} />
              return <TextField key={data.fieldName} type={data?.type} value={data?.value} label={data?.fieldName.split(/(?=[A-Z])/).join(" ")} className="capitalize" variant="outlined" onChange={(e) => changeData(e?.target?.value, data?.fieldName)} />
            })
          }
          {
            formData.data && formData.data?.length > 0 ? <Button onClick={() => handleSubmit()} className="bg-blue-500" variant="contained">Submit</Button> : null
          }
          
        </div>
      </div>
    </div>
  );
}

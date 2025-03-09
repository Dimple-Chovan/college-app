import React, { createContext, useState, ReactNode } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  highestQualification: string;
  university: string;
  graduationYear: string;
}

interface FormContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formProgress: number;
  setFormProgress: React.Dispatch<React.SetStateAction<number>>;
  videoProgress: { [key: string]: number };
  setVideoProgress: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

const defaultFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  streetAddress: '',
  city: '',
  region: '',
  postalCode: '',
  country: '',
  highestQualification: '',
  university: '',
  graduationYear: '',
};

export const FormContext = createContext<FormContextProps>({
  formData: defaultFormData,
  setFormData: () => {},
  formProgress: 0,
  setFormProgress: () => {},
  videoProgress: {},
  setVideoProgress: () => {},
  notes: '',
  setNotes: () => {},
});

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [formProgress, setFormProgress] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState<{ [key: string]: number }>({});
  const [notes, setNotes] = useState<string>('');

  return (
    <FormContext.Provider value={{ formData, setFormData, formProgress, setFormProgress, videoProgress, setVideoProgress, notes, setNotes }}>
      {children}
    </FormContext.Provider>
  );
};

"use client";

import React, { useState } from 'react';

import axios from 'axios';

interface UserInputData {
  repo_link: string;
  apis: string;
}

const callRepoApi_Modal = async (userInputData: UserInputData) => {
  console.log(userInputData.repo_link)
  try {
    const response = await axios.post('/api/repoapi_modal', userInputData);
    const data = response.data;
    // Update your UI with this data
  } catch (error) {
    console.error(error);
  }
}

export default function Home() {
  const [formData, setFormData] = useState({
    repo_link: '',
    apis: '',
  });

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  return (
    <div>
      <body className="bg-white text-gray-800">
          <div className="container mx-auto px-4 py-8">

              <form>
                <input type="text" name="repo_link" value={formData.repo_link} onChange={updateFormData}/>
                <input type="text" name="apis" value={formData.apis} onChange={updateFormData}/>
                <button onClick={() => callRepoApi_Modal(formData)}>Generate</button>
              </form>
          </div>
      </body>
    </div>
  );
};
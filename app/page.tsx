"use client";

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'

import axios from 'axios';

const formSchema = z.object({
  repo_link: z.string(),
  apis: z.string(),
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repo_link: "",
      apis: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Submitted!")
      const userInput = {
        repo_link: values.repo_link,
        apis: values.apis,
      };
      const response = await axios.post('/api/repoapi_modal', userInput);
      //const data = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="space-y-8">Repi</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="repo_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Repo Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormDescription>
                  Link to GitHub repository...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>APIs</FormLabel>
                <FormControl>
                  <Input placeholder="file_name.function..." {...field} />
                </FormControl>
                <FormDescription>
                  APIs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
    
  )
}

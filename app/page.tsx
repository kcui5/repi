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
  args: z.string(),
})

export default function Home() {
  const [repoAPIModalResponse, setRepoAPIModalResponse] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repo_link: "",
      apis: "",
      args: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userInput = {
        repo_link: values.repo_link,
        apis: values.apis,
        args: values.args,
      };
      const response = await axios.post('/api/repoapi_modal', userInput);
      const data = response.data;
      setRepoAPIModalResponse(data);
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
                <FormLabel>API</FormLabel>
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
          <FormField
            control={form.control}
            name="args"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arguments</FormLabel>
                <FormControl>
                  <Input placeholder="x: int = 0..." {...field} />
                </FormControl>
                <FormDescription>
                  Arguments to API Function Call...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p>{repoAPIModalResponse}</p>
    </div>
    
  )
}

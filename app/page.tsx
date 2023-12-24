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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import axios from 'axios';

const formSchema = z.object({
  repo_link: z.string(),
  apis: z.string(),
  docker_link: z.string(),
  gpu_type: z.string(),
})

export default function Home() {
  const [repoAPIModalResponse, setRepoAPIModalResponse] = useState<string | null>(null);
  const [APILinksDisplay, setAPILinksDisplay] = useState<string[]>([""]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repo_link: "",
      apis: "",
      docker_link: "",
      gpu_type: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setRepoAPIModalResponse("");
    const userInput = {
      repo_link: values.repo_link,
      apis: values.apis,
      docker_link: values.docker_link,
      gpu_type: values.gpu_type,
    };
    if (values.repo_link === "") {
      setRepoAPIModalResponse("No GitHub link given!");
      return;
    }
    if (values.apis === "") {
      setRepoAPIModalResponse("No APIs given!");
      return;
    }
    const repo_link_parts = values.repo_link.split('/')
    let repo_name = repo_link_parts[repo_link_parts.length - 1].slice(0, -4);
    repo_name = repo_name.split('.').join('-');
    repo_name = repo_name.split('_').join('-');
    repo_name = `${repo_name}-apis-py`;

    let api_urls = values.apis.split(',').map(s => s.trim());
    api_urls = api_urls.map(s => s.split('.').join('-'));
    api_urls = api_urls.map(s => s.split('_').join('-'));
    api_urls = api_urls.map(s => s.toLowerCase());
    api_urls = api_urls.map(s => `https://kcui5--${repo_name}-${s}-dev.modal.run`);
    api_urls.unshift("Generated API Endpoints: ")
    setAPILinksDisplay(api_urls);
    try {
      const response = await axios.post('/api/repoapi_modal', userInput);
      const data = response.data;
      setRepoAPIModalResponse(data.data);
    } catch(err) {
      setRepoAPIModalResponse("Internal Server Error :(");
    }
  }
    
  return (
    <div className="mx-20 pb-20">
      <h1 className="text-2xl font-bold py-10">Repi</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="repo_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Repo Link*</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/....git" {...field} />
                </FormControl>
                <FormDescription>
                  Link to GitHub repository (with .git at the end)...
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
                <FormLabel>APIs*</FormLabel>
                <FormControl>
                  <Input placeholder="file_name.function_name..." {...field} />
                </FormControl>
                <FormDescription>
                  APIs to deploy (comma-separated)...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="docker_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Docker Link</FormLabel>
                <FormControl>
                  <Input placeholder="username/docker-example-env" {...field} />
                </FormControl>
                <FormDescription>
                  Link to pull Docker environment...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gpu_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPU</FormLabel>
                <FormControl>
                  <Input placeholder="A100, T4, L4, A10G, INF2..." {...field} />
                </FormControl>
                <FormDescription>
                  GPU to attach to container...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Deploy</Button>
        </form>
      </Form>
      <p className="m-3">{repoAPIModalResponse}</p>
      <p className="m-3">{APILinksDisplay.map((item, index) => (
                <React.Fragment key={index}>
                    {item}{index < APILinksDisplay.length - 1 && <br />}
                </React.Fragment>
            ))}</p>
      <Accordion className="pt-10 pb-20" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">???</AccordionTrigger>
          <AccordionContent>
            Repi allows you to turn almost any Python GitHub repository into serverless function API endpoints!
            <br />The GitHub repository MUST have a requirements.txt file in the root folder.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">Guide</AccordionTrigger>
          <AccordionContent>
            <b>GitHub Repo Link:</b> the https git clone link (with .git at the end)
            <br /><b>APIs:</b> the functions in the repo that will be made into API endpoints. Should be formatted as folder_name.file_name.function_name separated by commas.
            <br /><b>Docker Link (optional):</b> a link to pull a docker environment to run the server in, if provided
            <br /><b>GPU (optional):</b> the GPU to run on if necessary. Possible values are A100, T4, L4, A10G, INF2
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    
  )
}

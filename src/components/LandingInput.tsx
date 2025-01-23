'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export const LandingInput = () => {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted URL:", url);
    if(url==="")return;

    router.push(`/${url}`)
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="sm:max-w-xl sm:mx-auto mx-0 ">
        <div className="sm:flex justify-center">
          <div className="min-w-0 flex-1">
            <label htmlFor="url" className="sr-only">
              Web URL
            </label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="block w-full px-4 py-3 rounded-md border-0 text-white bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Button
              type="submit"
              className="block w-full rounded-md px-4 bg-blue-500 text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 shadow-blue-700 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 sm:w-auto"
            >
              Explore
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

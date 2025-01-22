import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface InputComponentProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function InputComponent({ input, handleInputChange, handleSubmit }: InputComponentProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="flex-1 bg-gray-800 text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />
      <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  )
}


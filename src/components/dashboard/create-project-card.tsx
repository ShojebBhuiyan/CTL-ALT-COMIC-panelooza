import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateProjectCard() {
  return (
    <Card className="w-[300px] h-[270px] rounded-none border-2 bg-violet text-black">
      <CardHeader>
        <CardTitle>Add New</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                className="bg-white"
                id="name"
                placeholder="Name of your project"
              />
              <Label htmlFor="description">Description</Label>
              <Input
                className="bg-white"
                id="description"
                placeholder="Description of your project"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-1/4 bg-red rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow">
          Cancel
        </Button>
        <Button className="w-1/4 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow">
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}

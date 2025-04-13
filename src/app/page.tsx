import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Card className=" w-60 h-60">
        <CardContent>
          <p className="text-customDarkGreenColor">hello World</p>
        </CardContent>
      </Card>
    </div>
  );
}

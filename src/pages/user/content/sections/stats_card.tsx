import { FileText, DollarSign } from "lucide-react";

export default function USER_CONTENT_Stats_Cards({
  amount,
  price,
}: {
  amount: number;
  price: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border-2 p-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="text-2xl font-bold">{amount}</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-card to-accent/20 rounded-lg border-2 p-4">
        <div className="flex items-center gap-4">
          <div className="bg-green-500/10 p-3 rounded-full flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

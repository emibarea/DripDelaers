"use client";
import qs from "query-string";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valuekey: string;
}
const Filter: React.FC<FilterProps> = ({ data, name, valuekey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedvalue = searchParams.get(valuekey);
  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      [valuekey]: id,
    };
    if (current[valuekey] === id) {
      query[valuekey] = null;
    }
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div className="flex items-center" key={filter.id}>
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedvalue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;

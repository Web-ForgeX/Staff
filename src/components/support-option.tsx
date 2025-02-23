/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";

type SupportOptionsType = Record<string, { enabled: boolean; value: string }>;

interface SupportOptionProps {
  icon: FC<{ className?: string }>;
  label: string;
  optionKey: string;
  supportOptions: SupportOptionsType;
  setSupportOptions: (options: any) => void;
}

const SupportOption: FC<SupportOptionProps> = ({
  icon: Icon,
  label,
  optionKey,
  supportOptions,
  setSupportOptions,
}) => {
  const toggleSupportOption = (option: keyof typeof supportOptions) => {
    setSupportOptions((prev: SupportOptionsType) => ({
      ...prev,
      [option]: {
        ...prev[option],
        enabled: !prev[option].enabled,
      },
    }));
  };

  const updateSupportValue = (option: keyof typeof supportOptions, value: string) => {
    setSupportOptions((prev: SupportOptionsType) => ({
      ...prev,
      [option]: {
        ...prev[option],
        value,
      },
    }));
    console.log(supportOptions);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <span>{label}</span>
        </div>
        <Button
          variant={supportOptions[optionKey].enabled ? "default" : "outline"}
          onClick={() => toggleSupportOption(optionKey)}
        >
          {supportOptions[optionKey].enabled ? "Enabled" : "Disabled"}
        </Button>
      </div>
      {supportOptions[optionKey].enabled && (
        <Input
          value={supportOptions[optionKey].value}
          onChange={(e) => updateSupportValue(optionKey, e.target.value)}
          placeholder={`Enter ${label.toLowerCase()} URL...`}
        />
      )}
    </div>
  );
};

export default SupportOption;

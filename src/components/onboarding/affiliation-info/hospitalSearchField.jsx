import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Command, CommandEmpty, CommandGroup,  CommandItem, CommandList } from "../../ui/command";
import { cn } from "../../../lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "../../ui/input";

const HospitalSearchField = ({ block, index, errors, handleValueChange, hospitalOptions }) => {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState(block.hospital || "");

    const filteredHospitals = hospitalOptions.filter((h) =>
        h.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col">
            <p className="mb-2 text-base font-semibold text-secondary">
                Hospital/Facility<span className="ml-1 text-red-500">*</span>
            </p>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative">
                        <Input
                            placeholder="Search Hospital or Facility Name"
                            value={searchTerm}
                            onFocus={() => setOpen(true)}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchTerm(val);
                                handleValueChange(block, 'hospital', val);
                                setOpen(true);
                            }}
                            className="w-full border-gray-300 pr-10"
                        />
                        <ChevronsUpDown className="absolute right-3 top-3 h-4 w-4 shrink-0 opacity-50 pointer-events-none" />
                    </div>
                </PopoverTrigger>

                <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <Command>
                        <CommandList className="max-h-[200px] overflow-y-auto">
                            {filteredHospitals.length === 0 ? (
                                <CommandEmpty className="p-2 text-sm text-gray-500">
                                    No matching hospitals found.
                                </CommandEmpty>
                            ) : (
                                <CommandGroup>
                                    {filteredHospitals.map((hospital) => (
                                        <CommandItem
                                            key={hospital}
                                            value={hospital}
                                            onSelect={(currentValue) => {
                                                setSearchTerm(currentValue);
                                                handleValueChange(block, 'hospital', currentValue);
                                                setOpen(false);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    block.hospital === hospital ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {hospital}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {errors[`Affiliation[${index}].hospital`] && (
                <p className="text-sm text-red-600 mt-1">{errors[`Affiliation[${index}].hospital`]}</p>
            )}
        </div>
    );
};
export default HospitalSearchField
// src/whatever-path/DelegatedAccess/EditDelegateAccessDialog.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "../../../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";

function EditDelegateAccessDialog({ delegate, onSaveAccess }) {
  const ALLOWED_ACCESS = useMemo(() => ["View Only", "View & Edit"], []);
  const [open, setOpen] = useState(false);

  const [access, setAccess] = useState("View Only");
  const [errors, setErrors] = useState({ access: "" });

  useEffect(() => {
    if (!delegate) return;
    setAccess(delegate.access || "View Only");
    setErrors({ access: "" });
  }, [delegate]);

  if (!delegate) return null;

  const validateAccess = (nextAccess) => {
    const value = String(nextAccess || "").trim();
    if (!value) return { access: "Access Level is required" };
    if (!ALLOWED_ACCESS.includes(value)) return { access: "Invalid Access Level selected" };
    return { access: "" };
  };

  const handleSave = () => {
    const v = validateAccess(access);
    setErrors(v);
    if (v.access) return;

    onSaveAccess?.(delegate.id, access);
    setOpen(false); // close only on success
  };

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);

    // optional: reset when closing without saving
    if (!nextOpen && delegate) {
      setAccess(delegate.access || "View Only");
      setErrors({ access: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-primary border-[1px] lg:text-sm text-xs text-primary hover:bg-white h-9">
          Edit Access
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] max-h-[60vh] overflow-y-auto rounded-[20px] p-4 md:p-6">
        <DialogHeader className="flex flex-col space-y-2">
          <DialogTitle className="text-[20px] font-semibold text-secondary">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-left text-gray-800">Edit Access</h2>
              <p className="text-sm font-normal text-left text-gray-500">Update the access level for this delegate.</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <section className="grid w-full grid-cols-1 gap-3">
          {/* Name (read-only display) */}
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Delegate Name</p>
            <Input
              value={`${delegate.firstName || ""} ${delegate.lastName || ""}`.trim()}
              readOnly
              disabled
              className="border-gray-300 cursor-not-allowed bg-gray-50"
            />
          </div>

          {/* Access */}
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Access Level</p>

            <Select
              value={access}
              onValueChange={(v) => {
                setAccess(v);
                setErrors(validateAccess(v));
              }}
            >
              <SelectTrigger className={`w-full h-10 border ${errors.access ? "border-red-500" : "border-gray-300"}`}>
                <SelectValue placeholder="View Only" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                <SelectItem value="View Only">View Only</SelectItem>
                <SelectItem value="View & Edit">View & Edit</SelectItem>
              </SelectContent>
            </Select>

            {errors.access ? <p className="mt-1 text-sm text-red-500">{errors.access}</p> : null}
          </div>
        </section>

        <DialogFooter className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-between">
          <DialogClose asChild>
            <Button className="w-full text-[16px] font-semibold text-tertiary bg-white border border-tertiary rounded-md">
              Cancel
            </Button>
          </DialogClose>

          <Button className="w-full text-[16px] text-white font-semibold" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDelegateAccessDialog;

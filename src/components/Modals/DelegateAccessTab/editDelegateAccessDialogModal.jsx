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
  const [access, setAccess] = useState(delegate?.access || "View Only");

  // ✅ validation errors (added only)
  const [errors, setErrors] = useState({ access: "" });

  useEffect(() => {
    setAccess(delegate?.access || "View Only");
    setErrors({ access: "" });
  }, [delegate?.access]);

  if (!delegate) return null;

  // ✅ small helper validation (added only)
  const validate = (nextAccess) => {
    const value = String(nextAccess || "").trim();
    if (!value) return { access: "Access Level is required" };
    if (!ALLOWED_ACCESS.includes(value)) return { access: "Invalid Access Level selected" };
    return { access: "" };
  };

  const handleSave = () => {
    const v = validate(access);
    setErrors(v);

    // block save if invalid
    if (v.access) return;

    if (onSaveAccess) {
      onSaveAccess(delegate.id, access);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-primary border-[1px] text-primary hover:bg-white h-9">
          Edit Access
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] max-h-[60vh] overflow-y-auto rounded-[20px] p-6 md:p-8">
        <DialogHeader className="flex flex-col space-y-2">
          <DialogTitle className="text-[20px] font-semibold text-gray-800">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-left text-gray-800">Edit Access</h2>
              <p className="text-sm font-normal text-left text-gray-500">Update the access level for this delegate.</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <section className="grid w-full grid-cols-1 gap-3">
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-gray-800">Delegate Name</p>
            <Input
              placeholder="e.g., Credentialing Coordinator — Acme Health"
              className="border-gray-300"
              value={`${delegate.firstName} ${delegate.lastName}`}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Access Level</p>

            <Select
              value={access}
              onValueChange={(v) => {
                setAccess(v);
                // ✅ validate on change
                setErrors(validate(v));
              }}
            >
              <SelectTrigger
                className={`w-full h-10 border ${errors.access ? "border-red-500" : "border-gray-300"}`}
              >
                <SelectValue placeholder="View Only" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 ">
                <SelectItem value="View Only">View Only</SelectItem>
                <SelectItem value="View & Edit">View & Edit</SelectItem>
              </SelectContent>
            </Select>

            {/* ✅ error message (added only) */}
            {errors.access ? <p className="mt-1 text-sm text-red-500">{errors.access}</p> : null}
          </div>
        </section>

        <DialogFooter className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-between">
          <DialogClose asChild>
            <Button className="w-full text-[16px] font-semibold text-tertiary bg-white border border-tertiary rounded-md">
              Cancel
            </Button>
          </DialogClose>

          {/* NOTE: DialogClose kept as-is (no UI/structure change). We just block save if invalid. */}
          <DialogClose asChild>
            <Button className="w-full text-[16px] text-white font-semibold" onClick={handleSave}>
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDelegateAccessDialog;

// src/whatever-path/DelegatedAccess/AddDelegateDialog.jsx
import React, { useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "../../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";

function AddDelegateDialog({ onAdd }) {
  const ALLOWED_ACCESS = useMemo(() => ["View Only", "View & Edit"], []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [access, setAccess] = useState("View Only");

  // validation errors (added only)
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    access: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (values) => {
    const next = { firstName: "", lastName: "", email: "", role: "", access: "" };

    const fn = String(values.firstName || "").trim();
    const ln = String(values.lastName || "").trim();
    const em = String(values.email || "").trim();
    const rl = String(values.role || "").trim();
    const ac = String(values.access || "").trim();

    if (!fn) next.firstName = "First Name is required";
    if (!ln) next.lastName = "Last Name is required";

    if (!em) next.email = "Email is required";
    else if (!emailRegex.test(em)) next.email = "Enter a valid email address";

    if (!rl) next.role = "Role / Organization is required";

    if (!ac) next.access = "Access Level is required";
    else if (!ALLOWED_ACCESS.includes(ac)) next.access = "Invalid Access Level selected";

    return next;
  };

  const hasErrors = (errs) => Object.values(errs).some(Boolean);

  const handleSave = () => {
    const v = validate({ firstName, lastName, email, role, access });
    setErrors(v);
    if (hasErrors(v)) return;

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role: role.trim(),
      access,
      status: "Pending",
    };

    if (onAdd) onAdd(payload);

    // reset fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
    setAccess("View Only");
    setErrors({ firstName: "", lastName: "", email: "", role: "", access: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold text-base sm:text-[16px] w-full sm:w-auto text-white">Add Delegate</Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-4 md:p-6">
        {/* Header */}
        <DialogHeader className="flex flex-col space-y-2">
          <DialogTitle className="text-[20px] font-semibold text-secondary">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-left -gray-800 text">Add Delegate</h2>
              <p className="text-sm font-normal text-left text-gray-500">
                Add a new delegated user who can view or manage provider credentials.
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Form Section */}
        <section className="grid w-full grid-cols-1 gap-3">
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">First Name</p>
            <Input
              name="firstName"
              placeholder="Enter First Name"
              className={`border-gray-300 ${errors.firstName ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
              value={firstName}
              onChange={(e) => {
                const v = e.target.value;
                setFirstName(v);
                if (errors.firstName) setErrors((p) => ({ ...p, firstName: v.trim() ? "" : "First Name is required" }));
              }}
              onBlur={() => setErrors((p) => ({ ...p, ...validate({ firstName, lastName, email, role, access }) }))}
            />
            {errors.firstName ? <p className="mt-1 text-sm text-red-500">{errors.firstName}</p> : null}
          </div>

          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Last Name</p>
            <Input
              name="lastName"
              placeholder="Enter Last Name"
              className={`border-gray-300 ${errors.lastName ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
              value={lastName}
              onChange={(e) => {
                const v = e.target.value;
                setLastName(v);
                if (errors.lastName) setErrors((p) => ({ ...p, lastName: v.trim() ? "" : "Last Name is required" }));
              }}
              onBlur={() => setErrors((p) => ({ ...p, ...validate({ firstName, lastName, email, role, access }) }))}
            />
            {errors.lastName ? <p className="mt-1 text-sm text-red-500">{errors.lastName}</p> : null}
          </div>

          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Email</p>
            <Input
              name="email"
              placeholder="you@hospital.org"
              className={`border-gray-300 ${errors.email ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
              value={email}
              onChange={(e) => {
                const v = e.target.value;
                setEmail(v);
                if (errors.email) {
                  const trimmed = v.trim();
                  setErrors((p) => ({
                    ...p,
                    email: !trimmed ? "Email is required" : emailRegex.test(trimmed) ? "" : "Enter a valid email address",
                  }));
                }
              }}
              onBlur={() => setErrors((p) => ({ ...p, ...validate({ firstName, lastName, email, role, access }) }))}
            />
            {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email}</p> : null}
          </div>

          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-gray-800 whitespace-nowrap">Role / Organization</p>
            <Input
              name="role"
              placeholder="e.g., Credentialing Coordinator — Acme Health"
              className={`border-gray-300 ${errors.role ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
              value={role}
              onChange={(e) => {
                const v = e.target.value;
                setRole(v);
                if (errors.role) setErrors((p) => ({ ...p, role: v.trim() ? "" : "Role / Organization is required" }));
              }}
              onBlur={() => setErrors((p) => ({ ...p, ...validate({ firstName, lastName, email, role, access }) }))}
            />
            {errors.role ? <p className="mt-1 text-sm text-red-500">{errors.role}</p> : null}
          </div>

          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-gray-800">Access Level</p>
            <Select
              value={access}
              onValueChange={(value) => {
                setAccess(value);
                // validate immediately
                const v = validate({ firstName, lastName, email, role, access: value });
                setErrors((p) => ({ ...p, access: v.access }));
              }}
            >
              <SelectTrigger
                className={`w-full h-10 border ${errors.access ? "border-red-500 focus:ring-red-500/30" : "border-gray-300"}`}
              >
                <SelectValue placeholder="View Only" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 ">
                <SelectItem value="View Only">View Only</SelectItem>
                <SelectItem value="View & Edit">View & Edit</SelectItem>
              </SelectContent>
            </Select>
            {errors.access ? <p className="mt-1 text-sm text-red-500">{errors.access}</p> : null}
          </div>
        </section>

        {/* Footer */}
        <DialogFooter className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-between">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full text-[16px] font-semibold text-tertiary border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </DialogClose>

          {/* DialogClose kept as-is; we block submit when invalid */}
          <DialogClose asChild>
            <Button className="w-full text-[16px] text-white font-semibold bg-primary" onClick={handleSave}>
              Save &amp; Send Invite
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDelegateDialog;

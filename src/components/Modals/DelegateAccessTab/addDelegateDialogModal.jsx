// src/whatever-path/DelegatedAccess/AddDelegateDialog.jsx
import React, { useMemo, useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "../../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";

function AddDelegateDialog({ onAdd }) {
  const ALLOWED_ACCESS = useMemo(() => ["View Only", "View & Edit"], []);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [open, setOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [access, setAccess] = useState("View Only");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    access: "",
  });

  const getValues = () => ({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    role: role.trim(),
    access: String(access || "").trim(),
  });

  const validateAll = (values) => {
    const next = { firstName: "", lastName: "", email: "", role: "", access: "" };

    if (!values.firstName) next.firstName = "First Name is required";
    if (!values.lastName) next.lastName = "Last Name is required";

    if (!values.email) next.email = "Email is required";
    else if (!emailRegex.test(values.email)) next.email = "Enter a valid email address";

    if (!values.role) next.role = "Role / Organization is required";

    if (!values.access) next.access = "Access Level is required";
    else if (!ALLOWED_ACCESS.includes(values.access)) next.access = "Invalid Access Level selected";

    return next;
  };

  const validateField = (name, values) => {
    const v = validateAll(values);
    return v[name] || "";
  };

  const hasErrors = (errs) => Object.values(errs).some((x) => Boolean(x));

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
    setAccess("View Only");
    setErrors({ firstName: "", lastName: "", email: "", role: "", access: "" });
  };

  const handleSave = () => {
    const values = getValues();
    const v = validateAll(values);
    setErrors(v);

    if (hasErrors(v)) return;

    const payload = {
      ...values,
      access: values.access,
      status: "Pending",
    };

    onAdd?.(payload);

    resetForm();
    setOpen(false); // close only when valid
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold text-base sm:text-[16px] w-full sm:w-auto text-white">
          Add Delegate
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-4 md:p-6">
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

        <section className="grid w-full grid-cols-1 gap-3">
          {/* First Name */}
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">First Name</p>
            <Input
              name="firstName"
              placeholder="Enter First Name"
              className={`border-gray-300 bg-white ${errors.firstName ? "border-red-500" : ""}`}
              value={firstName}
              onChange={(e) => {
                const v = e.target.value;
                setFirstName(v);
                if (errors.firstName) {
                  setErrors((p) => ({ ...p, firstName: v.trim() ? "" : "First Name is required" }));
                }
              }}
              onBlur={() => {
                const values = getValues();
                setErrors((p) => ({ ...p, firstName: validateField("firstName", values) }));
              }}
            />
            {errors.firstName ? <p className="mt-1 text-sm text-red-500">{errors.firstName}</p> : null}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Last Name</p>
            <Input
              name="lastName"
              placeholder="Enter Last Name"
              className={`border-gray-300 bg-white ${errors.lastName ? "border-red-500" : ""}`}
              value={lastName}
              onChange={(e) => {
                const v = e.target.value;
                setLastName(v);
                if (errors.lastName) {
                  setErrors((p) => ({ ...p, lastName: v.trim() ? "" : "Last Name is required" }));
                }
              }}
              onBlur={() => {
                const values = getValues();
                setErrors((p) => ({ ...p, lastName: validateField("lastName", values) }));
              }}
            />
            {errors.lastName ? <p className="mt-1 text-sm text-red-500">{errors.lastName}</p> : null}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Email</p>
            <Input
              name="email"
              placeholder="you@hospital.org"
              className={`border-gray-300 bg-white  ${errors.email ? "border-red-500" : ""}`}
              value={email}
              onChange={(e) => {
                const v = e.target.value;
                setEmail(v);
                if (errors.email) {
                  const t = v.trim();
                  setErrors((p) => ({
                    ...p,
                    email: !t ? "Email is required" : emailRegex.test(t) ? "" : "Enter a valid email address",
                  }));
                }
              }}
              onBlur={() => {
                const values = getValues();
                setErrors((p) => ({ ...p, email: validateField("email", values) }));
              }}
            />
            {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email}</p> : null}
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary whitespace-nowrap">
              Role / Organization
            </p>
            <Input
              name="role"
              placeholder="e.g., Credentialing Coordinator — Acme Health"
              className={`border-gray-300 bg-white ${errors.role ? "border-red-500" : ""}`}
              value={role}
              onChange={(e) => {
                const v = e.target.value;
                setRole(v);
                if (errors.role) {
                  setErrors((p) => ({ ...p, role: v.trim() ? "" : "Role / Organization is required" }));
                }
              }}
              onBlur={() => {
                const values = getValues();
                setErrors((p) => ({ ...p, role: validateField("role", values) }));
              }}
            />
            {errors.role ? <p className="mt-1 text-sm text-red-500">{errors.role}</p> : null}
          </div>

          {/* Access */}
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Access Level</p>
            <Select
              value={access}
              onValueChange={(value) => {
                setAccess(value);
                const values = { ...getValues(), access: value };
                setErrors((p) => ({ ...p, access: validateField("access", values) }));
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
            <Button
              variant="outline"
              className="w-full text-[16px] font-semibold text-tertiary border-gray-300 hover:bg-gray-50"
              onClick={() => {
                // optional: reset on cancel
                resetForm();
              }}
            >
              Cancel
            </Button>
          </DialogClose>

          {/* No DialogClose here; we close manually only when valid */}
          <Button className="w-full text-[16px] text-white font-semibold bg-primary" onClick={handleSave}>
            Save &amp; Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDelegateDialog;

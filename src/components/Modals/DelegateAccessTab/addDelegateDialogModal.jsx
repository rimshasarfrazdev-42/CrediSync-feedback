// src/whatever-path/DelegatedAccess/AddDelegateDialog.jsx
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Input } from '../../ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../ui/select';

function AddDelegateDialog({ onAdd }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [access, setAccess] = useState('View Only');

  const handleSave = () => {
    const payload = {
      firstName,
      lastName,
      email,
      role,
      access,
      status: 'Pending',
    };

    if (onAdd) onAdd(payload);

    // reset fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('');
    setAccess('View Only');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold text-base sm:text-[16px] w-full sm:w-auto text-white">
          Add Delegate
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-4 md:p-6">
        {/* Header */}
        <DialogHeader className="flex flex-col space-y-2">
          <DialogTitle className="text-[20px] font-semibold text-secondary">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-secondary">Add Delegate</h2>
              <p className="text-sm font-normal text-tertiary">
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
              className="border-gray-300 "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Last Name</p>
            <Input
              name="lastName"
              placeholder="Enter Last Name"
              className="border-gray-300"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Email</p>
            <Input
              name="email"
              placeholder="you@hospital.org"
              className="border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Role / Organization</p>
            <Input
              name="role"
              placeholder="e.g.. Credentialing Coordinator — Acme Health"
              className="border-gray-300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-1 text-base font-semibold text-secondary">Access Level</p>
            <Select value={access} onValueChange={(value) => setAccess(value)}>
              <SelectTrigger className="w-full h-10 border border-gray-300">
                <SelectValue placeholder="View Only" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 ">
                <SelectItem value="View Only">View Only</SelectItem>
                <SelectItem value="View & Edit">View & Edit</SelectItem>
              </SelectContent>
            </Select>
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

          <DialogClose asChild>
            <Button
              className="w-full text-[16px] text-white font-semibold bg-primary"
              onClick={handleSave}
            >
              Save &amp; Send Invite
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDelegateDialog;

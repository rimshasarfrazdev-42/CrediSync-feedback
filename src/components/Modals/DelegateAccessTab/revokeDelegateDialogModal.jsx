// src/whatever-path/DelegatedAccess/RevokeDelegateDialog.jsx
import React from 'react';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { TriangleAlert } from 'lucide-react';

function RevokeDelegateDialog({ delegate, onRevoke }) {
  if (!delegate) return null;

  const handleConfirm = () => {
    if (onRevoke) onRevoke(delegate.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-red-500 border-[1px] text-red-600 hover:text-red-500 hover:bg-white h-9"
        >
          Revoke
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] max-h-[55vh] overflow-y-auto rounded-[20px] p-6 md:p-8">
        <DialogHeader className="flex flex-col space-y-2">
          <DialogTitle className="text-[20px] font-semibold text-secondary flex items-center gap-2">
            <TriangleAlert className="w-5 h-5 mb-4 text-red-500" />
            <div>
              <span>Revoke Delegate Access</span>
              <p className="text-[14px] font-normal text-tertiary">
                Are you sure you want to revoke this delegate&apos;s access?
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <section className="w-full border-[1px] h-16 border-red-500/50 bg-red-500/10 flex items-center p-4 rounded-[10px]">
          <p className="text-[15px] sm:text-[16px] text-red-500 leading-tight font-normal">
            {delegate.firstName} {delegate.lastName} will no longer be able to view or
            update your account information.
          </p>
        </section>

        <DialogFooter className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-between">
          <DialogClose asChild>
            <Button className="w-full text-[16px] font-semibold text-tertiary bg-white border border-tertiary rounded-md">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              className="w-full text-[16px] text-white font-semibold bg-red-500 hover:bg-red-600"
              onClick={handleConfirm}
            >
              Yes, Revoke Access
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RevokeDelegateDialog;

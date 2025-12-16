import React from 'react';
import { TriangleAlert, Dot } from 'lucide-react';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

function DeleteAccountContainer() {
  return (
    <div className="">
      <div className="grid w-full grid-cols-1 gap-6 p-4 mx-auto bg-white border sm:p-6 min-h-60 border-tertiary/15 rounded-b-xl rounded-tr-xl">
        {/* Heading Section */}
        <div>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-secondary">
            Deactivate Account
          </p>
          <p className="text-[13px] sm:text-[14px] md:text-[15px] font-normal text-tertiary mt-1">
            Permanently remove your CrediSync profile and all associated data.
          </p>
        </div>

        {/* Warning Box */}
        <div className="w-full p-4 border sm:p-5 md:p-6 border-red-500/20 bg-red-500/10 rounded-xl">
          {/* Top warning row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-[10px]">
              <TriangleAlert className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <p className="text-[15px] sm:text-[16px] md:text-[18px] font-medium text-red-600">
                Warning: Deactivating your account will restrict access.
              </p>
              <p className="text-[13px] sm:text-[14px] font-normal text-red-600 leading-relaxed">
                Once deactivated, you will no longer be able to view, share, or verify your
                credential information within the vault.
              </p>
            </div>
          </div>

          {/* Data List */}
          <div className="w-full p-3 mt-5 bg-white border sm:p-4 md:p-5 sm:mt-6 border-red-500/40 rounded-xl">
            <h3 className="mb-3 text-[15px] sm:text-[16px] md:text-[18px] font-medium text-red-600">
              The following data will be permanently deactivated:
            </h3>

            <ul className="space-y-3 text-[#C32727] font-normal text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed">
              {[
                'Viewing or managing your credentials in the Credential Vault.',
                'Sharing or verifying credentials with institutions.',
                'Viewing readiness scores, notifications, or verification history.',
                'Using your CrediSync account until it is reactivated.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3">
                  <Dot size={20} className="flex-shrink-0 mt-[2px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Confirmation Checkbox Section */}
          <div className="mt-5 sm:mt-6 w-full bg-white border border-red-500/40 rounded-[10px] p-3 sm:p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-start gap-3">
            <Checkbox
              className="
                mt-1 
                border-[#C32727]
                data-[state=checked]:border-[#C32727]
                data-[state=checked]:bg-white/75
                text-[#C32727]
                data-[state=checked]:text-[#C32727]
              "
            />

            <h3 className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[17px] xl:text-[18px] font-medium text-[#C32727] leading-relaxed">
              I understand that my account will be deactivated, and I will lose access to my
              credential data and sharing capabilities until reactivated.
            </h3>
          </div>

          {/* Dialog and button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold text-[14px] sm:text-[16px] rounded-md mt-6 sm:mt-8 w-full sm:w-auto">
                Confirm Deactivation
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[92%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[70vh] overflow-y-auto rounded-[20px] p-5 sm:p-6 md:p-8">
              {/* Header */}
              <DialogHeader className="flex flex-col space-y-2">
                <DialogTitle className="text-[18px] sm:text-[20px] font-semibold text-secondary flex items-center gap-2">
                  <TriangleAlert className="w-5 h-5 text-red-500" />
                  <span>Final Confirmation Required</span>
                </DialogTitle>
              </DialogHeader>

              {/* Description */}
              <section className="w-full mt-2">
                <p className="text-[14px] sm:text-[15px] md:text-[16px] text-tertiary leading-relaxed font-normal">
                  Are you sure you want to deactivate your CrediSync account? Once deactivated, you
                  will lose access to your credential vault, sharing, and verification features
                  until you reactivate your account. Your data will remain securely stored in
                  accordance with CrediSync’s HIPAA and compliance policies.
                </p>
              </section>

              {/* Footer */}
              <DialogFooter className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-between sm:gap-3">
                <DialogClose asChild>
                  <Button className="w-full text-[14px] sm:text-[16px] font-semibold text-tertiary bg-white border border-tertiary rounded-md">
                    Cancel
                  </Button>
                </DialogClose>

                <Button className="w-full text-[14px] sm:text-[16px] text-white font-semibold bg-red-500 hover:bg-red-600">
                  Yes, Deactivate My Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountContainer;

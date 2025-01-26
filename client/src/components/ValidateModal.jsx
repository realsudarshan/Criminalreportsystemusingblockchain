"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import axios from "@/lib/axios";

const ValidateModal = ({ isOpen, onClose, crimeId }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (isOpen) {
      validate();
    }
  }, [isOpen]);

  const validate = async () => {
    setStatus("loading");
    try {
      const res = await axios.get(`/validate/${crimeId}`);
      console.log(res);
      if (res.status === 200) {
        if (res.data.isSame) {
          setStatus("valid");
        } else {
          setStatus("tampered");
        }
      }
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crime Record Validation</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500">
                Validating crime record {crimeId}...
              </p>
            </div>
          )}
          {status === "valid" && (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="w-12 h-12" color="green" />
              <p className="text-lg font-semibold text-green-500">
                Valid Record
              </p>
              <p className="text-sm text-gray-500">
                The crime record {crimeId} is valid and untampered.
              </p>
            </div>
          )}
          {status === "tampered" && (
            <div className="flex flex-col items-center space-y-2">
              <XCircle className="w-12 h-12" color="red" />
              <p className="text-lg font-semibold text-red-500">
                Tampered Record
              </p>
              <p className="text-sm text-gray-500">
                The crime record {crimeId} shows signs of tampering.
              </p>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center space-y-4">
              <AlertCircle className="w-12 h-12 text-yellow-500" />
              <p className="text-lg font-semibold text-yellow-500">
                Validation Error
              </p>
              <p className="text-sm text-gray-500">
                Unable to validate crime record {crimeId}. Please try again.
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValidateModal;

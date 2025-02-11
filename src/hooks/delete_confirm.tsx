import { createContext, useContext, useState, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DeleteModalContextType = {
  openDeleteModal: (
    title: string,
    description: string,
    confirmText: string,
    onConfirm: () => void,
  ) => void;
};

const DeleteModalContext = createContext<DeleteModalContextType | undefined>(
  undefined,
);

export default function DeleteModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    confirmText: "",
    onConfirm: () => {},
  });

  const [inputText, setInputText] = useState("");

  const openDeleteModal = (
    title: string,
    description: string,
    confirmText: string,
    onConfirm: () => void,
  ) => {
    setModalData({ title, description, confirmText, onConfirm });
    setInputText(""); // Reset input
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <DeleteModalContext.Provider value={{ openDeleteModal }}>
      {children}

      {/* Global Delete Modal */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{modalData.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {modalData.description}
            </AlertDialogDescription>
            <p className="mt-2 text-sm text-muted-foreground">
              Please type <strong>{modalData.confirmText}</strong> to confirm.
            </p>
          </AlertDialogHeader>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Type "${modalData.confirmText}"`}
            className="mt-2"
          />
          <AlertDialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                modalData.onConfirm();
                closeModal();
              }}
              disabled={inputText !== modalData.confirmText}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DeleteModalContext.Provider>
  );
}

export function useDeleteModal() {
  const context = useContext(DeleteModalContext);
  if (!context) {
    throw new Error("useDeleteModal must be used within a DeleteModalProvider");
  }
  return context;
}

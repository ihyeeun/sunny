import { useAlertModal } from "@shared/store/modals/alert-confirm-modal-store";
import { AlertDialog, Button } from "@shared/ui/shadcn";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/ui/shadcn/alert-dialog";

export default function AlertConfirmModal() {
  const alertModal = useAlertModal();

  if (!alertModal.isOpen) return null;

  const handleCancelClick = () => {
    if (alertModal.onNegativeAction) alertModal.onNegativeAction();
    alertModal.actions.modalClose();
  };

  const handleActionClick = () => {
    if (alertModal.onPositiveAction) alertModal.onPositiveAction();
    alertModal.actions.modalClose();
  };

  return (
    <AlertDialog
      open={alertModal.isOpen}
      onOpenChange={(open) => {
        if (!open) alertModal.actions.modalClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {alertModal.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="py-10 text-center">
            {alertModal.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-center">
          <Button
            onClick={handleActionClick}
            className="w-[50%] cursor-pointer"
            variant="default"
          >
            확인
          </Button>
          <Button
            onClick={handleCancelClick}
            className="w-[50%] cursor-pointer"
            variant="outline"
          >
            돌아가기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

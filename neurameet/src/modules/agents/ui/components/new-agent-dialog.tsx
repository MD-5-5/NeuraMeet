import { ResponsiveDialog } from "@/components/responsive-dialog";

interface NewAgentsDialogProps {
    open:boolean;
    onOpenChange:(open:boolean) => void;
};

export const NewAgentDialog =({
    open,
    onOpenChange,
} : NewAgentDialogProps) => {
    return (
        <ResponsiveDialog
        title="New Agent"
        description="Create a new Agent"
        open={open}
        onOpenChange={onOpenChange}
        >
            New Agent Form
        </ResponsiveDialog>
    )
}